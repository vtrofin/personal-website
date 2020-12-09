<template>
  <nav class="nav-container">
    <ul class="nav-links">
      <li><HeaderLogo /></li>
      <li><router-link to="#">Work</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
      <li><a href="https://vtrofin.github.io/">CV</a></li>
      <li class="auto-margin"><GithubLogo /></li>
    </ul>
  </nav>
</template>

<script>
import HeaderLogo from './HeaderLogo';
import GithubLogo from './GithubLogo';

export default {
  name: 'Header',
  components: {
    HeaderLogo,
    GithubLogo
  },
  setup(props) {
    return {};
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
  margin-left: 10px;
}

.nav-links li.auto-margin {
  margin-left: auto;
}

.nav-links li a {
  padding: 1.5em 0.75em 1.5em 0;
  display: block;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  /* color: #232320; */
  /* font-size: 1.1em; */
  /* transition: color 0.2s linear; */
}
</style>
