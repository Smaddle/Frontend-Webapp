<template>
<div class="devices">
  <b-container fluid>
    <div class="mb-5 mt-2 d-flex justify-content-between align-items-center">
      <h2 class="mb-0">Apparaten</h2>
      <b-button variant="none" class="text-primary font-weight-bold add" v-b-modal.modal-add-smaddle><b-icon icon="plus-circle"/></b-button>
    </div>

    <b-row cols="1" cols-md="2" cols-lg="3" cols-xl="4">
      <b-col v-for="(device,index) in devices" :key="index"><DeviceButton :device="device"/></b-col>
    </b-row>
  </b-container>
  <router-view/>

  <b-modal id="modal-add-smaddle" title="Smaddle Toevoegen">
    <b-form id="linkDevice-form">
    <p class="my-4">Hier kan je een smaddle toeveogen aan jouw account.</p>
      <b-form-group label="Token">
        <b-form-input required placeholder="xxx-xxx-xxx-xxx"/>
      </b-form-group>
      <b-form-group label="Naam">
        <b-form-input required/>
      </b-form-group>
    </b-form>
    <template #modal-footer>
      <b-button variant="primary">Toevoegen</b-button>
    </template>
  </b-modal>
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
  },
  methods:{
    linkDevice(e){
      e.preventDefault();
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