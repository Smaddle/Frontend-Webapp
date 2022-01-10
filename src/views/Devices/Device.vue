<template>
  <div class="device-overview">
    <h2>Device: {{$route.params.id}}</h2>
    <div>
      <p>Hier moet nog meer informatie van de smaddle komen</p>
      <p>{{currentTracker}}</p>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";


export default {
  name: "Device",
  computed:{
    ...mapState({
      deviceList: state => state.devicesList
    }),
    currentTracker(){
      if (this.devices === undefined) return;
      console.log(this.deviceList)
      return this.devices.filter((item)=> item.id === this.$route.params.id)[0]
    },
  },
  beforeMount() {
    this.$store.dispatch('getDevices').then(data =>{
      console.log(data)
    })
  }
}
</script>

<style scoped>

</style>