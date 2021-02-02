<template>
  <nav :class="classModifiers.navClass">
    <div class="nav-container">
      <ul class="nav-links">
        <li><HeaderLogo :modifier-class="classModifiers.linkClass" /></li>
        <li class="mobile-home-button">
          <router-link
            to="/"
            :class="classModifiers.linkClass"
            aria-label="Go to the Homepage"
            :aria-hidden="!isMobile"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'home']" />
            </span>
          </router-link>
        </li>
        <li
          :class="'toolbox' + (classModifiers.linkClass ? ' ' + classModifiers.linkClass : '')"
          @click.prevent="toggleToolbox"
          tabindex="0"
          aria-label="My skills"
        >
          <span :class="classModifiers.spanClass">
            <fa :icon="['fas', 'tools']" />
          </span>
        </li>
        <li>
          <router-link
            to="/contact"
            :class="classModifiers.linkClass"
            aria-label="Send me a message"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'envelope']" />
            </span>
          </router-link>
        </li>
        <li>
          <a
            :class="classModifiers.linkClass"
            href="https://vtrofin.github.io/"
            aria-label="View my curriculum vitae"
          >
            <span :class="classModifiers.spanClass">
              CV
            </span>
          </a>
        </li>
        <li class="auto-margin">
          <GithubLogo :modifier-class="classModifiers.linkClass" />
        </li>
      </ul>
    </div>
    <ProjectItemHeader v-if="modifier" :modifier="modifier" />
  </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import HeaderLogo from './HeaderLogo';
import GithubLogo from './GithubLogo';
import ProjectItemHeader from './project_item/project_header.vue';

export default {
  name: 'Header',
  components: { HeaderLogo, GithubLogo, ProjectItemHeader },
  props: { modifier: { type: String, required: false, default: '' } },
  emits: {
    toggleToolbox: null
  },
  setup(props, context) {
    const store = useStore();
    const { emit } = context;
    const { isMobile } = store.getters['checkMobile'];
    const classModifiers = computed(() => {
      const linkClass = props.modifier ? props.modifier : '';
      const spanClass = props.modifier ? props.modifier + ' ' + 'nav-link-text' : 'nav-link-text';
      const navClass = props.modifier ? props.modifier + '-project-active' : '';
      return { linkClass, spanClass, navClass };
    });

    const toggleToolbox = () => {
      const isActive = store.getters['checkToolBox'];
      store.dispatch({ type: 'setToolBoxState', isToolboxActive: !isActive });
      emit('toggleToolbox');
    };

    return { classModifiers, toggleToolbox, isMobile };
  }
};
</script>

<style>
.nav-container {
  --logo-size: 75px;
}

.nav-container {
  position: relative;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
}

.nav-links {
  margin: 0 auto;
  list-style-type: none;
  padding: 0;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-links li {
  max-width: 100%;
  min-width: 0;
}

@media all and (min-width: 600px) {
  .mobile-home-button {
    display: none;
  }
}

.toolbox {
  padding: 1.5rem;
  cursor: pointer;
  font-size: 1.1rem;
  color: var(--black);
}

.nav-links li.auto-margin {
  margin-left: auto;
}

.nav-links li a {
  padding: 1.5rem;
  display: block;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: var(--black);
  font-size: 1.1rem;
  transition: color 0.2s linear;
}
.nav-link-text {
  position: relative;
  z-index: 10;
  font-weight: 500;
}

.nav-link-text:before {
  z-index: 5;
  content: '';
  width: 100%;
  position: absolute;
  bottom: -10px;
  height: 3px;
  left: 0;
  display: block;
  background: var(--red);
  transform: translate3d(0, 5px, 0);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
}

.nav-links li:hover .nav-link-text:before {
  opacity: 1;
  transform: translateZ(0) scale3d(1.1, 1.1, 1.1) rotate(2deg);
}
</style>
