<template>
<div class="devices">
  <b-container fluid>
    <h1 class="mb-4">Apparaten</h1>
    <b-row cols="1" cols-md="2" cols-lg="4">
      <b-col v-for="(device,index) in devices" :key="index"><DeviceButton :device="device"/></b-col>
    </b-row>
  </b-container>
</div>
</template>

<script>
import DeviceButton from "@/components/Buttons/DeviceButton";
import {mapState} from "vuex";
export default {
  name: "Devices",
  components: {DeviceButton},
  computed:{
    ...mapState({
      devices: state => state.markerData
    })
  }
}
</script>

<style scoped lang="scss">
  .devices{
    padding-top: 74px;
    .col{
      margin-bottom: 30px;
    }
  }
</style>