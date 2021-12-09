<template>
  <div id="app">
    <NavBar/>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--text-primary);
  height: 100%;
}
</style>
<script>
import NavBar from "./components/NavBar";
export default {
  components: {NavBar}
}
</script>