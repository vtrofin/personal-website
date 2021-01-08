<template>
  <div class="project-summary">
    <div class="project-summary-left">
      <span class="summary-section-subtitle">Position</span>
      <ul class="summary-section-content">
        <li>Full Stack Web Engineer</li>
      </ul>
      <span class="summary-section-subtitle">Organization</span>
      <ul class="summary-section-content">
        <li>Bento&Co</li>
      </ul>
      <span class="summary-section-subtitle">Year(s)</span>
      <ul class="summary-section-content">
        <li>2018-{{ currentYear }}</li>
      </ul>
    </div>
    <div class="project-summary-right">
      <span class="summary-section-subtitle">Work</span>
      <ul class="summary-section-content">
        <li>Did this</li>
        <li>Did that</li>
        <li>Did that other thing</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ProjectSummary',
  setup(props) {
    const currentYear = `${new Date().getFullYear()}`;
    return { currentYear };
  }
};
</script>
<style>
.project-summary {
  display: flex;
  box-sizing: border-box;
  margin: 3.5rem auto;
  background-color: red;
  width: 100%;
  padding: 2rem 0.5rem;
  border-radius: var(--base-border);
}
@media all and (min-width: 600px) {
  .project-summary {
    padding: 2rem 1rem;
  }
}

.project-summary-left,
.project-summary-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0 0.5rem;
}

.summary-section-subtitle {
  font-size: 0.7rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
}

.summary-section-content {
  padding: 0;
  list-style-type: none;
  margin: 1rem 0 2.5rem;
  line-height: 1.4;
}

.summary-section-content:last-child {
  margin-bottom: 0;
}
</style>
