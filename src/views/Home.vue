<template>
    <b-row no-gutters>
        <Map @smaddleSelected="setSelectedSmaddle"/>
      <NavColumn/>
      <SmaddleColumn :smaddle="selectedSmaddle" :show="showSmaddleColumn"/>
    </b-row>
</template>

<script>
import NavColumn from "../components/NavColumn";
import Map from "../components/Map";
import SmaddleColumn from "../components/SmaddleColumn";
export default {
  name: 'Home',
  components: {
    NavColumn,
    Map,
    SmaddleColumn
  },
  data() {
    return {
      selectedSmaddle: {},
      showSmaddleColumn: false
    }
    },
  methods: {
    setSelectedSmaddle(e) {
      this.selectedSmaddle = e
      this.showSmaddleColumn = true
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
  div{
    .center {
      background: var(--background-primary);
    }
  }
</style>
