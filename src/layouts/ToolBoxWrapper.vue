<template>
  <div
    :class="'toolbox-container' + (toolboxActive ? ' ' + 'toolbox-open' : '')"
    @click.self="handleBlur"
  />
  <nav
    :class="'toolbox-menu' + (toolboxActive ? ' ' + 'toolbox-open' : '')"
    :aria-hidden="!toolboxActive"
  >
    <section class="profile-container">
      <div class="profile" tabindex="0">
        <img
          src="/victor_profile_yellow.jpg"
          alt="victor trofin's profile image"
          loading="lazy"
          width="80"
          height="80"
        />
        <div class="about-text">
          <span class="caption-text">Victor Trofin</span>
          <span class="caption-text-small">My toolbox: </span>
        </div>
      </div>
      <div class="toolbox-list" tabindex="0">
        <span v-for="(tool, i) in tools" :key="i">{{ tool }}</span>
      </div>
      <div class="toolbox-icons" tabindex="0">
        <div aria-label="javascript">
          <fa :icon="['fab', 'js']" class="fa-2x" />
        </div>
        <div id="ts" aria-label="typescript" />
        <div id="rescript" aria-label="rescript" />
        <div aria-label="swift">
          <fa :icon="['fab', 'swift']" class="fa-2x" />
        </div>
        <div aria-label="rust">
          <fa :icon="['fab', 'rust']" class="fa-2x" />
        </div>
        <!-- <div id="go" aria-label="go lang" /> -->
      </div>
    </section>
    <button
      id="close-button"
      @click.prevent="handleBlur"
      aria-label="Go back to the main page"
    >
      Close
    </button>
  </nav>

  <div :class="'container' + (toolboxActive ? ' ' + 'toolbox-open' : '')">
    <slot />
  </div>
</template>
<script lang="ts">
import { toRefs, defineComponent } from "vue";
import { useStore } from '@store/index'

export default defineComponent({
  name: "ToolBoxWrapper",
  props: {
    toolboxState: { type: Object, required: true },
  },
  emits: {
    toggleToolboxState: ({ isActive }: { isActive: boolean }) => {
      return typeof isActive === "boolean";
    },
  },
  setup(props, context) {
    const { active: toolboxActive } = toRefs(props.toolboxState);
    const { emit } = context;
    const store = useStore();
    const tools = store.getters["tools/getAllTools"] as string[];

    const handleBlur = () => {
      if (toolboxActive.value) {
        store.dispatch({ type: "setToolBoxState", isToolboxActive: false });
        emit("toggleToolboxState", { isActive: false });
      }
    };

    return { toolboxActive, handleBlur, tools };
  },
});
</script>
<style>
#app>.container {
  --base-translate-unit: 50px;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
  transform: translate3d(0, 0, 0);
  transition: transform 0.3s;
  background-color: var(--background-white);
}

/* Fix for unequal margin-left margin-right in ios */
@media all and (max-width: 500px) {
  #app>.container {
    justify-content: center;
  }
}

#app>.toolbox-open:nth-child(3) {
  transform: translate3d(var(--base-translate-unit),
      var(--base-translate-unit),
      0);
  transition: transform 0.3s;
}

@media all and (min-width: 600px) {
  #app>.toolbox-open:nth-child(2) {
    transform: translate3d(calc(1.5 * var(--base-translate-unit)),
        calc(1.5 * var(--base-translate-unit)),
        0);
  }
}

.toolbox-container {
  display: none;
  position: fixed;
  overflow: hidden;
  z-index: 100;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  /* transparent */
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.toolbox-container.toolbox-open {
  display: block;
}

.toolbox-menu {
  position: fixed;
  box-sizing: border-box;
  z-index: 101;
  width: 320px;
  padding: 2rem;
  background-color: var(--misty-rose);
  color: var(--black);
  transform: translate3d(-320px, -320px, 0);
  transition: transform 0.3s;
}

.toolbox-menu.toolbox-open {
  transform: translate3d(0, 0, 0);
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
  content: "";
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
  border-radius: 42%;
  margin-left: 0;
  margin-right: 1rem;
}

.about-text {
  display: flex;
  flex-direction: column;
}

.caption-text {
  font-size: 1.2rem;
}

.caption-text-small {
  font-weight: 400;
  line-height: 1.1rem;
}

.caption-text-small:not(:last-of-type) {
  padding-bottom: 0.4rem;
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
  background-color: var(--yellow);
  border: 1px solid var(--yellow);
  border-radius: var(--base-border);
  margin: 2px;
  padding: 2px 4px;
}

.toolbox-icons {
  align-content: center;
  justify-content: space-evenly;
}

.toolbox-icons>div {
  width: 28px;
  background-repeat: no-repeat;
  background-position: center;
  flex-grow: 1;
}

.toolbox-icons>svg {
  margin: 5px;
  flex-grow: 1;
}

.toolbox-icons #go {
  background-image: url("/public/go_logo.svg");
}

.toolbox-icons #rescript {
  background-image: url("/public/rescript_logo.svg");
  background-position-x: 0%;
}

.toolbox-icons #ts {
  background-image: url("/public/ts_logo.svg");
  background-position-x: 54%;
}
</style>
