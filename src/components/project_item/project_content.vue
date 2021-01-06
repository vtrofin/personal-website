<template>
  <div class="content">
    <h1>This is the project item content</h1>
    <router-link
      :to="
        $route.params.project_item === 'stockandco' ? '/projects/shipandco' : '/projects/stockandco'
      "
    >
      <span class="nav-link-text">Work</span>
    </router-link>
    <section>{{ $route.params.project_item }}</section>
  </div>
</template>
<script>
export default {
  name: 'ProjectItemContent',
  setup(props) {
    return {};
  }
};
</script>
<style></style>
