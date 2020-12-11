<template>
  <a
    v-if="isExternalLink"
    v-bind="$attrs"
    :href="to"
    :class="computedClassName"
    :aria-label="ariaLabel"
    target="_blank"
  >
    <slot name="section-link-slot" />
  </a>

  <router-link v-else v-slot="{ href, navigate }" v-bind="$props" custom>
    <a
      v-bind="$attrs"
      :href="href"
      :class="computedClassName"
      @click="navigate"
      :aria-label="ariaLabel"
    >
      <slot name="section-link-slot" />
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

<style scoped>
.section-link {
  display: flex;
  flex-grow: 1;
  flex-basis: 100%;
  padding: 20px;
}
</style>
