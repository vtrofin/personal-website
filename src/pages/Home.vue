<template>
  <HeroSection @update-caret-position="updateCaretPosition" />
  <GeneralSection :class-name="className" :title="title" :data="projectsData" />
  <!-- <Projects></Projects>
  <Work></Work>
  <Skills></Skills>
  <Interests></Interests> -->
  <span id="blinking-cursor" :style="computedStyle" />
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import HeroSection from '../components/hero_component';
import GeneralSection from '../components/general_section';
import { projects } from '../helpers';

const projectsData = projects.map((project, i) => {
  const formatted = project.charAt(0).toUpperCase() + project.substring(1);

  return {
    path: `/projects/${project}`,
    ariaLabel: `View ${formatted} project`,
    callToAction: 'View Project',
    title: formatted,
    description:
      'Some random text about this project. Nobody likes to wait… but you can make it less of a pain. I have created. An open-source collection of loading spinners animated with CSS.',
    // logoClass: 'shipandco-logo',
    // backgroundClass: 'shipandco-background',
    type: 'project',
    project,
  };
});

export default {
  name: 'HomePage',
  components: { GeneralSection, HeroSection },
  setup(props) {
    const store = useStore();
    const computedStyle = ref({});

    const updateCaretPosition = () => {
      const { x, y } = store.getters['hero/getCoordinates'];
      computedStyle.value.left = `${x}px`;
      computedStyle.value.top = `${y}px`;
    };

    return {
      className: 'projects',
      title: 'Projects',
      projectsData,
      computedStyle,
      updateCaretPosition,
    };
  },
};
</script>

<style>
#blinking-cursor {
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
