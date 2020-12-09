<template>
  <nav class="nav-container">
    <ul class="nav-links">
      <li><HeaderLogo /></li>
      <li><router-link to="#">Work</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><a href="https://vtrofin.github.io/">CV</a></li>
      <li class="auto-margin">
        <a
          class="social-link"
          href="https://github.com/vtrofin"
          aria-label="View my GitHub profile"
        >
          <img :src="githubLogo" :style="{ width: '25px', height: '25px' }" />
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
import githubLogo from '../assets/github.svg';
import HeaderLogo from './HeaderLogo';

export default {
  name: 'Header',
  components: {
    HeaderLogo
  },
  setup(props) {
    return {
      githubLogo
    };
  }
};
</script>

<style scoped>
.nav-container {
  --logo-size: 75px;
}

.nav-container {
  width: 100%;
  margin: 0 auto;
  position: relative;
  max-width: 1600px;
}

.nav-links {
  margin: 0 auto;
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  max-width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links li {
  max-width: 100%;
  min-width: 0;
}

.nav-links li.auto-margin {
  margin-left: auto;
}

.nav-links li a {
  padding: 1.5em 0.75em;
  display: block;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  /* color: #232320; */
  /* font-size: 1.1em; */
  /* transition: color 0.2s linear; */
}
</style>
