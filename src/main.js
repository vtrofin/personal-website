import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import store from "./store";
import { FontAwesomeIcon } from "../libs/fa/font_awesome";
import App from "./App.vue";
import HomePage from "./pages/Home.vue";
import ProjectItem from "./pages/ProjectItem.vue";
import NotFound from "./pages/NotFound.vue";
import ContactPage from "./pages/Contact.vue";
import { checkProjectRoute } from "./helpers";
import { handleMetaTags, metaTags } from "./helpers/meta_tags";
import { inject } from "@vercel/analytics";

inject();

const routes = [
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
    meta: (route) => ({
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
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition ? savedPosition : { left: 0, top: 0 };
  },
});
router.beforeEach(handleMetaTags);

const app = createApp(App);
app.use(router);
app.use(store);
// eslint-disable-next-line
app.component("Fa", FontAwesomeIcon);
app.config.productionTip = false;

app.mount("#app");
