<template>
  <div id="mapContainer" class="basemap"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "Map",
  data() {
    return {
      markerData: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [51.91711547670975, 4.484114731421678]
            },
            properties: {
              title: 'Racefiets Bob',
              description: 'Laatst gezien: 1 december 2021'
            }
          },
        ]
      },
      mapType: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-v10' :'streets-v11',
      map: ''
    };
  },
  mounted(){
    mapboxgl.accessToken = 'pk.eyJ1IjoianVsZXNpIiwiYSI6ImNqdHpsOWVqZjF1aDQ0YWx6MnkwYmUxOGEifQ.Ocnsvr8g-3kI8b0fJxDLgA';
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      this.mapType = e.matches ? "dark-v10" : "streets-v11";
      this.map.setStyle(`mapbox://styles/mapbox/${this.mapType}`)
    });

    this.map = new mapboxgl.Map({
      container: 'mapContainer', // container ID
      style: `mapbox://styles/mapbox/${this.mapType}`, // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });

    for (const feature of this.markerData.features) {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';
      const text = document.createElement('span')
      el.appendChild(text)
      text.className = 'text'
      text.innerText = feature.properties.title

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat(feature.geometry.coordinates).addTo(this.map);
    }

    this.map.on('click', 'circle', (e) => {
      this.map.flyTo({
        center: e.features[0].geometry.coordinates
      });
    });

  }
};
</script>
<style lang="scss" scoped>
.basemap {
  width: 100%;
  height: calc(100vh - 56px);
}

</style>
<style lang="scss">
.marker {
  //background-image: url('../assets/bike.png');
  display: flex;
  background-size: cover;
  background: red;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  .text{
    background-color: var(--background-primary);
    border-radius: 50px;
    transition: .3s;
    font-size: small;
    margin-top: calc(100% - 30px);
    color: var(--text-primary);
    text-align: center;
    opacity: 0;
    padding: 8px;
  }
  &:hover{
    .text{
      margin-top: calc(100% + 50px);
      opacity: 1;
    }

  }
}
</style>