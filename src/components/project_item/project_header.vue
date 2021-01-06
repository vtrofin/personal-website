<template>
  <section :class="projectHeaderClass">this is the project item header</section>
</template>

<script>
import { ref, onBeforeUpdate } from 'vue';
import { getHeaderClass } from '../helpers';

export default {
  name: 'ProjectItemHeader',
  props: {
    modifierClass: { type: String, required: false, default: '.shipandco-project-active' }
  },
  setup(props) {
    const projectHeaderClass = ref(getHeaderClass(props?.modifierClass, 'project-header'));

    onBeforeUpdate(() => {
      const newClass = getHeaderClass(props?.modifierClass, projectHeaderClass.value);
      projectHeaderClass.value = newClass;
    });

    return {
      projectHeaderClass
    };
  }
};
</script>

<style>
.project-header {
  transform: translateZ(0);
  transition: background-color 0.25s ease;
}

.shipandco-project-active {
  color: var(--black);
  background-color: var(--shipandco);
}
</style>
