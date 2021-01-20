<template>
  <!-- this file is unused -->
  <!-- https://github.com/FortAwesome/vue-fontawesome/issues/230#issuecomment-696719673 -->
  <svg xmlns="http://www.w3.org/2000/svg" :class="$props.class" :viewBox="`0 0 ${width} ${height}`">
    <path fill="currentColor" :d="svgPath" />
  </svg>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { findIconDefinition } from '@fortawesome/fontawesome-svg-core';

export default defineComponent({
  name: 'FontAwesomeIcon',
  props: {
    icon: { type: String, required: true },
    type: { type: String, default: 'fas', required: false },
    class: String,
  },

  setup(props) {
    const definition = computed(() => {
      return findIconDefinition({ prefix: props.type, iconName: props.icon });
    });
    const width = computed(() => definition.value.icon[0]);
    const height = computed(() => definition.value.icon[1]);
    const svgPath = computed(() => definition.value.icon[4]);

    return { width, height, svgPath };
  },
});
</script>
