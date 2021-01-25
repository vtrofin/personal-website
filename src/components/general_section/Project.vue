<template>
  <div
    v-if="options.backgroundClass"
    :class="'item-background' + ' ' + options.backgroundClass"
    :aria-labelledby="options.type + '-title' + '-' + idx"
    :aria-describedby="options.type + '-description' + '-' + idx"
  />
  <span class="item-button" area-labelledby="buttonLabel">
    <span class="item-button-label">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title" :id="options.type + '-title' + '-' + idx">
    {{ options.title || options.item_title }}
  </h3>
  <div v-if="options.logoClass" :class="'item-logo' + ' ' + options.logoClass" />
  <div v-else class="item-divider" />
  <p class="item-text" :id="options.type + '-description' + '-' + idx">{{ options.excerpt }}</p>
</template>

<script>
export default {
  name: 'Project',
  props: {
    options: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
