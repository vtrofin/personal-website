<template>
  <section>
    <h1>This is the project item component</h1>
    <div>{{ $route.params.project_item }}</div>
  </section>
</template>

<script>
  export default {
    name: 'ProjectItem'
  }
</script>