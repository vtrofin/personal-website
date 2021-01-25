<template>
  <div v-if="options.backgroundClass" :class="'item-background' + ' ' + options.backgroundClass" />
  <span class="item-button" area-labelledby="buttonLabel">
    <span class="item-button-label" id="buttonLabel">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title" id="itemTitle">{{ options.title || options.item_title }}</h3>
  <div v-if="options.logoClass" :class="'item-logo' + ' ' + options.logoClass" />
  <div v-else class="item-divider" />
  <p class="item-text" id="itemText">{{ options.excerpt }}</p>
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
