<template>
  <div v-if="computedModifiers" :class="'device' + ' ' + computedModifiers">
    <div class="device-frame">
      <img class="device-content" :src="$props.url" :alt="$props.alt" loading="lazy" />
    </div>
    <div class="device-stripe" />
    <div class="device-header" />
    <div class="device-sensors" />
    <div class="device-btns" />
    <div class="device-power" />
  </div>
  <img v-else class="content-image" :src="$props.url" :alt="$props.alt" loading="lazy" />
</template>
<script>
// See more here https://github.com/picturepan2/devices.css
// how to use it in app
// <!-- <device-mockup url="/shipandco_mediumres_1.jpg" alt="a wacky image" type="macbook" /> -->
import './devices.min.css';
import { computed } from 'vue';
import { useStore } from 'vuex';

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
    const store = useStore();
    const innerWidth = store.getters;

    const computedModifiers = computed(() => {
      const windowWidth = store.getters['getInnerWidth'];
      if (windowWidth < 500) {
        return null;
      }

      const deviceType =
        windowWidth < 650
          ? 'iphone-x'
          : windowWidth < 850
          ? 'ipad-pro'
          : props?.type || props?.type?.value || devices[devices.length - 1];
      const color = props?.color || props?.color?.value;
      return props.color ? `device-${color} device-${deviceType}` : `device-${deviceType}`;
    });

    return { computedModifiers, innerWidth };
  },
};
</script>
