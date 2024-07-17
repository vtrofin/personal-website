import {
  createRouter,
  createWebHistory,
  createMemoryHistory,
  type RouteRecordRaw,
  type RouteRecordNormalized,
} from "vue-router";
import { key, store } from "@store/index";
import { FontAwesomeIcon } from "@libs/fa/font_awesome";
import VueApp from "./App.vue";
import HomePage from "@pages/Home.vue";
import ProjectItem from "@pages/ProjectItem.vue";
import NotFound from "@pages/NotFound.vue";
import ContactPage from "@pages/Contact.vue";
import { checkProjectRoute } from "@helpers/index";
import { handleMetaTags, metaTags } from "@helpers/meta_tags";
import { inject } from "@vercel/analytics";
import { ViteSSG as createViteSSG } from "vite-ssg";
import { createApp as createVueSPA, type App } from "vue";

inject();

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
    name: "not-found",
    meta: {
      title: "Victor Trofin - Page not found",
      metaTags: metaTags.notFound,
    },
  },
  {
    path: "/",
    component: HomePage,
    name: "homepage",
    alias: ["/home", "/work"],
    meta: {
      title: "Victor Trofin - Web Engineer in Kyoto",
      metaTags: metaTags.homePage,
    },
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
    // @ts-expect-error - Some hacky way I've put a function meta
    // even though the meta is typed as interface RouteMeta record
    meta: (route: RouteRecordNormalized | RouteLocationNormalizedLoaded) => ({
      title: `Victor Trofin - Checkout my work on ${
        route?.params?.project_item ?? "this"
      } project`,
      metaTags: metaTags.project(route),
    }),
  },
  {
    path: "/contact",
    component: ContactPage,
    name: "contact",
    meta: { title: "Victor Trofin - Contact me", metaTags: metaTags.contact },
  },
];

const router = createRouter({
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    if (to.fullPath !== from.fullPath) {
      return { top: 0, left: 0 };
    }

    return savedPosition ? savedPosition : { left: 0, top: 0 };
  },
});
router.beforeEach((to, from, next) => {
  handleMetaTags(to, from);

  return next();
});

const initAppPlugins = (app: App<Element>) => {
  app.use(router);
  app.use(store, key);
  // eslint-disable-next-line
  app.component("Fa", FontAwesomeIcon);
};

const initApp = async () => {
  const isSSG = import.meta.env.VUE_APP_SSG;

  if (isSSG) {
    const ssgApp = createViteSSG(
      VueApp,
      { routes },
      ({ app, router, routes, isClient, initialState }) => {
        initAppPlugins(app);
      },
    );

    return ssgApp;
  }

  const app = createVueSPA(VueApp);
  initAppPlugins(app);
  app.mount("#app");
};

export const app = initApp();
