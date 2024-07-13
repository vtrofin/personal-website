<template>
  <div class="spinner-container">
    <div class="small-spinner" ref="spinnerRef" />
    <div class="spinner-text">{{ $props.text }}</div>
  </div>
</template>

<script lang="ts">
import { Spinner } from "spin.js";
import { onMounted, onUnmounted, ref, defineComponent } from "vue";
export default defineComponent({
  name: "SpinnerComponent",
  props: { text: { type: String, required: false, default: "Loading..." } },
  setup() {
    let spinner;
    const spinnerRef = ref(null);

    const options = {
      lines: 12,
      length: 8,
      width: 5,
      radius: 12,
      corners: 0.6,
      rotate: 45,
      direction: 1,
      color: "#fff",
      speed: 1.2,
      trail: 60,
      shadow: false,
      hwaccel: true,
      zIndex: 2e9,
      scale: 0.55,
      animation: "spinner-line-fade-quick",
      fadeColor: "transparent",
      shadow: "0 0 1px transparent",
      left: 0,
    };

    onMounted(() => {
      spinner = new Spinner(options);
      spinner.spin(spinnerRef.value);
    });
    onUnmounted(() => {
      spinner.stop();
    });
    return { spinnerRef };
  },
});
</script>

<style>
.spinner-container {
  display: flex;
  align-content: center;
}

.small-spinner {
  position: relative;
}

.spinner-text {
  margin-left: 0.9em;
}

@keyframes spinner-line-fade-quick {

  0%,
  39%,
  100% {
    opacity: 0.25;
    /* minimum opacity */
  }

  40% {
    opacity: 1;
  }
}
</style>
