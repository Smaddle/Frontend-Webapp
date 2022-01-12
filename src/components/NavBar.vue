<template>
  <div id="navbar">
    <b-button variant="square" class="shadow-sm" to="/devices" v-if="$route.name === 'Home'">
      <b-icon icon="grid-fill"></b-icon>
    </b-button >
    <b-button variant="square" class="shadow-sm" to="/" v-else>
      <b-icon icon="map-fill"></b-icon>
    </b-button>
    <div class="d-flex">
      <b-dropdown id="dropdown-right" right class="shadow-sm account shadow-sm" variant="square account" no-caret>
        <b-dropdown-text v-if="user !== null" class="text-secondary small">{{ user.firstName }} {{ user.lastName }}</b-dropdown-text>
        <b-dropdown-divider/>
        <b-dropdown-item to="/account">Account</b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item variant="danger" to="/auth">Uitloggen</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "NavBar",
  computed:{
    ...mapState({
      user: state => state.user.user
    })
  }
}
</script>

<style scoped lang="scss">
  #navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: transparent;
    padding: 12px;
    display: flex;
    justify-content: space-between;
  }
</style>
<style lang="scss">
  /* This component is rendered later, so that's why it is not scoped */
  .account{
    .btn.account{
      background-image: url("https://avatars.githubusercontent.com/u/45227130?v=4");
      background-position: center;
      background-size: cover;
    }
  }
  .dropdown-menu{
    box-shadow: 0 0.125rem 0.25rem rgb(0 0 0 / 8%) !important;
    background: var(--background-secondary) !important;
    border: none;
    margin-top: 8px !important;
    .dropdown-item{
      color: var(--text-primary);
      &:focus{
        background-color: var(--primary);
        color: white !important;
      }
    }
  }

</style>