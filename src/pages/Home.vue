<template>
  <h1>This is the homepage</h1>
  <Projects></Projects>
  <Work></Work>
  <Skills></Skills>
  <Interests></Interests>
</template>

<script>
import Work from '../components/work';
import Projects from '../components/projects';
import Skills from '../components/skills';
import Interests from '../components/interests';

export default {
  name: 'HomePage',
  components: { Work, Projects, Skills, Interests }
};
</script>
