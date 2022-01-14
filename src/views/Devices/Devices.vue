<template>
<div class="devices">
  <b-container fluid>
    <div class="mb-5 mt-2 d-flex justify-content-between align-items-center">
      <h2 class="mb-0">Apparaten</h2>
      <b-button variant="none" class="text-primary font-weight-bold add" v-b-modal.modal-add-smaddle><b-icon icon="plus-circle"/></b-button>
    </div>

    <b-row v-if="devices !== null"  cols="1" cols-md="2" cols-lg="3" cols-xl="4">
      <b-col v-for="(device) in devices" :key="device.id">
        <DeviceButton :device="device"/>
      </b-col>
    </b-row>
  </b-container>
  <router-view/>

  <b-modal id="modal-add-smaddle" title="Smaddle Toevoegen" @ok="linkDevice">
    <b-form id="linkDevice-form" @submit="linkDevice">
    <p class="my-4">Hier kan je een smaddle toevoegen aan jouw account.</p>
      <b-form-group label="ID">
        <b-form-input required placeholder="xxx-xxx-xxx-xxx" v-model="linkDeviceId"/>
      </b-form-group>
    </b-form>

  </b-modal>
</div>
</template>

<script>
import DeviceButton from "@/components/Buttons/DeviceButton";
import {mapState} from "vuex";
export default {
  name: "Devices",
  components: {DeviceButton},
  data(){
    return{
      linkDeviceId: ''
    }
  },
  //07edb281-3ac8-40d9-8d47-78f7b7522b60
  computed:{
    ...mapState({
      devices: state => state.device.devicesList
    })
  },
  beforeMount() {
    this.$store.dispatch('getDevices').then((devices)=>{
      console.log('devices', devices)
    })
  },
  methods:{
    linkDevice(e){
      e.preventDefault();
      this.$store.dispatch('linkDevice', this.linkDeviceId)
    }
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
  .btn.add{
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: larger;
  }
</style>