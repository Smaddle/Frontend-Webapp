<template>
  <div id="home">
    <Map/>
    <Sidebar/>
  </div>
</template>

<script>
import Map from "../components/Map";
import Sidebar  from "../components/Sidebar"
import {mapState} from "vuex";
export default {
  name: 'Home',
  components: {
    Map,
    Sidebar
  },
  computed:{
    ...mapState({
      user: state => state.user.user
    })
  },
  async mounted() {
    await this.$store.dispatch('getUser')
  }
}
</script>

<style scoped lang="scss">
#home{
  height: 100%;
  overflow: hidden;
  position: relative;
  #legend{
    text-align: center;
    position: absolute;
    right: 12px;
    bottom: 36px;
    z-index: 998;
    background: var(--background-secondary);
    padding: 12px;
    border-radius: 8px;
    li{
      font-size: small;
      text-align: left;
      span{
        //display: block;
        margin-left: 8px;
        font-size: small;
      }
    }

    .color{
      color: #007BFFFF;
      &.stolen{color: var(--danger)}
      &.offline{color: var(--orange)}
    }
  }

}
</style>
