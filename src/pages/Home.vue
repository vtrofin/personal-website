<template>
  <HeroSection @update-caret-position="updateCaretPosition" />
  <GeneralSection class-name="projects" title="Projects" :data="projectsData" />
  <GeneralSection class-name="work" title="Work" :data="workData" />
  <!-- hide cli blinking cursor until i have the time to make it interactive -->
  <!-- <span id="blinking-cursor" :style="computedStyle" /> -->
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useStore } from '@store/index'
import HeroSection from '@components/hero_component/index.vue';
import GeneralSection from '@components/general_section/index.vue';
import { getProjectData, getWorkData } from '@components/helpers';
import type { HeroModuleState, CompaniesModuleState } from '@store/modules/module_types';

export default defineComponent({
  name: 'HomePage',
  components: { GeneralSection, HeroSection },
  setup() {
    const store = useStore();
    const computedStyle = ref<Record<string, string>>({});
    const mainProjects = ["calliope", "ats", "shipandco"]

    const allCompanies = store.getters['companies/getAllCompanies'] as CompaniesModuleState["companies"];
    const projectsData = getProjectData(mainProjects, store);
    const workData = getWorkData(allCompanies);
    const updateCaretPosition = () => {
      // sad but true; getters are not type safe
      const { x, y } = store.getters['hero/getCoordinates'] as HeroModuleState["coordinates"];
      computedStyle.value.left = `${x}px`;
      computedStyle.value.top = `${y}px`;
    };

    return {
      workData,
      projectsData,
      computedStyle,
      updateCaretPosition,
    };
  },
});
</script>

<style>
#blinking-cursor,
#animation-blinking-cursor {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 0.5rem;
  height: 1rem;
  line-height: 1.2rem;
  background-color: #606060;
  vertical-align: top;
  -webkit-animation: cursor-blink 1s step-end infinite;
  animation: cursor-blink 1s step-end infinite;
}

#animation-blinking-cursor {
  position: relative;
  display: none;
}

@-webkit-keyframes cursor-blink {
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0.8;
  }
}

@keyframes cursor-blink {
  0% {
    opacity: 0.8;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 0.8;
  }
}
</style>
