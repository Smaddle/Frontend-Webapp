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
              coordinates: [0, 0]
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [100, 100]
            }
          },
        ]
      },
      mapType: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-v10' :'streets-v11',
      map: null,
      pulsingDot: null
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

    const size = 200;
    let map = this.map;

    // This implements `StyleImageInterface`
    // to draw a pulsing dot icon on the map.
    this.pulsingDot = {
      width: size,
      height: size,
      data: new Uint8Array(size * size * 4),

      // When the layer is added to the map,
      // get the rendering context for the map canvas.
      onAdd: function () {
        const canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
      },

      // Call once before every frame where the icon will be used.
      render: function () {
        const duration = 1000;
        const t = (performance.now() % duration) / duration;

        const radius = (size / 2) * 0.3;
        const outerRadius = (size / 2) * 0.7 * t + radius;
        const context = this.context;

        // Draw the outer circle.
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      }
    };
    let pulsingDot = this.pulsingDot;
    this.map.on('load', () => {
      map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

      this.map.addSource('dot-point', {
        'type': 'geojson',
        'data': this.markerData
      });
      this.map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'dot-point',
        'layout': {
          'icon-image': 'pulsing-dot'
        }
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