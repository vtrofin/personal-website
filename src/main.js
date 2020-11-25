import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
// import { createStore } from 'vuex';

import App from './App.vue';
import HomePage from './pages/Home.vue';
import Contact from './pages/Contact.vue';
import ProjectItem from './pages/ProjectItem.vue';
import NotFound from './pages/NotFound.vue';
import { projects } from './helpers/';

const routes = [
  { path: '/:pathMatch(.*)', component: NotFound },
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
    beforeEnter: to => {
      const toProject = to?.params?.project_item;
      const isValidProject = !!projects.find(proj => proj === toProject);
      return isValidProject ? true : { path: '/projects', params: { project_item: projects[0] } };
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
