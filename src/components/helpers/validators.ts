export function generalSectionArrayValidator(value: unknown): boolean {
  if (!Array.isArray(value)) {
    return false;
  }
  for (let val of value) {
    if (
      !val ||
      !val.path ||
      !val.callToAction ||
      !val.title ||
      (!val.excerpt && val.type === "project")
    ) {
      return false;
    }
  }
  return true;
}
