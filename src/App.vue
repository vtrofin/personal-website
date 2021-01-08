<template>
  <MainLayout />
</template>

<script>
import { userStore, useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { watch } from 'vue';
import MainLayout from './layouts/MainLayout';
import { checkProjectPage } from './helpers';

export default {
  name: 'App',
  components: { MainLayout },
  setup(props) {
    const route = useRoute();
    const store = useStore();

    watch(
      () => route.params,
      () => {
        const project = route?.params?.project_item;
        return store.dispatch({
          type: 'projects/setActiveProject',
          project: route?.params?.project_item ?? ''
        });
      }
    );

    return {};
  }
};
</script>

<style>
:root {
  --white: #fff;
  --background-white: #fefaf6;
  --gray: #574b33;
  --black: #232320;
  --scarlet: #fc2f00;
  --magenta: #b6a0ea;
  --light-magenta: #f1ebff;
  --purple: #150042;
  --shipandco: #e9c46a;
  --stockandco: #f4a261;
  --staff: #e76f51;
  --utils: #2a9d8f;
  --bentoandco: #264653;
  --base-border: 15px;
}

html,
body {
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}

body {
  text-align: center;
  font-size: 16px;
  font-family: 'Helvetica Neue', 'Source Sans Pro', Arial, sans-serif;
  background-color: var(--background-white);
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
}

/* the color hack */
/* * {
  background-color: rgba(255, 0, 0, 0.2);
}
* * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * {
  background-color: rgba(0, 0, 255, 0.2);
}
* * * * {
  background-color: rgba(255, 0, 255, 0.2);
}
* * * * * {
  background-color: rgba(0, 255, 255, 0.2);
}
* * * * * * {
  background-color: rgba(255, 255, 0, 0.2);
}
* * * * * * * {
  background-color: rgba(255, 0, 0, 0.2);
}
* * * * * * * * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * * * * * * * {
  background-color: rgba(0, 0, 255, 0.2);
} */
</style>
