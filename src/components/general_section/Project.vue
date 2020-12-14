<template>
  <div
    v-if="options.backgroundClass"
    :class="'item-background' + ' ' + options.backgroundClass"
  ></div>
  <span class="item-button">
    <span class="item-button-label">{{ options.callToAction }}</span>
  </span>
  <h3 class="item-title">{{ options.title }}</h3>
  <div v-if="options.logoClass" :class="'item-logo' + ' ' + options.logoClass"></div>
  <div v-else class="item-divider" />
  <p class="item-text">{{ options.description }}</p>
</template>

<script>
// import { toRefs } from 'vue';

export default {
  name: 'Project',
  props: {
    options: {
      type: Object,
      required: true
    }
  }
  // setup(props) {
  //   const { options } = toRefs(props);
  //   console.log(options.value);
  //   return { title: options.value.title };
  // }
};
</script>

<style scoped></style>
