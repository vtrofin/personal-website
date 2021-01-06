<template>
  <section class="project-header-container">
    <div class="content">this is the project item header</div>
  </section>
</template>

<script>
import { getHeaderClass } from '../../helpers';

export default {
  name: 'ProjectItemHeader',
  props: {
    modifierClass: { type: String, required: false, default: '.shipandco-project-active' },
    projectItem: { type: String, required: false, default: null },
  },
  setup(props) {
    return {};
  },
};
</script>

<style>
.project-header-container {
  width: 100%;
  padding: 21vh 0;
}

.project-header-container .content {
  border: 1px solid black; /*dev */
}
</style>
