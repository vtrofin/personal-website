<template>
  <div :class="'device' + ' ' + computedModifiers">
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
import { computed, ref } from 'vue';

const devices = [
  'iphone-x',
  'iphone-8',
  'google-pixel-2-xl',
  'google-pixel',
  'ipad-pro',
  'surface-pro',
  'surface-book',
  'macbook',
  'macbook-pro',
  'imac-pro',
  'apple-watch',
  'samsung-galaxy-s8',
];
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
    const computedModifiers = computed(() => {
      const deviceType = props?.type || props?.type?.value;
      const color = props?.color || props?.color?.value;
      return props.color ? `device-${color} device-${deviceType}` : `device-${deviceType}`;
    });

    return { computedModifiers };
  },
};
</script>
