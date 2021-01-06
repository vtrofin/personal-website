<template>
  <nav :class="headerClass">
    <div class="nav-container">
      <ul class="nav-links">
        <li><HeaderLogo /></li>
        <li>
          <router-link to="#">
            <span class="nav-link-text">Work</span>
          </router-link>
        </li>
        <li>
          <router-link to="/contact">
            <span class="nav-link-text">Contact</span>
          </router-link>
        </li>
        <li>
          <a href="https://vtrofin.github.io/"><span class="nav-link-text">CV</span></a>
        </li>
        <li class="auto-margin">
          <GithubLogo />
        </li>
      </ul>
    </div>
    <ProjectItemHeader
      v-if="isProjectPage"
      :modifier-class="headerClass"
      :project-item="$route.params.project_item"
    />
  </nav>
</template>

<script>
import { ref, onBeforeUpdate, watch } from 'vue';
import { useRoute } from 'vue-router';
import HeaderLogo from './HeaderLogo';
import GithubLogo from './GithubLogo';
import ProjectItemHeader from './project_item/project_header.vue';
import { projects } from '../helpers';

export default {
  name: 'Header',
  components: { HeaderLogo, GithubLogo, ProjectItemHeader },
  props: { modifierClass: { type: String, required: false, default: '' } },
  setup(props) {
    const route = useRoute();
    const isProjectPage = ref(false);
    const headerClass = ref('');

    const checkProjectPage = () => {
      return projects.includes(route?.params?.project_item);
    };

    const isProject = checkProjectPage();
    isProjectPage.value = isProject;
    if (isProject) {
      headerClass.value = `${route?.params?.project_item}-project-active`;
    }

    watch(
      () => route.params,
      () => {
        isProjectPage.value = checkProjectPage();
        headerClass.value = route?.params?.project_item
          ? `${route.params.project_item}-project-active`
          : '';
      }
    );

    return { isProjectPage, headerClass };
  },
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

.nav-links li.auto-margin {
  margin-left: auto;
}
.nav-links li:nth-child(2) a {
  padding-left: 0px;
}

.nav-links li a {
  padding: 1.5rem 0.75rem;
  display: block;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: #232320;
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
  background: var(--scarlet);
  transform: translate3d(0, 5px, 0);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
}

.nav-links li:hover .nav-link-text:before {
  opacity: 1;
  transform: translateZ(0) scale3d(1.1, 1.1, 1.1) rotate(2deg);
}
</style>
