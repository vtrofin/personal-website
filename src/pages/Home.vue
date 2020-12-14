<template>
  <!-- instead of using all these Sections such as Projects, Work, etc, use a General Section component since they are all the same -->
  <HeroSection />
  <GeneralSection :class-name="className" :title="title" :data="projectsData" />
  <!-- <Projects></Projects>
  <Work></Work>
  <Skills></Skills>
  <Interests></Interests> -->
</template>

<script>
// import Work from '../components/work';
// import Projects from '../components/projects';
// import Skills from '../components/skills';
// import Interests from '../components/interests';
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
    logoClass: 'shipandco-logo',
    backgroundClass: 'shipandco-background',
    type: 'project'
  };
});

export default {
  name: 'HomePage',
  components: { GeneralSection, HeroSection }, // Work, Projects, Skills, Interests
  setup(props) {
    return {
      className: 'projects',
      title: 'Projects',
      projectsData
    };
  }
};
</script>

<style></style>
