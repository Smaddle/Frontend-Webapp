<template>
  <div id="mapContainer"></div>
</template>

<script>
import mapboxgl from "mapbox-gl";

export default {
  name: "Map",
  data() {
    return {
      markerData: [
          {
            type: 'Feature',
            properties: {
              'name':'RaceFiets Bob',
              'lastSeen': '5 december 19:49',
              'imageUrl': 'https://i.pinimg.com/736x/f6/1c/de/f61cdee3e645b0d5948c837bd446fe8f--libraries-swag.jpg'
            },
            geometry: {
              type: 'Point',
              coordinates: [5, 52]
            }
          },
          {
            type: 'Feature',
            properties: {
              'name':'Barbara fiets',
              'lastSeen': '7 december 10:05',
              'imageUrl': 'https://www.bikefeeling.nl/images/productimages/big/travel-lite-dames-e-bike-neodrives-santos.jpg'
            },
            geometry: {
              type: 'Point',
              coordinates: [5, 52.5]
            }
          },
        ],
      mapType: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark-v10' :'light-v10',
      map: null,
      pulsingDot: null
    };
  },
  mounted(){
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

    const size = 200;
    let map = this.map;
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
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = `rgba(255, 200, 200, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // Update this image's data with data from the canvas.
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // Continuously repaint the map, resulting
        // in the smooth animation of the dot.
        map.triggerRepaint();

        // Return `true` to let the map know that the image was updated.
        return true;
      }
    };
    this.map.on('style.load', () => {
      this.addDataLayer();
    })
  },

  methods : {
    addDataLayer() {
      this.map.addImage('pulsing-dot', this.pulsingDot, {pixelRatio: 2}); //this adds the custom marker to the sprites that can be used on the map

      this.map.addSource('smaddle-locations', {
        'type': 'geojson', 'data': {
          type: 'FeatureCollection',
          features: this.markerData
        }
        });

      this.map.addLayer({
        'id': 'layer-with-pulsing-dot',
        'type': 'symbol',
        'source': 'smaddle-locations',
        'layout': {
          'icon-image': 'pulsing-dot'
        }
      });

      this.map.on('click', 'layer-with-pulsing-dot', (e) => {
        this.$emit('smaddleSelected', e.features[0].properties);
        this.map.flyTo({
          center: e.features[0].geometry.coordinates,
          zoom: 16,
          duration: 3000,
          curve: 1
        });
      })
    },

    createMarkerData(smaddle) {
      return ({
        type: 'Feature',
        properties: {
          'name': smaddle.name,
          'lastSeen': smaddle.date,
          'imageUrl': smaddle.image
        },
        geometry: {
          type: 'Point',
          coordinates: [smaddle.lat, smaddle.long]
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
#mapContainer {
  width: 100%;
  height: calc(100vh - 56px);
}
</style>
