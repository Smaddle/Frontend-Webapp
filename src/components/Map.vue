<template>
    <div id="mapContainer"/>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { createLayer} from "./PulsingDot"
import { mapState, mapMutations, mapGetters, mapActions } from "vuex"

export default {
  name: "Map",
  data() {
    return {
      mapType: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-v10' :'light-v10',
    }
  },

  computed: {
    ...mapState(['device', 'user']),
    ...mapGetters(['devicesStolen', 'devicesNormal', 'devicesOffline']),
  },

  methods: {
    setMarkerLayer() {
      createLayer(this.device.map, 'stolen', this.devicesStolen)
      createLayer(this.device.map, 'normal', this.devicesNormal)
      createLayer(this.device.map, 'offline', this.devicesOffline)
    },
    ...mapMutations(['setMap']),
    ...mapActions(['registerDevices'])
  },


  mounted() {
    mapboxgl.accessToken = 'pk.eyJ1IjoianVsZXNpIiwiYSI6ImNqdHpsOWVqZjF1aDQ0YWx6MnkwYmUxOGEifQ.Ocnsvr8g-3kI8b0fJxDLgA';
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.mapType = e.matches ? "dark-v10" : "light-v10";
      this.device.map.setStyle(`mapbox://styles/mapbox/${this.mapType}`)
    });

    this.setMap(new mapboxgl.Map({
      container: 'mapContainer',
      style: `mapbox://styles/mapbox/${this.mapType}`,
      center: [-74.5, 40],
      zoom: 9
    }))

    this.device.map.on('styledata', () => {
      this.setMarkerLayer()
    })

    this.device.map.on('load', () => {
      this.registerDevices()
    })
  },
};
</script>
<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
