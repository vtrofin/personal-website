<template>
  <section class="how-i-work">
    <h2 class="how-i-work-heading">How I Work</h2>
    <ol class="how-i-work-steps">
      <li v-for="(step, idx) in steps" :key="step.title" class="how-i-work-step">
        <span class="step-number" aria-hidden="true">{{ idx + 1 }}</span>
        <div class="step-content">
          <h3 class="step-title">{{ step.title }}</h3>
          <p class="step-description">{{ step.description }}</p>
        </div>
      </li>
    </ol>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { processSteps } from "@/data/process";

export default defineComponent({
  name: "HowIWork",
  setup() {
    return { steps: processSteps };
  },
});
</script>

<style>
.how-i-work {
  background-color: var(--color-bg);
  color: var(--color-text-light);
  padding: 2rem 0;
  margin: 120px auto;
  border-radius: var(--base-border)
}

.how-i-work-heading {
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 2.5rem;
}

.how-i-work-steps {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .how-i-work-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .how-i-work-steps {
    grid-template-columns: repeat(2, 1fr);
  }
}

.how-i-work-step {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 1rem;
  text-align: left;
}

.step-number {
  font-size: 2rem;
  font-weight: 800;
  color: var(--color-accent);
  line-height: 1;
  flex-shrink: 0;
}

.step-content {
  min-width: 0;
  border-left: 2px solid var(--color-accent);
  padding-left: 1rem;
}

.step-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.step-description {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  margin: 0;
  opacity: 0.85;
}
</style>
