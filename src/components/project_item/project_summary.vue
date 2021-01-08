<template>
  <div class="summary-container">
    <h3>Summary</h3>
    <div class="summary">
      <div class="summary-left">
        <span class="summary-subtitle">Position</span>
        <ul class="summary-content">
          <li>Full Stack Web Engineer</li>
        </ul>
        <span class="summary-subtitle">Organization</span>
        <ul class="summary-content">
          <li>Bento&Co</li>
        </ul>
        <span class="summary-subtitle">Year(s)</span>
        <ul class="summary-content">
          <li>2018-{{ currentYear }}</li>
        </ul>
      </div>
      <div class="summary-right">
        <span class="summary-subtitle">Work</span>
        <ul class="summary-content">
          <li>Did this</li>
          <li>Did that</li>
          <li>Did that other thing</li>
        </ul>
      </div>
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
.summary {
  display: flex;
  box-sizing: border-box;
  margin: 3.5rem auto;
  background-color: red;
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
