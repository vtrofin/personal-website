<template>
  <nav>
    <div class="nav-container">
      <ul class="nav-links">
        <li><router-link to="#">Work</router-link></li>
        <li><router-link to="/contact">Contact</router-link></li>
        <li><a href="https://vtrofin.github.io/">CV</a></li>
      </ul>
      <HeaderLogo />
      <ul class="social-links">
        <li>
          <a
            class="social-link"
            href="https://github.com/vtrofin"
            aria-label="View my GitHub profile"
          >
            <img :src="githubLogo" :style="{ width: '25px', height: '25px' }" />
          </a>
        </li>
      </ul>
    </div>
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
nav {
  width: 100%;
}

.nav-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 90%;
  margin: 0 auto;
  align-items: center;
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

nav ul li {
  display: inline-block;
  padding: 0.5rem;
}
nav #logo {
  flex-grow: 1;
}
</style>
