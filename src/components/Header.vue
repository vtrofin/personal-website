<template>
  <nav :class="classModifiers.navClass">
    <div class="nav-container">
      <ul class="nav-left">
        <li class="mobile-home-button">
          <router-link
            to="/"
            :class="classModifiers.linkClass"
            aria-label="Go to the Homepage"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'home']" aria-hidden="true" />
            </span>
          </router-link>
        </li>
        <li>
          <button
            class="toolbox-btn"
            :class="classModifiers.linkClass"
            @click="toggleToolbox"
            :aria-expanded="String(isToolboxActive)"
            aria-label="Tools"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'user']" aria-hidden="true" />
              <span class="nav-label">Tools</span>
            </span>
          </button>
        </li>
        <li>
          <a
            :class="classModifiers.linkClass"
            href="https://vtrofin.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open CV in a new tab"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'file-alt']" aria-hidden="true" />
              <span class="nav-label">CV</span>
            </span>
          </a>
        </li>
      </ul>

      <div class="nav-center">
        <HeaderLogo :modifier-class="classModifiers.linkClass" />
      </div>

      <ul class="nav-right">
        <li>
          <a
            :class="classModifiers.linkClass"
            href="https://dev.to/vtrofin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Read my blog on dev.to (opens in a new tab)"
          >
            <span :class="classModifiers.spanClass">
              <fa :icon="['fas', 'pen-nib']" aria-hidden="true" />
              <span class="nav-label">Blog</span>
            </span>
          </a>
        </li>
        <li>
          <GithubLogo :modifier-class="classModifiers.linkClass" :span-class="classModifiers.spanClass">
            <span class="nav-label">GitHub</span>
          </GithubLogo>
        </li>
      </ul>
    </div>
    <ProjectItemHeader v-if="modifier" :modifier="modifier" />
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from "vue";
import { useAppStore } from '@store/useAppStore';
import HeaderLogo from "@components/HeaderLogo.vue";
import GithubLogo from "@components/GithubLogo.vue";
import ProjectItemHeader from "@components/project_item/project_header.vue";
import { type ProjectName } from "src/globals";

export default defineComponent({
  name: "HeaderComponent",
  components: { HeaderLogo, GithubLogo, ProjectItemHeader },
  props: { modifier: { type: String as PropType<ProjectName>, required: false, default: "" } },
  setup(props) {
    const appStore = useAppStore();
    const isToolboxActive = computed(() => appStore.isToolboxActive);

    const classModifiers = computed(() => {
      const linkClass = props.modifier ? props.modifier : "";
      const spanClass = props.modifier
        ? props.modifier + " " + "nav-link-text"
        : "nav-link-text";
      const navClass = props.modifier ? props.modifier + "-project-active" : "";

      return { linkClass, spanClass, navClass };
    });

    const toggleToolbox = () => {
      appStore.setToolBoxState(!appStore.isToolboxActive);
    };

    return { classModifiers, toggleToolbox, isToolboxActive };
  },
});
</script>

<style>
/* ── Layout ── */
.nav-container {
  --logo-size: 75px;
  position: relative;
  width: 90%;
  max-width: 1280px;
  margin: 0 auto;
  display: flex;
  align-items: center;
}

.nav-left,
.nav-right {
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
}

.nav-right {
  justify-content: flex-end;
}

.nav-center {
  flex-shrink: 0;
  display: none;
}

@media (min-width: 600px) {
  .nav-center {
    display: block;
  }
}

.nav-left li,
.nav-right li {
  max-width: 100%;
  min-width: 0;
}

/* ── Mobile home button (icon only, hidden on desktop) ── */
@media all and (min-width: 600px) {
  .mobile-home-button {
    display: none;
  }
}

/* ── Desktop text labels ── */
.nav-label {
  display: none;
}

@media (min-width: 600px) {
  .nav-label {
    display: inline;
  }

  .nav-link-text {
    display: inline-flex;
    align-items: center;
    gap: 0.4em;
  }
}

/* ── Links ── */
.nav-left li a,
.nav-right li a {
  padding: 1.5rem;
  display: block;
  position: relative;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  font-size: 1.1rem;
}

.toolbox-btn {
  background: none;
  border: none;
  padding: 1.5rem;
  display: block;
  cursor: pointer;
  color: inherit;
  font-size: 1.1rem;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
}

/* ── Hover underline animation ── */
.nav-link-text {
  position: relative;
  z-index: 10;
  font-weight: 500;
}

.nav-link-text:before {
  z-index: 5;
  content: "";
  width: 100%;
  position: absolute;
  bottom: -10px;
  height: 3px;
  left: 0;
  display: block;
  background: var(--color-accent);
  transform: translate3d(0, 5px, 0);
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0;
}

nav[class*="-project-active"] .nav-link-text:before {
  background: currentColor;
}

.nav-left li:hover .nav-link-text:before,
.nav-right li:hover .nav-link-text:before {
  opacity: 1;
  transform: translateZ(0) scale3d(1.1, 1.1, 1.1) rotate(2deg);
}

/* ── Focus rings ── */
.nav-left a:focus-visible,
.nav-right a:focus-visible,
.toolbox-btn:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 2px;
}
</style>
