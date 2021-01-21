<template>
  <ToolBoxWrapper :toolbox-state="toolboxState" @toggle-toolbox-state="toggleAndTranslateBody">
    <MainLayout :modifier="modifier" @relay-toggle-toolbox="toggleAndTranslateBody" />
  </ToolBoxWrapper>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { watch, ref, reactive } from 'vue';
import MainLayout from './layouts/MainLayout';
import ToolBoxWrapper from './layouts/ToolBoxWrapper';

const getProjectItem = route => route?.params?.project_item ?? '';

export default {
  name: 'App',
  components: { MainLayout, ToolBoxWrapper },
  setup() {
    const route = useRoute();
    const store = useStore();
    const modifier = ref('');
    const toolboxState = reactive({ active: false });

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
      toolboxState.active = isActive;
    };

    return {
      modifier,
      toggleAndTranslateBody,
      toolboxState,
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
