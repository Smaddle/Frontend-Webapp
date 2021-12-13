<template>
<b-button variant="device">
  <header>
    <div class="status" :class="isOnline ? 'online' : 'offline'" v-b-tooltip.hover.html="`Tracker is <strong>${isOnline ? 'online' : 'offline'}</strong>`"/>
    <h3 class="mb-0 ml-3">{{device.properties.name}}</h3>
  </header>
</b-button>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "DeviceButton",
  props:['device'],
  computed:{
    ...mapState({
      selectedSmaddle: state => state.selectedSmaddle,
      daysWhenOffline: state => state.daysWhenOffline
    }),
    isOnline(){
      return Math.floor(Date.now() / 1000) - this.device.properties.last_updated < 86400 * this.daysWhenOffline
    }
  }
}
</script>

<style scoped lang="scss">
.btn-device{
  color: var(--text-primary);
  display: block;
  width: 100%;
  padding: 24px;
  background: var(--background-primary);
  header{
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 24px;
    .status{
      display: inline-flex;
      height: 15px;
      width: 15px;
      background-color: gray;
      border-radius: 50%;
      &.online{background-color: var(--success)}
      &.offline{background-color: var(--danger)}
    }
  }
  &:hover{
    header{
      color: var(--primary);
    }
  }
}
</style>