<template>
  <transition name="slide" mode="out-in">
  <b-col class="right p-3" cols="12" md="3" order-md="3" v-if="show">
      <b-row class="mb-2" >
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
    <b-row>
      <b-col>
        <button @click="show = false">close</button>
      </b-col>
    </b-row>
    </b-col>
  </transition>
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
.right {
  position: absolute;
  right: 0;
  background: var(--background-tertiary);
  height: calc(100vh - 56px);

  .slide-enter-active, .slide-leave-active {
    transition: opacity .5s;
  }
  .slide-enter, .slide-leave-to {
    opacity: 0;
  }
}
  h5 {
    color: var(--text-secondary);
    margin-bottom: 0px;

  }
</style>