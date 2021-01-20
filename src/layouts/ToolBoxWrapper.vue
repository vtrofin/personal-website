<template>
  <div
    :class="'toolbox-container' + (toolboxActive ? ' ' + 'toolbox-open' : '')"
    @click.self="handleBlur"
  >
    <nav class="toolbox-menu">
      <section class="profile-container">
        <div class="profile">
          <img src="/img_vt.jpg" alt="victor trofin" loading="lazy" width="42px" />
          <span class="caption-text">Victor Trofin</span>
        </div>
        <div class="toolbox-list">
          <span>Something</span>
          <span>Something Else </span>
          <span>Something New</span>
          <span>Another</span>
          <span>Before</span>
        </div>
        <div class="toolbox-icons">
          <div id="js" />
          <div id="node-js" />
          <div id="python" />
          <div id="go" />
        </div>
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
.profile-container {
  display: block;
  box-sizing: border-box;
  text-align: left;
}
.profile {
  line-height: 42px;
  margin-bottom: 1rem;
  font-weight: 700;
  margin-left: 0;
  display: flex;
  align-items: center;
}

.profile img {
  border-radius: 50%;
  margin-left: 0;
  margin-right: 1rem;
}

.profile span {
  font-size: 1.2rem;
}
.toolbox-list,
.toolbox-icons {
  display: flex;
  flex-direction: row;
  margin: 1.5rem auto 0;
  flex-wrap: wrap;
  padding: 1.2rem 0.2rem 0;
  border-top: 3px solid rgba(125, 129, 148, 0.2);
}

.toolbox-list span {
  background-color: var(--shipandco);
  border: 1px solid var(--stockandco);
  border-radius: var(--base-border);
  margin: 2px;
  padding: 2px 4px;
}

.toolbox-icons > div {
  height: 42px;
  width: 42px;
}

.toolbox-icons #js {
  background-image: url('/js_logo.svg');
}
.toolbox-icons #node-js {
  background-image: url('/node_logo.svg');
}

.toolbox-icons #python {
  background-image: url('/python_logo.svg');
}

.toolbox-icons #go {
  background-image: url('/go_logo.svg');
}
</style>