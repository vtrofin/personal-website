<template>
  <picture>
    <source v-if="$props.srcSmall" media="(max-width: 768px)" :srcset="$props.srcSmall">
    <img
      class="content-image"
      :src="$props.url"
      :alt="$props.altText"
      width="1484"
      height="750"
      :loading="$props.priority === 'high' ? undefined : 'lazy'"
      :fetchpriority="$props.priority === 'high' ? 'high' : undefined"
    >
  </picture>
  <span v-if="$props.caption" class="caption-text">{{ $props.caption }}</span>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ProjectImage',
  props: {
    url: { type: String, required: true },
    altText: { type: String, required: false, default: '' },
    caption: { type: String, required: false, default: '' },
    priority: { type: String, required: false, default: 'lazy' },
    srcSmall: { type: String, required: false, default: '' },
  },
});
</script>
