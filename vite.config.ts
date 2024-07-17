import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tsconfigPaths from "vite-tsconfig-paths";
import { allProjects } from "./src/globals";
import { type RouteRecordRaw } from "vue-router";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tsconfigPaths({ loose: true })],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
  server: {
    port: 3000,
  },
  // @ts-expect-error - seems to be working just fine
  ssgOptions: {
    includedRoutes(paths: string[], routes: Readonly<RouteRecordRaw[]>) {
      const customRoutes = routes.flatMap((route) => {
        if (route.name === "not-found") {
          return ["404"];
        }

        return route.name === "projectItem"
          ? allProjects.map((slug) => `/projects/${slug}`)
          : route.path;
      });

      return customRoutes;
    },
  },
});
