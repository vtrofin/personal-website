<template>
  <section :class="[className, 'general-section']">
    <h2 class="section-header" tabindex="0">{{ title }}</h2>
    <SectionAppLink
      v-for="(options, idx) in data"
      :key="idx"
      :to="options.path"
      :aria-label="options.ariaLabel"
      :active-class="'active' + ' ' + (options.project ? `${options.project}-active` : 'shipandco-active')"
      :exact-active-class="'exact-active' + ' ' + (options.project ? `${options.project}-active` : 'shipandco-active')"
      :total-items="data.length"
    >
      <template #section-link-slot>
        <ProjectComponent
          v-if="options.type === 'project'"
          :options="options"
          :idx="idx"
        />
        <ProjectComponent
          v-else-if="options.type === 'work'"
          :options="options"
          :idx="idx"
        />
      </template>
    </SectionAppLink>
    <div v-if="data.length % 2 !== 0" class="section-link-filler" />
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import SectionAppLink from "@components/SectionAppLink.vue";
import ProjectComponent from "@components/general_section/Project.vue";
import { generalSectionArrayValidator } from "@components/helpers/validators";
import { getProjectData, getWorkData } from "@components/helpers/index";

export default defineComponent({
  name: "GeneralSection",
  components: { SectionAppLink, ProjectComponent },
  props: {
    className: { type: String, required: false, default: "" },
    title: { type: String, required: true },

    data: {
      validator: generalSectionArrayValidator,
      required: true, type: Array as () => ReturnType<typeof getProjectData | typeof getWorkData>
    },
    type: { type: String, required: false, default: "project" },
  },
});
</script>

<style>
.general-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  overflow: hidden;
  margin: 120px auto;
  box-sizing: border-box;
  padding-top: 2.5rem;
  border-radius: var(--radius-base);
}

/* display a filler on desktop when odd number of projects are present */
.section-link-filler {
  display: none;
  background-color: var(--color-surface);
}

@media all and (min-width: 1000px) {
  .section-link-filler {
    display: block;
  }
}

/* Mobile: single column border radius */
.general-section .section-link:first-of-type {
  border-top-left-radius: var(--radius-base);
  border-top-right-radius: var(--radius-base);
}

.general-section .section-link:last-of-type {
  border-bottom-left-radius: var(--radius-base);
  border-bottom-right-radius: var(--radius-base);
}

/* Border radius on outer corners on desktop */
@media all and (min-width: 1000px) {

  .general-section .section-link:nth-of-type(4n+1) {
    border-top-right-radius: 0;
    /* fixes the 5th element in the array */
    border-bottom-right-radius: 0;
  }

  .general-section .section-link:nth-of-type(4n+3) {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .general-section .section-link:nth-of-type(2) {
    border-top-right-radius: var(--radius-base);
  }

  .general-section .section-link:nth-last-of-type(2) {
    border-bottom-left-radius: var(--radius-base);
  }

  .general-section .section-link:last-of-type {
    border-bottom-left-radius: 0;
  }
}


@media all and (min-width: 1000px) {
  .general-section .section-header {
    grid-column: 1 / -1;
  }

  /* Customization for Projects: alternating 3fr 2fr / 2fr 3fr rows */
  .general-section.projects {
    grid-template-columns: repeat(5, 1fr);
  }

  /* Alternating rows: 3fr|2fr then 2fr|3fr */
  .general-section.projects .section-link:nth-of-type(4n+1) {
    grid-column: 1 / 4;
  }

  .general-section.projects .section-link:nth-of-type(4n+2) {
    grid-column: 4 / 6;
  }

  .general-section.projects .section-link:nth-of-type(4n+3) {
    grid-column: 1 / 3;
  }

  .general-section.projects .section-link:nth-of-type(4n+4) {
    grid-column: 3 / 6;
  }

  /* Filler pairs with last odd card */
  .general-section.projects .section-link:nth-of-type(4n+1):last-of-type~.section-link-filler {
    grid-column: 4 / 6;
  }

  .general-section.projects .section-link:nth-of-type(4n+3):last-of-type~.section-link-filler {
    grid-column: 3 / 6;
  }

  /* Work: equal two columns */
  .general-section.work {
    grid-template-columns: 1fr 1fr;
  }

  .general-section.work .section-link-filler {
    grid-column: 2;
  }
}

.section-header {
  font-size: 10vmin;
  font-weight: 800;
  letter-spacing: -0.1rem;
  text-align: left;
  line-height: 0.6em;
  z-index: 10;
  pointer-events: none;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  border: 0;
}

@media all and (min-width: 600px) {
  .section-header {
    font-size: 4rem;
  }
}

span.item-button {
  position: absolute;
  top: 0;
  right: 20px;
  padding: 1rem 1.1rem;
  background-color: var(--color-surface-dark);
  color: var(--color-text-light);
  font-size: 0.8rem;
  transform-origin: 0 0;
  will-change: transform, opacity;
  transform: scaleY(0) translateZ(0);
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.section-link:hover span.item-button {
  transform: scaleY(1) translateZ(0);
  transition: transform 0.35s cubic-bezier(0.19, 1, 0.22, 1);
}

@media (hover: none) {

  /* https://www.w3schools.com/cssref/sel_link.asp || https://developer.mozilla.org/en-US/docs/Web/CSS/@media/hover  */
  .section-link:link span.item-button {
    opacity: 0;
  }
}

span>.item-button-label {
  display: block;
  opacity: 0;
  transform: translateY(-15px);
  transition: transform 0.35s cubic-bezier(0.19, 1, 0.22, 1) 0.1s,
    opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1) 0.1s;
}

.section-link:hover span>.item-button-label {
  transform: translateY(0);
  opacity: 1;
}

h3.item-title {
  font-size: 9vmin;
  font-weight: 800;
  max-width: 80%;
  margin: 1.5rem auto 0.5rem;
  position: relative;
  z-index: 10;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.section-link:hover h3.item-title {
  transform: translateY(-6px) translateZ(0);
}


@media all and (min-width: 600px) {
  h3.item-title {
    font-size: 3rem;
  }
}

.item-divider {
  display: block;
  position: relative;
  height: 3px;
  background-color: currentColor;
  width: 60px;
  margin: 1rem auto;
  transform: scaleX(0.8);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.section-link:hover .item-divider {
  transform: scaleX(1) translateY(6px);
}

p.item-subtitle {
  margin: -0.25rem auto 0.5rem;
  width: 80%;
  max-width: 500px;
  font-size: 0.9rem;
  font-weight: 500;
  color: currentColor;
  opacity: 0.8;
  z-index: 10;
  position: relative;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.section-link:hover p.item-subtitle {
  transform: translateY(-4px) translateZ(0);
}

p.item-outcome {
  margin: 0 auto 1.5rem;
  width: 80%;
  z-index: 10;
  max-width: 500px;
  position: relative;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  font-size: 1.2rem;
  font-weight: 500;
  color: var(--color-text-light);
}

.section-link:hover p.item-outcome {
  transform: translateY(8px) translateZ(0);
}

.item-background {
  position: absolute;
  background-repeat: no-repeat;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

a:hover .item-background {
  transform: scale3D(1.04, 1.04, 1);
}

.item-logo {
  margin: 0.8rem auto 2rem;
  position: relative;
  z-index: 10;
  background-repeat: no-repeat;
  background-position: center;
  width: 64px;
  height: 64px;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}


.section-link:hover .item-logo {
  transform: translateY(6px) translateZ(0);
}
</style>
