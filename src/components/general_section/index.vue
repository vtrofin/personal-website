<template>
  <section :class="[className, 'general-section']">
    <h2 class="section-header">
      {{ title }}
    </h2>
    this is a general section component
  </section>
</template>

<script>
export default {
  name: 'GeneralSection',
  props: {
    className: { type: String, required: false, default: '' },
    title: { type: String, required: true },
    data: {
      validator: function(value) {
        if (!Array.isArray(value)) return false;
        for (let val of value) {
          if (!val || !val.path || !val.callToAction || !val.title || !val.description) {
            return false;
          }
        }

        return true;
      },
    },
  },
};
</script>

<style scoped>
.general-section {
  margin: 120px auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

h2 {
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
  h2 {
    font-size: 18vw;
  }
}

@media all and (min-width: 750px) {
  h2 {
    font-size: 8rem;
  }
}
</style>
