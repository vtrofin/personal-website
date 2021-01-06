<template>
  <MainLayout />
</template>

<script>
import MainLayout from './layouts/MainLayout';
export default {
  name: 'App',
  components: { MainLayout },
};
</script>

<style>
:root {
  --white: #fff;
  --background-white: #fefaf6;
  --gray: #574b33;
  --black: #232320;
  --scarlet: #fc2f00;
  --magenta: #b6a0ea;
  --light-magenta: #f1ebff;
  --purple: #150042;
  --shipandco: #e76f51;
  --stockandco: #f4a261;
  --staff: #e9c46a;
  --utils: #2a9d8f;
  --shopify: #264653;
}

html,
body {
  height: 100%;
  margin: 0;
  box-sizing: border-box;
}

body {
  text-align: center;
  font-size: 16px;
  font-family: 'Helvetica Neue', 'Source Sans Pro', Arial, sans-serif;
  background-color: var(--background-white);
  -webkit-font-smoothing: antialiased;
}

#app {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  margin: 0;
}

/* the color hack */
/* * {
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
} */
</style>
