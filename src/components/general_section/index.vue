<template>
  <section :class="[className, 'general-section']">
    <h2 class="section-header">{{ title }}</h2>
    <SectionAppLink
      v-for="(options, idx) in data"
      :key="idx"
      :to="options.path"
      :aria-label="options.ariaLabel"
      :active-class="
        'active' + ' ' + options.project ? `${options.projects}-active` : 'shipandco-active'
      "
      :exact-active-class="
        'exact-active' + ' ' + options.project ? `${options.project}-active` : 'shipandco-active'
      "
    >
      <template #section-link-slot>
        <Project v-if="options.type === 'project'" :options="options" />
        <Project v-else-if="options.type === 'work'" :options="options" />
        <!-- add other sections here -->
      </template>
    </SectionAppLink>
  </section>
</template>

<script>
import { toRefs, toRef } from 'vue';
import SectionAppLink from '../SectionAppLink';
import Project from './Project';
// import Work from './Work';Work
import { generalSectionArrayValidator } from '../helpers/validators';

export default {
  name: 'GeneralSection',
  components: { SectionAppLink, Project },
  props: {
    className: { type: String, required: false, default: '' },
    title: { type: String, required: true },
    // eslint-disable-next-line
    data: { validator: generalSectionArrayValidator },
    type: { type: String, required: false, default: 'project' },
  },
};
</script>

<style>
.general-section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  margin: 120px auto;
  box-sizing: border-box;
  padding-top: 2.5rem;
}

.section-header {
  font-size: 10vmin;
  font-weight: 800;
  letter-spacing: -0.1rem;
  text-align: left;
  line-height: 0.6em;
  z-index: 10;
  pointer-events: none;
  flex-grow: 1;
  flex-basis: 100%;
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
  background-color: var(--black);
  color: var(--white);
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

span > .item-button-label {
  display: block;
  opacity: 0;
  transform: translateY(-15px);
  transition: transform 0.35s cubic-bezier(0.19, 1, 0.22, 1) 0.1s,
    opacity 0.35s cubic-bezier(0.19, 1, 0.22, 1) 0.1s;
}

.section-link:hover span > .item-button-label {
  transform: translateY(0);
  opacity: 1;
}

h3.item-title {
  font-size: 9vmin;
  font-weight: 800;
  max-width: 80%;
  margin: 3rem auto 1rem;
  position: relative;
  z-index: 10;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  /* line-height: 2.5rem;
  letter-spacing: -0.3px; */
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
  /* right: 0; */
  margin: 3.2rem auto 2.2rem;
  transform: scaleX(0.8);
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.section-link:hover .item-divider {
  transform: scaleX(1) translateY(6px);
}

p.item-text {
  margin: 0 auto 3rem;
  width: 80%;
  z-index: 10;
  max-width: 500px;
  position: relative;
  transform: translateZ(0);
  transition: transform 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
  font-size: 1.2rem;
}
.section-link:hover p.item-text {
  transform: translateY(8px) translateZ(0);
}

.item-background {
  position: absolute;
  background-repeat: no-repeat;
  background-position: center bottom;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
.item-logo.bentoandco-logo {
  width: 128px;
}

.section-link:hover .item-logo {
  transform: translateY(6px) translateZ(0);
}
</style>
