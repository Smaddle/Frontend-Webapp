<template>
  <div id="sidebar" :class="{hidden: smaddle === null}">
    <div v-if="smaddle">
      <header class="">
        <b-row>
          <b-col><h2>{{smaddle.name}}</h2></b-col>
          <b-col cols="auto"><b-button @click="$emit('smaddleSelected',null)"><b-icon-x></b-icon-x></b-button></b-col>
        </b-row>
      </header>
      <section>
        <h5>Laatst gezien</h5>
        <p>{{smaddle.lastSeen}}</p>
        <h5>Locatie</h5>
        <p></p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    smaddle: Object,
  },
}
</script>

<style scoped lang="scss">
  #sidebar {
    padding: 24px;
    position: absolute;
    bottom: 0;
    min-width: 200px;
    width: 100%;
    background: var(--background-secondary);
    transition: .3s;
    &.hidden {
      transform: translateY(100%);
    }

    .btn {
      background-color: transparent;
      border: none;

      svg {
        font-size: 1.5rem;
      }
    }
  }

  @media (min-width: 768px) {
    #sidebar {
      transform: translateX(0);
      right: 0;
      width: auto;
      box-shadow: rgba(0, 0, 0, 0.1) 0 4px 12px;
      height: calc(100% - 82px);
      &.hidden {
        transform: translateX(100%);
      }
    }
  }

  span{
    margin-bottom: 1rem;
  }
  h5 {
    color: var(--text-secondary);
    margin-bottom: 0px;

  }
</style>