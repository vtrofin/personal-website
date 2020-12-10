<template>
  <section :class="className">
    <h2 class="section-header">{{ title }}</h2>
    this is a general section component
  </section>
</template>

<script>
export default {
  name: 'GeneralSection',
  props: {
    className: { type: String, required: false },
    title: { type: String, required: true }
  }
};
</script>

<style scoped></style>
