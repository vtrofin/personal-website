<template>
  <ToolBoxWrapper>
    <MainLayout :modifier="modifier" />
  </ToolBoxWrapper>
</template>

<script lang="ts">
import { useAppStore } from '@store/useAppStore';
import { useProjectsStore } from '@store/useProjectsStore';
import { useRoute, type RouteLocationNormalizedLoaded } from 'vue-router';
import { watch, ref, onMounted, onUnmounted, defineComponent } from 'vue';
import MainLayout from '@layouts/MainLayout.vue';
import ToolBoxWrapper from '@layouts/ToolBoxWrapper.vue';

const getProjectItem = (route: RouteLocationNormalizedLoaded): string => {
  const project = route?.params?.project_item

  if (!project) {
    return ""
  }

  if (Array.isArray(project)) {
    return project[0] ?? ""
  }

  return project
}

const App = defineComponent({
  name: 'App',
  components: { MainLayout, ToolBoxWrapper },
  setup() {
    const route = useRoute();
    const appStore = useAppStore();
    const projectsStore = useProjectsStore();
    const modifier = ref('');

    const hasWindow = typeof window !== 'undefined';
    const isMobileDevice = hasWindow ? /Mobi/i.test(window.navigator.userAgent) : false
    const isAndroid = hasWindow ? /Android/i.test(window.navigator.userAgent) : false

    appStore.setMobileDevice({ isMobile: isMobileDevice, isAndroid });

    watch(
      () => route.params,
      async () => {
        try {
          projectsStore.setActiveProject(getProjectItem(route));
          modifier.value = getProjectItem(route);
        } catch (err) {
          console.error('Failed to set current project', err instanceof Error ? err.message : err);
          modifier.value = '';
        }
      },
      { immediate: true }
    );

    const resizeHandler = () => {
      const hasWindow = typeof window !== 'undefined';
      const windowWidth = hasWindow ? window.innerWidth : 0

      appStore.setWindowWidth(windowWidth);
    };

    onMounted(() => {
      const hasWindow = typeof window !== 'undefined';
      const windowWidth = hasWindow ? window.innerWidth : 0
      appStore.setWindowWidth(windowWidth);

      if (hasWindow) {
        window.addEventListener('resize', resizeHandler)
      };
    });

    onUnmounted(() => {
      const hasWindow = typeof window !== 'undefined';

      if (hasWindow) {
        window.removeEventListener('resize', resizeHandler);
      }
    });

    return {
      modifier,
    };
  },
});

export default App
</script>

<style>
:root {
  --white: #fff;
  --background-white: #fefaf6;
  --gray: #574b33;
  --black: #232320;
  --yellow: #f6bd60;
  --light-yellow: #f7ede2;
  --pink: #f5cac3;
  --light-green: #84a59d;
  --red: #f28482;
  --purple: #150042;
  --misty-rose: #f0efeb;
  --peach: #f4a47c;
  --light-blue: #b8c8f4;
  --base-border: 5px;
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
  text-rendering: optimizeLegibility;
}

#app {
  overflow: hidden;
  width: 100%;
}

a {
  outline: none;
}

[tabindex='0'] {
  outline: none;
}

*::-moz-focus-inner {
  border: 0;
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
