<template>
  <a v-if="isExternalLink" :href="path" target="_blank" :ariaLabel="ariaLabel" :class="classNames">
    <slot /> {{ title }}</a
  >
  <router-link v-else :to="path" :class="classNames"> <slot /> {{ title }} </router-link>
</template>

<script>
import { computed, toRefs, toRef } from 'vue';
import { RouterLink, useLink } from 'vue-router';
import { appLinkValidator } from './helpers/validators';
import { checkExternalPath } from '../helpers';

console.log(RouterLink);

export default {
  name: 'SectionAppLink',
  props: {
    options: {
      validator: appLinkValidator,
      default: function() {
        return { path: '#', ariaLabel: 'Dummy url link', title: 'Click here' };
      }
    },
    inactiveClass: { type: String, required: false, default: '' }
  },
  setup(props) {
    const { path, ariaLabel, title } = toRefs(props.options);
    const isExternalLink = computed(() => checkExternalPath({ path: path.value }));
    return { isExternalLink, ariaLabel, path, title, classNames: ['section-link'] };
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
