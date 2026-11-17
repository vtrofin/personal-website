import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

const url = process.argv[2]
if (!url) {
  console.error("usage: node scripts/check-security-headers.mjs <url>")
  process.exit(2)
}

const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"))
const route = (config.headers ?? []).find((item) => item.source === "/(.*)")
if (!route) {
  console.error("vercel.json has no headers route for /(.*)")
  process.exit(1)
}

const expected = route.headers.map((item) => [item.key.toLowerCase(), item.value])
const failures = []

function curl(target, method) {
  const headerPath = join(tmpdir(), `sec-headers-${process.pid}-${method}.txt`)
  const bodyPath = join(tmpdir(), `sec-headers-${process.pid}-${method}.body`)
  try {
    execFileSync(
      "curl",
      ["-sS", "--max-time", "20", "--noproxy", "*", "-D", headerPath, "-o", bodyPath, "--max-redirs", "0", "-X", method, target],
      { stdio: ["ignore", "pipe", "pipe"] },
    )
  } catch (error) {
    const detail = error.stderr?.toString("utf8").trim() || error.message
    fail(`${method} ${target} ${detail}`)
    return { raw: "", body: Buffer.alloc(0) }
  }
  return {
    raw: readFileSync(headerPath, "utf8"),
    body: readFileSync(bodyPath),
  }
}

function parse(raw) {
  const lines = raw.split(/\r?\n/).filter((line) => line.length > 0)
  const status = Number(lines[0]?.split(" ")[1])
  const headers = new Map()
  for (const line of lines.slice(1)) {
    if (line.startsWith("HTTP/")) continue
    const idx = line.indexOf(":")
    if (idx < 0) continue
    const name = line.slice(0, idx).trim().toLowerCase()
    const value = line.slice(idx + 1).trim()
    const prev = headers.get(name) ?? []
    prev.push(value)
    headers.set(name, prev)
  }
  return { status, headers }
}

function fail(message) {
  failures.push(message)
  console.error(`fail ${message}`)
}

const response = curl(url, "GET")
if (failures.length > 0) process.exit(1)
const parsed = parse(response.raw)
console.log(`GET ${url} ${parsed.status}`)

if ([301, 302, 307, 308].includes(parsed.status)) {
  fail(`redirect ${parsed.status} was not followed`)
}

for (const [name, value] of expected) {
  const got = parsed.headers.get(name) ?? []
  if (got.length !== 1 || got[0] !== value) {
    fail(`${name} expected ${JSON.stringify(value)} got ${JSON.stringify(got)}`)
  } else {
    console.log(`pass ${name}`)
  }
}

if (url.startsWith("https://")) {
  const hsts = parsed.headers.get("strict-transport-security") ?? []
  const maxAge = Number(hsts[0]?.match(/max-age=(\d+)/)?.[1])
  if (hsts.length !== 1 || !(maxAge >= 63072000)) {
    fail(`strict-transport-security expected one header with max-age >= 63072000 got ${JSON.stringify(hsts)}`)
  } else {
    console.log(`pass strict-transport-security ${hsts[0]}`)
  }
}

const meta = response.body.toString("utf8").match(
  /http-equiv\s*=\s*["']?(content-security-policy|x-frame-options|x-content-type-options|strict-transport-security)/i,
)
if (meta) {
  fail(`security meta tag ${meta[1]}`)
}

const options = parse(curl(url, "OPTIONS").raw)
const server = (options.headers.get("server") ?? []).join(", ") || "(absent)"
const via = (options.headers.get("via") ?? []).join(", ") || "(absent)"
console.log(`OPTIONS ${options.status} server=${server} via=${via}`)

if (failures.length > 0) {
  process.exit(1)
}
