<template>
  <img class="content-image" :src="$props.url" :alt="$props.altText" loading="lazy" />
  <span v-if="$props.caption" class="caption-text">{{ $props.caption }}</span>
</template>
<script>
export default {
  name: 'ProjectImage',
  props: ['url', 'altText', 'caption'],
};
</script>
