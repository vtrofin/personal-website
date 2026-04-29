<template>
  <span class="item-button" aria-labelledby="buttonLabel">
    <span class="item-button-label">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title" :id="options.type + '-title' + '-' + idx">
    {{ options.title || options.item_title }}
  </h3>
  <p class="item-subtitle" :id="options.type + '-description' + '-' + idx">
    {{ options.excerpt }}
  </p>
  <div class="item-divider" />
  <p v-if="options.outcomeTag" class="item-outcome">{{ options.outcomeTag }}</p>
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
