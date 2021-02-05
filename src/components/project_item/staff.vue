<template>
  <div class="project-content">
    <h3>This is the project item content h3</h3>
    <p>
      This is the project item content p A/B-testing is a guiding compass for making product
      decisions. More technically, it’s a method for quantifying the impact of product variations.
      The process can’t tell us if one variation is unequivocally “better” than another, but it can
      tell us which of a set of variations is better at producing a certain effect, encouraging a
      behavior, or achieving a goal.
    </p>
  </div>
  <ProjectImage
    alt-text="view of top users in Ship&co and last shipments made"
    url="/staff_dashboard.png"
    caption="The app is a dashboard for the marketing team"
  />
  <ProjectImage
    alt-text="view of all labels made with Ship&co in the last two weeks"
    url="/staff_shipments.png"
    caption="The app enables the marketing team to perform actions on labels created within Ship&co"
  />
  <div class="project-content">
    <ProjectSummary />
  </div>
</template>

<script>
import ProjectSummary from './project_summary';
import ProjectImage from './project_image';
export default {
  name: 'StaffContent',
  components: { ProjectSummary, ProjectImage }
};
</script>
