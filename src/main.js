import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// import { createStore } from 'vuex';

import App from './App.vue';
import HomePage from './pages/Home.vue';
import Contact from './pages/Contact.vue';
import ProjectItem from './pages/ProjectItem.vue';
import NotFound from './pages/NotFound.vue';
import { checkProjectRoute } from './helpers';
const routes = [
  { path: '/:pathMatch(.*)*', component: NotFound, name: 'not-found' },
  {
    path: '/',
    component: HomePage,
    name: 'homepage'
  },
  {
    path: '/contact',
    component: Contact,
    name: 'contact'
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
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// const store = createStore({
//   state() {
//     return {
//       count: 0
//     };
//   },
//   mutations: {
//     increment(state) {
//       state.count++;
//     }
//   }
// });

// store.commit('increment');
// store.commit('increment');
// console.log(store.state.count);

const app = createApp(App);
app.use(router);
// app.use(store);

app.mount('#app');
