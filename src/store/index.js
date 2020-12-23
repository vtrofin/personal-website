import { createStore } from 'vuex';
import heroModule from './modules/hero_module';

const store = createStore({
  state: () => ({
    count: 11,
  }),
  modules: {
    hero: heroModule,
  },
});

export default store;
