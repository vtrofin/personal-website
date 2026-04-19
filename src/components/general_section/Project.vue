<template>
  <span class="item-button" area-labelledby="buttonLabel">
    <span class="item-button-label">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title" :id="options.type + '-title' + '-' + idx">
    {{ options.title || options.item_title }}
  </h3>
  <div class="item-divider" />
  <p class="item-text" :id="options.type + '-description' + '-' + idx">
    {{ options.excerpt }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ProjectComponent",
  props: {
    options: {
      type: Object,
      required: true,
    },
    idx: { type: Number, required: true },
  },
});
</script>

<style></style>
