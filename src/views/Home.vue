<template>
  <div id="home">
    <Map @smaddleSelected="setSelectedSmaddle"/>
    <Sidebar :smaddle="selectedSmaddle" @smaddleSelected="setSelectedSmaddle"/>
  </div>
</template>

<script>
import Map from "../components/Map";
import Sidebar  from "../components/Sidebar"
export default {
  name: 'Home',
  components: {
    Map,
    Sidebar
  },
  data() {
    return {
      selectedSmaddle: null,
    }
    },
  methods: {
    setSelectedSmaddle(e) {
      this.selectedSmaddle = e
    }
  }
}
</script>

<style scoped lang="scss">
#home{
  height: 100%;
  overflow: hidden;
  position: relative;
}
</style>
