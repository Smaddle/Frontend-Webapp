<template>
  <div id="home">
    <Map/>
    <Sidebar/>
    <div id="legend" class="shadow-sm">
      <h6>Legenda</h6>
      <ul class="list-unstyled">
        <li><b-icon class="color" icon="circle-fill"/><span>Normaal</span></li>
        <li><b-icon class="color stolen" icon="circle-fill"/><span>Gestolen</span></li>
        <li><b-icon class="color offline" icon="circle-fill"/><span>Offline</span></li>
      </ul>
    </div>
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
  mounted() {
    this.$store.dispatch('getUser').then((data)=>{
      console.log('user',data)
      this.$store.dispatch('getDevices').then((devicesMap)=>{
        console.log('devices', devicesMap)
      })
    }).catch(()=>{
      this.$router.push('/auth')
    })
    // this.$store.dispatch('getUser').then(data=>{
    //   console.log('user',data)
    //   this.$store.dispatch('getDevices').then(deviceMap =>{
    //     console.log(deviceMap)
    //   })
    // })
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
      color: var(--primary);
      &.stolen{color: var(--danger)}
      &.offline{color: var(--orange)}
    }
  }

}
</style>
