<template>
  <section class="project-header-container">
    <div class="content">
      <h1 tabindex="0">{{ projectTitle }}</h1>
      <p :v-if="role" class="role-class" tabindex="0">{{ role }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { useProjectsStore } from '@store/useProjectsStore';
import { type Project } from '@store/modules/module_types';
import { reactive, onBeforeUpdate, defineComponent } from 'vue';
import { getFormattedTitle } from '@helpers/index';

type LocalState = {
  projectTitle: string;
  excerpt: string;
  role: string;
}

const setLocalState = (localState: LocalState, projectData: Project, props: { modifier: string }) => {
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
    const projectsStore = useProjectsStore();
    const localState = reactive<LocalState>({ projectTitle: '', excerpt: '', role: '' });
    const projectData = projectsStore.getProjectByName(props.modifier) || {};
    setLocalState(localState, projectData, props);

    onBeforeUpdate(() => {
      const newProjData = projectsStore.getProjectByName(props.modifier);
      setLocalState(localState, newProjData, props);
    });

    return localState;
  },
});
</script>

<style>
.project-header-container {
  width: 100%;
  padding: 4vh 0 2vh;
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
</style>
