<template>
  <div
    :class="'toolbox-container' + (toolboxActive ? ' ' + 'toolbox-open' : '')"
    @click.self="handleBlur"
  >
    <div class="toolbox-menu" />
    <!-- <nav class="toolbox-menu"> <div class="profile" /> <div class="list" /> </nav> <button id="close-button">Close</button> -->
  </div>

  <div :class="'container' + (toolboxActive ? ' ' + 'toolbox-open' : '')">
    <slot />
  </div>
</template>
<script>
import { toRefs } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ToolBoxWrapper',
  props: {
    toolboxState: { type: Object, required: true },
  },
  emits: {
    toggleToolboxState: ({ isActive }) => {
      return typeof isActive === 'boolean';
    },
  },
  setup(props, context) {
    const { active: toolboxActive } = toRefs(props.toolboxState);
    const { emit } = context;
    const store = useStore();

    const handleBlur = e => {
      if (toolboxActive) {
        store.dispatch({ type: 'setToolBoxState', isToolboxActive: false });
        emit('toggleToolboxState', { isActive: false });
      }
    };

    return { toolboxActive, handleBlur };
  },
};
</script>
<style>
#app > .container {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s;
  background-color: var(--background-white);
}

#app > .toolbox-open:nth-child(2) {
  transform: translate3d(50px, 50px, 0);
  transition: transform 0.3s;
}

.toolbox-container {
  display: none;
  position: fixed;
  overflow: hidden;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: transparent;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.toolbox-container.toolbox-open {
  display: block;
}

.toolbox-menu {
  position: absolute;
  box-sizing: border-box;
  z-index: 101;
  width: 320px;
  height: 320px;
  padding: 2rem;
  background-color: var(--misty-rose);
  color: var(--black);
  transform: translate3d(-320px, -320px, 0);
}
.toolbox-open .toolbox-menu {
  transform: translate3d(0, 0, 0);
  transition: transform 0.2s linear;
}
</style>
