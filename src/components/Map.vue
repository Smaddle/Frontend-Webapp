<template>
    <div id="mapContainer"/>
</template>

<script>
import mapboxgl from "mapbox-gl";
import {mapState} from "vuex";

export default {
  name: "Map",
  data() {
    return {
      mapType: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-v10' :'light-v10',
      map: null,
      pulsingDot: null
    };
  },
  computed:{
    ...mapState({
      daysWhenOffline: state => state.daysWhenOffline,
      markerData: state => state.markerData
    })
  },

  methods: {
    createMarker(marker)
    {
      const el = document.createElement('div');
      el.className = 'smaddle';
      if (marker.properties.stolen) { el.className += ' stolen'}
      if (Math.floor(Date.now() / 1000) - marker.properties.last_updated > 86400 * this.daysWhenOffline) { el.className += ' offline'}
      const circle = document.createElement('div');
      circle.className = 'circle'
      el.appendChild(circle)
      const ringring = document.createElement('div');
      ringring.className = 'ringring'
      el.appendChild(ringring)
      const span = document.createElement('span');
      span.innerText = marker.properties.name
      span.className = 'name'
      circle.appendChild(span)

      el.addEventListener('click', () =>{
        this.$store.dispatch('setSelectedSmaddle', marker)
        this.map.flyTo({
          center: [marker.geometry.coordinates[0], marker.geometry.coordinates[1] - 0.001],
          zoom: 16,
          duration: 3000,
          curve: 1
        });
      })
      let id = marker.properties.DeviceToken
      this.$store.commit('setMarker', {id: id, marker: new mapboxgl.Marker(el)});
      this.markerData.get(id).marker.setLngLat(marker.geometry.coordinates).addTo(this.map)
    }
  },

  mounted(){
    this.$store.dispatch('registerDevices')
    mapboxgl.accessToken = 'pk.eyJ1IjoianVsZXNpIiwiYSI6ImNqdHpsOWVqZjF1aDQ0YWx6MnkwYmUxOGEifQ.Ocnsvr8g-3kI8b0fJxDLgA';
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.mapType = e.matches ? "dark-v10" : "light-v10";
      this.map.setStyle(`mapbox://styles/mapbox/${this.mapType}`)
    });

    this.map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: `mapbox://styles/mapbox/${this.mapType}`, // style URL
      center: [5, 52], // starting position [lng, lat]
      zoom: 15, //initial zoom in
      // minZoom: 8,
      pitch: 30 //tilts camera
    });

    for (let marker of this.markerData){
      this.createMarker(marker[1].geoJson)
    }
  },
};
</script>
<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
