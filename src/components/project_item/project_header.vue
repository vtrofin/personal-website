<template>
  <section class="project-header-container">
    <div class="content">
      <h1>{{ projectTitle }}</h1>
      <div :v-if="logoClass" :class="logoClass"></div>
      <p :v-if="excerpt">{{ excerpt }}</p>
    </div>
  </section>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, onBeforeUpdate } from 'vue';
import { getFormattedTitle } from '../../helpers';

const setLocalState = (localState, projectData, props) => {
  localState.logoClass = projectData?.logoClass ? 'item-logo' + ' ' + projectData.logoClass : '';
  localState.projectTitle = projectData.item_title || getFormattedTitle(props.projectItem);
  localState.excerpt = projectData.excerpt;
};

export default {
  name: 'ProjectItemHeader',
  props: {
    modifierClass: { type: String, required: false, default: '.shipandco-project-active' },
    projectItem: { type: String, required: false, default: null }
  },
  setup(props) {
    const store = useStore();
    const localState = reactive({ logoClass: '', projectTitle: '', excerpt: '' });
    const projectData = store.getters[`projects/${props.projectItem}/getProject`] || {};
    setLocalState(localState, projectData, props);

    onBeforeUpdate(() => {
      const getterPath = `projects/${props.projectItem}/getProject`;
      const newProjData = store.getters[getterPath];
      setLocalState(localState, newProjData, props);
    });

    return localState;
  }
};
</script>

<style>
.project-header-container {
  width: 100%;
  padding: 12vh 0 30vh;
}
@media all and (min-width: 600px) {
  .project-header-container {
    padding-bottom: 20vh;
  }
}

.project-header-container h1 {
  font-size: 10vw;
  font-weight: 800;
  line-height: 1.2em;
  max-width: 800px;
  margin: auto;
}
@media all and (min-width: 1000px) {
  .project-header-container h1 {
    font-size: 4.2rem;
  }
}

.project-header-container .item-logo,
.project-header-container p {
  margin: 5vh auto 0;
  max-width: 800px;
}
.project-header-container p {
  font-style: italic;
}
@media all and (min-width: 600px) {
  .project-header-container .item-logo,
  .project-header-container p {
    margin-top: 4.5rem;
  }
}
</style>
