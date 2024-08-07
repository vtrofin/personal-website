<template>
  <section class="project-header-container">
    <div class="content">
      <h1 tabindex="0">{{ projectTitle }}</h1>
      <p :v-if="role" class="role-class" tabindex="0">{{ role }}</p>
      <div :v-if="logoClass" :class="logoClass" />
    </div>
  </section>
</template>

<script lang="ts">
import { useStore } from '@store/index'
import { type Project } from '@store/modules/module_types';
import { reactive, onBeforeUpdate, defineComponent } from 'vue';
import { getFormattedTitle } from '@helpers/index';

type LocalState = {
  logoClass: string;
  projectTitle: string;
  excerpt: string;
  role: string;
}

const setLocalState = (localState: LocalState, projectData: Project, props: { modifier: string }) => {
  localState.logoClass = projectData?.logoClass
    ? 'item-logo' + ' ' + projectData.logoClass
    : 'item-divider';
  localState.projectTitle = projectData.item_title || getFormattedTitle(props.modifier);
  localState.excerpt = projectData.excerpt;
  localState.role = projectData.role;
};

export default defineComponent({
  name: 'ProjectItemHeader',
  props: {
    modifier: { type: String, required: false, default: '' },
  },
  setup(props) {
    const store = useStore();
    const localState = reactive<LocalState>({ logoClass: '', projectTitle: '', excerpt: '', role: '' });
    const projectData = (store.getters[`projects/${props.modifier}/getProject`] as Project) || {};
    setLocalState(localState, projectData, props);

    onBeforeUpdate(() => {
      const getterPath = `projects/${props.modifier}/getProject`;
      const newProjData = store.getters[getterPath] as Project;
      setLocalState(localState, newProjData, props);
    });

    return localState;
  },
});
</script>

<style>
.project-header-container {
  width: 100%;
  padding: 12vh 0 25vh;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.project-header-container h1 {
  font-size: 10vmin;
  font-weight: 800;
  line-height: 1.2em;
  margin: auto;
}

@media all and (min-width: 600px) {
  .project-header-container h1 {
    font-size: 4rem;
  }
}

.project-header-container .role-class {
  font-size: 1.2rem;
  margin-top: 1.5rem;
}

@media all and (min-width: 600px) {
  .project-header-container .role-class {
    margin-top: 2rem;
  }
}

.project-header-container .item-logo {
  margin-top: 5vh;
}

@media all and (min-width: 600px) {
  .project-header-container .item-logo {
    margin-top: 4.5rem;
  }
}
</style>
