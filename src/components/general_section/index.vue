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
      <template #section-link-slot>
        <span>{{ options.title }}</span>
      </template>
    </SectionAppLink>
  </section>
</template>

<script>
import { toRefs } from 'vue';
import SectionAppLink from '../SectionAppLink';
import { generalSectionArrayValidator } from '../helpers/validators';

export default {
  name: 'GeneralSection',
  components: { SectionAppLink },
  props: {
    className: { type: String, required: false, default: '' },
    title: { type: String, required: true },
    // eslint-disable-next-line
    data: { validator: generalSectionArrayValidator }
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
