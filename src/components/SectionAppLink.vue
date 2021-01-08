<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    :class="computedClassName"
    :aria-label="ariaLabel"
    target="_blank"
    rel="noopener"
  >
    <slot name="section-link-slot">Click here</slot>
  </a>

  <router-link v-else v-slot="{ href, navigate }" v-bind="$props" custom>
    <a
      v-bind="$attrs"
      :href="href"
      :class="computedClassName"
      @click="navigate"
      :aria-label="ariaLabel"
    >
      <slot name="section-link-slot">Click me</slot>
    </a>
  </router-link>
</template>

<script>
import { computed, toRefs, toRef } from 'vue';
import { RouterLink, useLink } from 'vue-router';
import { checkExternalPath, getSectionLinkClassName } from '../helpers';

export default {
  name: 'SectionAppLink',
  props: {
    ...RouterLink.props,
    ariaLabel: { type: String, required: false, default: 'View section' },
    // eslint-disable-next-line
    inactiveClass: { type: String, required: false }
  },
  setup(props) {
    const { activeClass, exactActiveClass } = toRefs(props);
    const path = toRef(props, 'to');
    const { navigate, href, route, isActive, isExactActive } = useLink(path);

    const isExternalLink = computed(() => checkExternalPath({ path: path.value }));
    const computedClassName = computed(() =>
      getSectionLinkClassName({ isExactActive, isActive, exactActiveClass, activeClass })
    );

    return { isExternalLink, computedClassName };
  }
};
</script>

<style>
.section-link {
  padding: 8rem 1.5rem;
  flex-grow: 1;
  flex-basis: 100%;
  min-height: 500px;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  position: relative;

  /* add the background color here */
  /* add the text color for the box here  */
}
@media all and (min-width: 800px) {
  .section-link {
    flex-basis: 50%;
  }
  .section-link:nth-of-type(1),
  .section-link:nth-of-type(4),
  .section-link:nth-of-type(7) {
    flex-basis: 100%;
  }
}
</style>
