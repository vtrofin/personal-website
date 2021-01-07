import { createStore } from 'vuex';
import heroModule from './modules/hero_module';
import projectsModule from './modules/projects_module';

const store = createStore({
  modules: {
    hero: heroModule,
    projects: projectsModule
  }
});

export default store;
