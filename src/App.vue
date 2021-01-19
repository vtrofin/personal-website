<template>
  <canvas
    id="toolbox-overlay"
    width="350"
    height="200"
    :style="{ display: 'block', border: '1px solid red', margin: '0 auto' }"
  />
  <MainLayout :modifier="modifier" />
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { watch, ref } from 'vue';
import MainLayout from './layouts/MainLayout';

export default {
  name: 'App',
  components: { MainLayout },
  setup(props) {
    const route = useRoute();
    const store = useStore();
    const modifier = ref('');
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    store.dispatch({ type: 'setMobileDevice', isMobile: isMobileDevice });

    watch(
      () => route.params,
      () => {
        const project = route?.params?.project_item;
        // saving current route param in the store just to have some fun with vuex
        return store
          .dispatch({
            type: 'projects/setActiveProject',
            project: route?.params?.project_item ?? ''
          })
          .then(() => {
            modifier.value = route?.params?.project_item ?? '';
          })
          .catch(err => {
            console.error('Failed to set current project', err.message);
            modifier.value = '';
          });
      }
    );

    return { modifier };
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
  --smoothjapan: #fca311;
  --bertrandandco: #a8dadc;
  --misty-rose: #f0efeb;
  --french-gray: #eddcd2;
  --base-border: 5px;
  --submit-button-disabled: lime;
  --submit-button: gray;
  --submit-button-focus: green;
  --submit-message-success: green;
  --submit-message-error: red;
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
