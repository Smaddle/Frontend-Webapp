<template>
  <div id="sidebar" class="shadow-sm" :class="{hidden: hidden}">
    <div v-if="currentSmaddle">
      <header>
        <div class="status" :class="isOnline ? 'online' : 'offline'" v-b-tooltip.hover.html="`Tracker is <strong>${isOnline ? 'online' : 'offline'}</strong>`"/>
        <h3 class="mb-0 ml-3">
          {{currentSmaddle.properties.name}}
        </h3>
      </header>
      <section>
        <span>Batterij</span>
        <b-progress class="mt-2">
          <b-progress-bar :value="currentSmaddle.properties.bat.sad">{{currentSmaddle.properties.bat.sad}}%</b-progress-bar>
        </b-progress>
      </section>
      <section class="mt-4 text-center">
        <b-row>
          <b-col>
            <h2><b-icon icon="thermometer-half"/></h2>
            <span>{{currentSmaddle.properties.imu.temp}} °C</span>
          </b-col>
          <b-col>
            <h2><b-icon icon="bicycle"/></h2>
            <span>{{currentSmaddle.properties.spd}} km/u</span>
          </b-col>
          <b-col>
            <h2><b-icon icon="arrow-bar-up"/></h2>
            <span>{{currentSmaddle.geometry.coordinates[2]}} m</span>
          </b-col>
        </b-row>
      </section>
      <section class="mt-4 d-flex justify-content-between">
        <b-button variant="none" class="text-primary">Meer informatie</b-button>
        <b-button class="sidebar-close" variant="icon" @click="hideSideBar"><b-icon icon="x"/></b-button>
      </section>
    </div>

  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
  name: "Sidebar",
  data(){
    return{
      hidden: true
    }
  },
  computed:{
    ...mapState(['selectedDevice', 'daysWhenOffline']),
    ...mapGetters({currentSmaddle:'getSelectedDevice'}),

    isOnline(){
      return Math.floor(Date.now() / 1000) - this.currentSmaddle.properties.last_updated < 86400 * this.daysWhenOffline
    }
  },

  methods: {
    hideSideBar() {
      this.hidden = true
      this.$store.dispatch('setSelectedDevice', null)
    }
  },

  watch:{
    // Here I wait a couple milliseconds for the sidebar to disapear before removing the contents
    currentSmaddle(newVal) {
      if (newVal == null) {
        this.hidden = true
      }
      else {
        this.hidden = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
  #sidebar {
    padding: 24px;
    header{
      display: flex;
      justify-content: left;
      align-items: center;
      margin-bottom: 24px;
      .status{
        display: inline-flex;
        height: 15px;
        min-width: 15px;
        background-color: gray;
        border-radius: 50%;
        &.online{background-color: var(--success)}
        &.offline{background-color: var(--danger)}
      }
    }
    border-radius: 8px;
    position: absolute;
    bottom: 0;
    min-width: 200px;
    width: 100%;
    background: var(--background-secondary);
    transition: .3s;
    z-index: 999;
    &.hidden {
      transform: translateY(100%);
    }
    .sidebar-close{
      height: 40px;
      width: 40px;
      border-radius: 50%;
      background: var(--primary);
      color: white;
    }
  }
  @media (min-width: 768px) {
    #sidebar {
      transform: translateX(0);
      left: 12px;
      top: 82px;
      width: 350px;
      height: fit-content;
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      &.hidden {
        transform: translateX(calc(-100% - 12px));
      }
    }
  }

  .progress{
    background: var(--background-primary);
  }
</style>
