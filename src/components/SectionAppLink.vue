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
    inactiveClass: { type: String, required: false },
    totalItems: { required: false, type: Number, default: 0 },
  },
  setup(props) {
    const { activeClass, exactActiveClass, totalItems } = toRefs(props);
    const path = toRef(props, 'to');
    const { isActive, isExactActive } = useLink(props);

    const isExternalLink = computed(() => checkExternalPath({ path: path.value }));
    const computedClassName = computed(() =>
      getSectionLinkClassName({
        isExactActive,
        isActive,
        exactActiveClass,
        activeClass,
        totalItems: totalItems.value,
      })
    );

    return { isExternalLink, computedClassName };
  },
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
}
.section-link:first-of-type {
  border-top-left-radius: var(--base-border);
  border-top-right-radius: var(--base-border);
}
.section-link:nth-last-child(2) {
  border-bottom-left-radius: var(--base-border);
}
.section-link:last-of-type {
  border-bottom-right-radius: var(--base-border);
}

@media all and (min-width: 1000px) {
  .section-link {
    flex-basis: 50%;
  }
  .section-link:first-of-type,
  .section-link:nth-of-type(3n + 1) {
    flex-basis: 100%;
  }
  .section-link.force-half-width {
    flex-basis: 50%;
  }

  .section-link.force-half-width:first-of-type {
    border-top-right-radius: 0px;
    border-bottom-left-radius: var(--base-border);
  }
  .section-link.force-half-width:last-of-type {
    border-bottom-left-radius: 0px;
    border-top-right-radius: var(--base-border);
  }
}
</style>
