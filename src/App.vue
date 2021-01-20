<template>
  <div :class="toolBoxStyle" ref="toolbox">
    <!-- <nav class="toolbox-menu">
      <div class="profile" />
      <div class="list" />
    </nav>
    <button id="close-button">Close</button> -->
  </div>
  <div :class="containerStyle">
    <MainLayout :modifier="modifier" @relay-toggle-toolbox="toggleAndTranslateBody" />
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { watch, ref, reactive, onUnmounted, onMounted } from 'vue';
import MainLayout from './layouts/MainLayout';

const getProjectItem = route => route?.params?.project_item ?? '';

export default {
  name: 'App',
  components: { MainLayout },
  setup() {
    const route = useRoute();
    const store = useStore();
    const modifier = ref('');
    const toolbox = ref(null);
    const containerStyle = reactive({ container: true, 'toolbox-open': false });
    const toolBoxStyle = reactive({ 'toolbox-container': true, 'toolbox-open': false });

    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent);
    store.dispatch({ type: 'setMobileDevice', isMobile: isMobileDevice });

    watch(
      () => route.params,
      () => {
        return store
          .dispatch({
            type: 'projects/setActiveProject',
            project: getProjectItem(route),
          })
          .then(() => {
            modifier.value = getProjectItem(route);
          })
          .catch(err => {
            console.error('Failed to set current project', err.message);
            modifier.value = '';
          });
      }
    );

    const toggleAndTranslateBody = () => {
      const isActive = store.getters['checkToolBox'];
      containerStyle['toolbox-open'] = isActive;
      toolBoxStyle['toolbox-open'] = isActive;
    };

    return {
      modifier,
      toggleAndTranslateBody,
      containerStyle,
      toolBoxStyle,
      toolbox,
    };
  },
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
  background-color: var(--purple);
  -webkit-font-smoothing: antialiased;
}

#app {
  overflow: hidden;
  width: 100%;
}
#app > .container {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s;
  background-color: var(--background-white);
}

#app > .toolbox-open:nth-child(2) {
  transform: translate3d(50px, 50px, 0);
  transition: transform 0.3s;
}

.toolbox-container {
  display: none;
  position: absolute;
  z-index: 100;
  width: 320px;
  height: 320px;
  padding: 2rem;
  background-color: var(--misty-rose);
  color: var(--black);
  transform: translate3d(-320px, -320px, 0);
}
.toolbox-container.toolbox-open {
  display: block;
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s linear;
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
