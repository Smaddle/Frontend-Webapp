<template>
  <div class="device-card">
    <h2>Device: {{device.properties.name}}</h2>
    <div>
      <p v-if="device.properties.bat">Battery: {{roundNumber(device.properties.bat.sad)}}%</p>
      <p v-if="device.geometry.coordinates">Longitude and Latitude: {{device.geometry.coordinates[0]}}, {{device.geometry.coordinates[1]}}</p>
      <p v-if="device.properties.spd">Speed: {{roundNumber(device.properties.spd)}}m/s</p>
      <p v-if="device.properties.imu">Temperature: {{roundNumber(device.properties.imu.temp)}}°C</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Device",
  props: ['device'],
  methods: {
    roundNumber(num) {
      return (Math.round(num * 10) / 10)
    }
  },
}
</script>

<style scoped>
  .device-card {
    padding: 1rem;
    background-color: var(--background-primary);
  }
  .device-card p{
    margin-bottom: 0.1rem;
  }
</style>