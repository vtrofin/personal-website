import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import store from './store';
import { FontAwesomeIcon } from '../libs/fa/font_awesome';

import App from './App.vue';
import HomePage from './pages/Home.vue';
import ProjectItem from './pages/ProjectItem.vue';
import NotFound from './pages/NotFound.vue';
import Contact from './pages/Contact.vue';
import { checkProjectRoute } from './helpers';

const routes = [
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
  {
    path: '/',
    component: HomePage,
    name: 'homepage',
    alias: ['/home', '/work']
  },
  {
    path: '/projects',
    redirect: { name: 'projectItem', params: { project_item: 'shipandco' } }
  },
  {
    path: '/projects/:project_item',
    component: ProjectItem,
    name: 'projectItem',
    beforeEnter: (to, from) => {
      return checkProjectRoute(to?.params);
    }
  },
  {
    path: '/contact',
    component: Contact,
    name: 'contact'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: (to, from, savedPosition) => {
    return savedPosition ? savedPosition : { left: 0, top: 0 };
  }
});

const app = createApp(App);
app.use(router);
app.use(store);
app.component('Fa', FontAwesomeIcon);
app.config.productionTip = false;

app.mount('#app');
