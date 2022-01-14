import store from '../store/index'


export function createPulsingDot(map, status) {
  let color = null
  switch (status)
  {
    case 'stolen':
      color = '220, 53, 69'
      break
    case 'normal':
      color = '0, 123, 255'
      break
    case 'offline':
      color = '253, 126, 20'
      break

  }

  const size = 200;
  return(
    {
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
        context.fillStyle = `rgba(${color}, ${1 - t})`;
        context.fill();

        // Draw the inner circle.
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${color}, 1)`;
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        this.data = context.getImageData(0, 0, this.width, this.height).data;
        map.triggerRepaint();

        return true;
      }
    }
  )
}

//Helper function for the map component to create layers for the different smaddle status types
export function createLayer(map, status, dataPoints) {
  if (!map.getLayer(`${status}-layer`) && !map.getSource(`${status}-point`) && !map.hasImage(`${status}-image`)) {
    //generate the pulsing dot. Color is determined by the status
    map.addImage(`${status}-image`, createPulsingDot(map, status), { pixelRatio: 2 });

    //Add the datapoints for the given status to it's given layer.
    map.addSource(`${status}-point`, {
      type: 'geojson',
      data: dataPoints
    })

    //Add the layer with data points and image to map.
    map.addLayer({
      id: `${status}-layer`,
      type: 'symbol',
      source: `${status}-point`,
      layout: {
        'icon-image': `${status}-image`
      }
    });

    map.on('click', `${status}-layer`, (e) => {
      store.commit('setSelectedDevice', e.features[0].properties.deviceToken)
      map.flyTo({
        center: [e.features[0].geometry.coordinates[0], e.features[0].geometry.coordinates[1]],
        zoom: 16,
        duration: 3000,
        curve: 1
      });
    })
  }
}