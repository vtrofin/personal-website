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
      @mouseenter="prefetchLinkedProjectImages"
      @focus="prefetchLinkedProjectImages"
      :aria-label="ariaLabel"
    >
      <slot name="section-link-slot">Click me</slot>
    </a>
  </router-link>
</template>

<script lang="ts">
import { computed, toRefs, toRef, defineComponent } from 'vue';
import { RouterLink, useLink } from 'vue-router';
import { projectDataBySlug } from '@/data/projects';
import type { ProjectName } from '@/globals';
import { projectImageAssets, warmImageUrls } from '@helpers/project_image_preloads';
import { checkExternalPath, getSectionLinkClassName } from '../helpers';

export default defineComponent({
  name: 'SectionAppLink',
  props: {
    // @ts-expect-error - Some hacky thing i did in JS. 
    ...RouterLink.props,
    ariaLabel: { type: String, required: false, default: 'View section' },
    // eslint-disable-next-line
    inactiveClass: { type: String, required: false },
    totalItems: { required: false, type: Number, default: 0 },
    activeClass: { type: String, required: true },
    exactActiveClass: { type: String, required: true },
  },
  setup(props) {
    const { activeClass, exactActiveClass, totalItems } = toRefs(props);
    const path = toRef(props, 'to');
    // @ts-expect-error - Some hacky thing i did in JS with the props.
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

    const prefetchLinkedProjectImages = () => {
      const raw = path.value;
      const pathStr = typeof raw === 'string' ? raw : '';
      const m = /^\/projects\/([^/]+)/.exec(pathStr.split('?')[0] ?? '');
      const slug = m?.[1];
      if (!slug || !(slug in projectDataBySlug)) return;
      warmImageUrls(projectImageAssets(slug as ProjectName).heroUrls);
    };

    return { isExternalLink, computedClassName, prefetchLinkedProjectImages };
  },
});
</script>

<style>
.section-link {
  padding: 4rem 2rem;
  min-height: auto;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
  position: relative;
  border-radius: 0;
}
</style>
