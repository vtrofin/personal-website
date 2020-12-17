// this is where we'll put the store
// split the store in multiple modules -> one for the hero component || one for the projects || one for the work experience, etc. etc
// namespaced modules!
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
