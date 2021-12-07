<template>
  <b-col class="right p-3" cols="12" md="3" order-md="3">
    <b-row class="mb-2">
      <b-col>
        <b-img fluid class="py-2" :src="smaddle.imageUrl" alt="bike photo"></b-img>
      </b-col>
    </b-row>
    <b-row class="mb-2">
      <b-col class="text-left" cols="12">
        <h5>Smaddle Details</h5>
        <span>{{ smaddle.name }}</span>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-left" cols="12">
        <h5>Laatst gezien</h5>
        <span>{{ smaddle.lastSeen }}</span>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "SmaddleColumn.vue",
  props: {
    smaddle: Object
  },
}
</script>

<style scoped>
.right {
  background: var(--background-tertiary);
  }
  h5 {
    color: var(--text-secondary);
    margin-bottom: 0px;
  }
</style>