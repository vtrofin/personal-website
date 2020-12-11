<template>
  <a v-if="isExternalLink" href="#"><slot /></a>
  <router-link v-else to="#"><slot /></router-link>
</template>

<script>
import { computed, toRefs } from 'vue';
import { RouterLink, useLink } from 'vue-router';
import { appLinkValidator } from './helpers/validators';
import { checkExternalPath } from '../helpers';
console.log(RouterLink.props);
export default {
  name: 'SectionAppLink',
  props: {
    options: {
      validator: appLinkValidator,
      default: function() {
        return { path: '#', ariaLabel: 'Dummy url link', title: 'Click here' };
      }
    }
  },
  setup(props) {
    const { path } = toRefs(props.options);
    const isExternalLink = computed(() => checkExternalPath({ path: path.value }));
    return { isExternalLink };
  }
};
</script>
