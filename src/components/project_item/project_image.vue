<template>
  <img class="content-image" :src="$props.url" :alt="$props.altText" loading="lazy">
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
  },
});
</script>
