<template>
  <img class="content-image" :src="$props.url" :alt="$props.altText" loading="lazy">
  <span v-if="$props.caption" class="caption-text">{{ $props.caption }}</span>
</template>
<script>
export default {
  name: 'ProjectImage',
  props: {
    url: { type: String, required: true },
    altText: { type: String, required: false, default: '' },
    caption: { type: String, required: false, default: '' },
  },
};
</script>
