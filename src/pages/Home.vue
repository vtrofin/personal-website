<template>
  <main>
    <h1>This is the homepage</h1>
  </main>
  <Projects></Projects>
  <Work></Work>
</template>

<script>
  import Work from '../components/work'
  import Projects from '../components/projects'

  export default {
    name: 'HomePage',
    components: { Work, Projects }
  }
</script>