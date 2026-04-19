<template>
  <section class="project-header-container">
    <div class="content">
      <h1 tabindex="0">{{ projectTitle }}</h1>
    </div>
  </section>
</template>

<script lang="ts">
import { useProjectsStore } from '@store/useProjectsStore';
import { type Project } from '@store/modules/module_types';
import { reactive, onBeforeUpdate, defineComponent, type PropType } from 'vue';
import { getFormattedTitle } from '@helpers/index';
import type { ProjectName } from 'src/globals';

type LocalState = {
  projectTitle: string;
}

const setLocalState = (localState: LocalState, projectData: Project, props: { modifier: string }) => {
  localState.projectTitle = projectData.item_title || getFormattedTitle(props.modifier);
};

export default defineComponent({
  name: 'ProjectItemHeader',
  props: {
    modifier: { type: String as PropType<ProjectName>, required: false, default: '' },
  },
  setup(props) {
    const projectsStore = useProjectsStore();
    const localState = reactive<LocalState>({ projectTitle: '' });
    const projectData = projectsStore.getProjectByName(props.modifier);
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
  padding: 2vh 0 4vh;
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
</style>
