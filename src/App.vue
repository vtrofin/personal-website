<template>
  <MainLayout></MainLayout>
</template>

<script>
import MainLayout from './layouts/MainLayout';
export default {
  name: 'App',
  components: { MainLayout }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
}

#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
}

footer {
  grid-row-start: -1;
  background: #42a5f5;
  color: white;
  padding: 20px;
}
* {
  background-color: rgba(255, 0, 0, 0.2);
}
* * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * {
  background-color: rgba(0, 0, 255, 0.2);
}
* * * * {
  background-color: rgba(255, 0, 255, 0.2);
}
* * * * * {
  background-color: rgba(0, 255, 255, 0.2);
}
* * * * * * {
  background-color: rgba(255, 255, 0, 0.2);
}
* * * * * * * {
  background-color: rgba(255, 0, 0, 0.2);
}
* * * * * * * * {
  background-color: rgba(0, 255, 0, 0.2);
}
* * * * * * * * * {
  background-color: rgba(0, 0, 255, 0.2);
}
</style>
