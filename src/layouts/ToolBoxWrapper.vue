<template>
  <div
    :class="'toolbox-container' + (toolboxActive ? ' ' + 'toolbox-open' : '')"
    @click.self="handleBlur"
  >
    <nav class="toolbox-menu">
      <section class="profile-container">
        <div class="profile" />
        <div class="list" />
      </section>
      <button id="close-button" @click.prevent="handleBlur">Close</button>
    </nav>
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
  --base-translate-unit: 50px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s;
  background-color: var(--background-white);
}

#app > .toolbox-open:nth-child(2) {
  transform: translate3d(var(--base-translate-unit), var(--base-translate-unit), 0);
  transition: transform 0.3s;
}
@media all and (min-width: 600px) {
  #app > .toolbox-open:nth-child(2) {
    transform: translate3d(
      calc(1.5 * var(--base-translate-unit)),
      calc(1.5 * var(--base-translate-unit)),
      0
    );
  }
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

#close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  text-indent: 1rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
  color: transparent;
  outline: none;
}
#close-button:before,
#close-button:after {
  content: '';
  position: absolute;
  width: 2px;
  height: 100%;
  top: 0;
  left: 50%;
  background: #b8b7ad;
}

#close-button:before {
  transform: rotate(45deg);
}
#close-button:after {
  transform: rotate(-45deg);
}
</style>
