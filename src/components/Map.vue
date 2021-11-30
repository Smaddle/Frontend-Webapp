<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "Map",
  data() {
    return {
      accessToken: "pk.eyJ1IjoianVsZXNpIiwiYSI6ImNrd2x3a3dwbTI2Z3UycHBtYmNwcnZ1ZWMifQ.UaBi2sABZem8F6f085kYOA",
    };
  },
  mounted() {
    mapboxgl.accessToken = this.accessToken;
    let mapStyle = "streets-v11"
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      mapStyle = "dark-v10"
    }
    new mapboxgl.Map({
      container: "mapContainer",
      style: `mapbox://styles/mapbox/${mapStyle}`,
      center: [4.483788752501035, 51.91741723223824],
      zoom: 12,
    });
  },
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
