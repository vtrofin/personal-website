<template>
  <h1>This is the homepage</h1>
  <!-- instead of using all these Sections such as Projects, Work, etc, use a General Section component since they are all the same -->
  <HeroSection />
  <GeneralSection />
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
  components: { /*Work, Projects, Skills, Interests,*/ GeneralSection, HeroSection }
};
</script>
