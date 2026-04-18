<template>
  <template v-if="projectData">
    <div class="project-content">
      <p>{{ projectData.openingProblem }}</p>
      <template v-for="(block, i) in projectData.narrative" :key="i">
        <p v-if="block.type === 'text'">{{ block.content }}</p>
        <ProjectImage
          v-else-if="block.type === 'image'"
          :url="block.src"
          :alt-text="block.alt"
        />
      </template>
    </div>
    <div v-if="summaryOptions" class="project-content">
      <ProjectSummary
        :modifier="slug ?? ''"
        :options="summaryOptions"
      />
    </div>
  </template>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import { projectDataBySlug } from "@/data/projects";
import type { ProjectSummaryOptions } from "@/data/types";
import type { ProjectName } from "src/globals";
import ProjectSummary from "@components/project_item/project_summary.vue";
import ProjectImage from "@components/project_item/project_image.vue";

export default defineComponent({
  name: "ProjectItemContent",
  components: { ProjectSummary, ProjectImage },
  setup() {
    const route = useRoute();

    const slug = computed(() => {
      const param = route?.params?.project_item;
      return typeof param === "string" ? (param as ProjectName) : undefined;
    });

    const projectData = computed(() =>
      slug.value ? projectDataBySlug[slug.value] : undefined
    );

    const summaryOptions = computed((): ProjectSummaryOptions | undefined => {
      const data = projectData.value;
      if (!data) return undefined;

      return {
        ...data.summary,
        stack: data.stackItems,
      };
    });

    return { slug, projectData, summaryOptions };
  },
});
</script>
<style>
.project-content {
  text-align: initial;
  max-width: 800px;
  margin: 0 auto;
}

.project-content:first-of-type {
  padding-top: 10vh;
}

.project-content:last-of-type {
  padding-bottom: 20vh;
}

@media all and (min-width: 600px) {
  .project-content {
    padding-top: 3rem;
  }

  .project-content:first-of-type {
    padding-top: 5rem;
  }

  .project-content:last-of-type {
    padding-bottom: 10rem;
  }
}

.project-content h2 {
  margin: 2.5rem auto 0.5rem;
  font-size: 2rem;
  font-weight: 600;
  scroll-margin-top: 2em;
}

.project-content h3 {
  margin: 2rem auto 0.5rem;
  font-size: 1.7rem;
  font-weight: 500;
  scroll-margin-top: 1.5em;
}

.project-content p {
  margin: 1.5rem auto 1rem;
  font-size: 1.2rem;
  scroll-margin-top: 1em;
  line-height: 1.5rem;
}

.project-content ul.content-list li {
  margin: 1.5rem auto 1rem;
  font-size: 1.2rem;
  line-height: 1.5rem;
}

.project-content span.italic-text {
  font-style: italic;
}

.project-content span.caption-text {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 0.9rem;
  line-height: 150%;
  margin: 0 auto 2rem;
}

.content-image {
  width: 100%;
}
</style>
