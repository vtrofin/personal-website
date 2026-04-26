<template>
  <aside class="summary-container" aria-labelledby="at-a-glance-heading">
    <div class="summary">
      <h2 id="at-a-glance-heading" tabindex="0">At a glance</h2>
      <div class="summary-columns">
        <div class="summary-left" tabindex="0">
          <span class="summary-subtitle">Position</span>
          <ul class="summary-content">
            <li>{{ $props.options.position }}</li>
          </ul>
          <span class="summary-subtitle">Organization</span>
          <ul class="summary-content">
            <li>{{ $props.options.organization }}</li>
          </ul>
          <span class="summary-subtitle">Year(s)</span>
          <ul class="summary-content">
            <li>{{ $props.options.years }}</li>
          </ul>
        </div>
        <div class="summary-right" tabindex="0">
          <span class="summary-subtitle">Stack</span>
          <ul class="summary-content">
            <li v-for="(stackItem, i) in $props.options.stack" :key="i">
              {{ stackItem }}
            </li>
          </ul>
          <span class="summary-subtitle">Work</span>
          <ul class="summary-content">
            <li v-for="(workItem, j) in $props.options.work" :key="j">
              {{ workItem }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </aside>
</template>
<script lang="ts">
import type { ProjectSummaryOptions } from "@/data/types";
import type { PropType } from "vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProjectSummary",
  props: {
    options: {
      type: Object as PropType<ProjectSummaryOptions>,
      required: true,
    },
    modifier: { type: String, required: false, default: "" },
  },
  setup() {
    const currentYear = `${new Date().getFullYear()}`;
    return { currentYear };
  },
});
</script>
<style>
.summary-container {
  margin: 3.5rem auto;
  box-sizing: border-box;
}

.project-content .summary-container h2 {
  margin: 0 0 1rem;
  font-weight: 700;
  line-height: 1.2;
  font-size: 1.75rem;
  text-align: left;
}

.summary {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border: 2px solid var(--color-accent);
  width: 100%;
  padding: 2rem 0.5rem;
  border-radius: var(--radius-base);
}

.summary-columns {
  display: flex;
  border-top: 1px solid rgba(193, 98, 63, 0.25);
  padding-top: 1rem;
}

@media all and (min-width: 600px) {
  .summary {
    padding: 2rem 1rem;
  }
}

.summary-left,
.summary-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.summary-subtitle {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--color-accent);
  border-left: 2px solid var(--color-accent);
  padding-left: 0.5rem;
}

.summary-content {
  padding: 1rem 0;
  list-style-type: none;
  margin: 0 0 1.5rem;
  line-height: 1.4;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.summary-content li {
  font-size: 0.95rem;
  opacity: 0.85;
}

.summary-content:last-child {
  margin-bottom: 0;
}
</style>
