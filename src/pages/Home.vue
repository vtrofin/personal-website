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
import HeroSection from '../components/hero_component';
import GeneralSection from '../components/general_section';
import { getProjectData, getWorkData } from '../components/helpers';

export default defineComponent({
  name: 'HomePage',
  components: { GeneralSection, HeroSection },
  setup() {
    const store = useStore();
    const computedStyle = ref({});
    const _allProjects = store.getters['projects/getAllProjects'];
    const mainProjects = ["calliope", "ats", "shipandco"]

    const allCompanies = store.getters['companies/getAllCompanies'];
    const projectsData = getProjectData(mainProjects, store); // _allProjects
    const workData = getWorkData(allCompanies);
    const updateCaretPosition = () => {
      const { x, y } = store.getters['hero/getCoordinates'];
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
