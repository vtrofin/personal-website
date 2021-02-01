<template>
  <img
    v-if="innerWidth < 500"
    class="content-image"
    :src="$props.url"
    :alt="$props.alt"
    loading="lazy"
  />
  <div v-else :class="'device' + ' ' + computedModifiers">
    <div class="device-frame">
      <img class="device-content" :src="$props.url" :alt="$props.alt" loading="lazy" />
    </div>
    <div class="device-stripe" />
    <div class="device-header" />
    <div class="device-sensors" />
    <div class="device-btns" />
    <div class="device-power" />
  </div>
</template>
<script>
import './devices.min.css';
import { computed,  onMounted, ref, watch} from 'vue';

const devices = ['iphone-x', 'iphone-8', 'ipad-pro', 'macbook', 'macbook-pro'];
export default {
  name: 'DeviceMockup',
  props: {
    url: { type: String, required: true },
    alt: { type: String, required: true },
    // eslint-disable-next-line
    type: {
      required: false,
      validator: value => {
        if (value === null || value === undefined || value === '') {
          return true;
        }
        return typeof value === 'string' && devices.includes(value);
      },
    },
    // eslint-disable-next-line
    color: { type: String, required: false },
  },
  setup(props) {
    const innerWidth = ref(window.innerWidth);
    watch(
      () => window.innerWidth,
      () => {
        innerWidth.value = window.innerWidth;
      }
    );
    // iphone-x 428px
    // ipad-pro 560px
    // macbook-pro 740px

// put window widht on the App and save in store
// put resize on app on mount and unmount
// get window value here and get computedMOdifiers
onMounted() {
  window.addEventListener('resize', () => {
    this.windowHeight = window.innerHeight
  })
}

    const computedModifiers = computed(() => {
      const deviceType = props?.type || props?.type?.value;
      const color = props?.color || props?.color?.value;
      return props.color ? `device-${color} device-${deviceType}` : `device-${deviceType}`;
    });

    return { computedModifiers, innerWidth };
  },
};
</script>
