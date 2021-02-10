<template>
  <div class="summary-container">
    <h3 tabindex="0">Summary</h3>
    <div class="summary">
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
          <li v-for="(stackItem, i) in $props.options.stack" :key="i">{{ stackItem }}</li>
        </ul>
        <span class="summary-subtitle">Work</span>
        <ul class="summary-content">
          <li v-for="(workItem, j) in $props.options.work" :key="j">{{ workItem }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectSummary',
  props: { options: { type: Object, required: true } },
  setup(props) {
    const currentYear = `${new Date().getFullYear()}`;
    return { currentYear };
  },
};
</script>
<style>
.summary-container {
  margin: 3.5rem auto;
  box-sizing: border-box;
}
.project-content .summary-container h3 {
  margin: 0;
  z-index: 10;
  font-weight: 500;
  line-height: 0.5em;
  font-size: 8vmin;
}
@media all and (min-width: 600px) {
  .project-content .summary-container h3 {
    font-size: 2.2rem;
  }
}

.summary {
  display: flex;
  box-sizing: border-box;
  background-color: var(--yellow);
  width: 100%;
  padding: 2rem 0.5rem;
  border-radius: var(--base-border);
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
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.summary-content {
  padding: 0;
  list-style-type: none;
  margin: 1rem 0 2.5rem;
  line-height: 1.4;
}

.summary-content:last-child {
  margin-bottom: 0;
}
</style>
