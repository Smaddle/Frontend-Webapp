<template>
  <b-sidebar id="sidebar-details" title="Details" shadow right>
    <b-img fluid class="py-2" :src="smaddle.imageUrl" alt="bike photo"></b-img>
    <div class="details-container">
      <h5>Smaddle</h5>
      <span>{{ smaddle.name }}</span>
      <h5>Laatst gezien</h5>
      <span>{{ smaddle.lastSeen }}</span>
      <h5>Locatie</h5>
    </div>
  </b-sidebar>
</template>

<script>
export default {
  name: "SmaddleColumn.vue",
  props: {
    smaddle: Object,
    show: Boolean
  },
}
</script>

<style scoped lang="scss">
  .details-container {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    color: var(--text-primary);
  }
  span{
    margin-bottom: 1rem;
  }
  h5 {
    color: var(--text-secondary);
    margin-bottom: 0px;

  }
</style>