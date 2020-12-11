<template>
  <section :class="[className, 'general-section']">
    <h2 class="section-header">{{ title }}</h2>
    <SectionAppLink
      v-for="(options, idx) in data"
      :key="idx"
      :to="options.path"
      :aria-label="options.ariaLabel"
      active-class="active"
      exact-active-class="exact-active"
    >
      <Project v-if="type == 'project'" :options="options" />
    </SectionAppLink>
  </section>
</template>

<script>
import { toRefs, toRef } from 'vue';
import SectionAppLink from '../SectionAppLink';
import Project from './Project';
import { generalSectionArrayValidator } from '../helpers/validators';

export default {
  name: 'GeneralSection',
  components: { SectionAppLink, Project },
  props: {
    className: { type: String, required: false, default: '' },
    title: { type: String, required: true },
    // eslint-disable-next-line
    data: { validator: generalSectionArrayValidator },
    type: { type: String, required: false, default: 'project' }
  }
};
</script>

<style scoped>
.general-section {
  margin: 120px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.general-section h2 {
  font-size: 16vw;
  font-weight: 800;
  letter-spacing: -0.1rem;
  text-align: left;
  line-height: 0.6rem;
  z-index: 10;
  pointer-events: none;
  flex-grow: 1;
  flex-basis: 100%;
}
@media all and (min-width: 600px) {
  .general-section h2 {
    font-size: 18vw;
  }
}

@media all and (min-width: 750px) {
  .general-section h2 {
    font-size: 8rem;
  }
}
</style>
