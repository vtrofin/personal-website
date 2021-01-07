<template>
  <div v-if="options.backgroundClass" :class="'item-background' + ' ' + options.backgroundClass" />
  <span class="item-button">
    <span class="item-button-label">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title">{{ options.title || options.item_title }}</h3>
  <div v-if="options.logoClass" :class="'item-logo' + ' ' + options.logoClass" />
  <div v-else class="item-divider" />
  <p class="item-text">{{ options.excerpt }}</p>
</template>

<script>
export default {
  name: 'Project',
  props: {
    options: {
      type: Object,
      required: true
    }
  }
};
</script>

<style></style>
