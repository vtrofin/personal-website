import { type RouteRecordRaw } from "vue-router";
import { createPinia } from "pinia";
import { FontAwesomeIcon } from "@libs/fa/font_awesome";
import VueApp from "./App.vue";
import HomePage from "@pages/Home.vue";
import ProjectItem from "@pages/ProjectItem.vue";
import NotFound from "@pages/NotFound.vue";
import { projectDataBySlug } from "@/data/projects";
import type { ProjectName } from "@/globals";
import { checkProjectRoute } from "@helpers/index";
import { projectImageAssets, warmImageUrls } from "@helpers/project_image_preloads";
import { inject } from "@vercel/analytics";
import { ViteSSG as createViteSSG } from "vite-ssg";

inject();

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "not-found",
  },
  {
    path: "/",
    component: HomePage,
    name: "homepage",
    alias: ["/home", "/work"],
  },
  {
    path: "/projects",
    redirect: { name: "projectItem", params: { project_item: "shipandco" } },
  },
  {
    path: "/projects/:project_item",
    component: ProjectItem,
    name: "projectItem",
    beforeEnter: (to) => {
      return checkProjectRoute(to?.params);
    },
  },
];

export const createApp = createViteSSG(
  VueApp,
  {
    routes,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.fullPath !== from.fullPath) {
        return { top: 0, left: 0 };
      }

      return savedPosition ? savedPosition : { left: 0, top: 0 };
    },
  },
  ({ app, router }) => {
    app.use(createPinia());
    // eslint-disable-next-line
    app.component("Fa", FontAwesomeIcon);

    router.beforeEach((to) => {
      if (to.name !== "projectItem") return;
      const raw = to.params.project_item;
      const slug = Array.isArray(raw) ? raw[0] : raw;
      if (typeof slug === "string" && slug in projectDataBySlug) {
        warmImageUrls(projectImageAssets(slug as ProjectName).urls);
      }
    });
  },
);
