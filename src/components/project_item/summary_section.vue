<template>
  <span class="summary-subtitle">{{ title }}</span>
  <ul class="summary-content">
    <li v-if="!items.length">—</li>
    <li v-for="(item, i) in items" :key="i" v-else>{{ item }}</li>
  </ul>
</template>
<script lang="ts">
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SummarySection",
  props: {
    title: { type: String, required: true },
    items: { type: Array as PropType<string[]>, required: false, default: [] },
  },
});
</script>
