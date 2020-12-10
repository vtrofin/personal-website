<template>
  <!-- instead of using all these Sections such as Projects, Work, etc, use a General Section component since they are all the same -->
  <HeroSection />
  <GeneralSection :className="className" :title="title"></GeneralSection>
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

export default {
  name: 'HomePage',
  /*Work, Projects, Skills, Interests,*/
  components: { GeneralSection, HeroSection },
  setup(props) {
    return {
      className: 'projects',
      title: 'Projects'
    };
  }
};
</script>
