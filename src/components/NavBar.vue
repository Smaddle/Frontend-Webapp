<template>
  <div id="navbar">
    <b-button variant="square" class="shadow-sm" to="/devices" v-if="$route.name === 'Home'">
      <b-icon icon="grid-fill"></b-icon>
    </b-button >
    <b-button variant="square" class="shadow-sm" to="/" v-else>
      <b-icon icon="map-fill"></b-icon>
    </b-button>
    <div class="d-flex">
      <div class="d-flex align-items-center mr-3 shadow-sm search-wrapper" :class="{hidden: searchHidden}">
        <b-button variant="square" class="search-button" @click="searchHidden = !searchHidden"><b-icon :icon="searchHidden ? 'search' : 'x'"/></b-button>
        <b-form @submit="searchSubmit">
          <b-form-input class="search-box" placeholder="Wat zoek je?" v-model="searchInput"></b-form-input>
        </b-form>

      </div>
      <b-dropdown id="dropdown-right" right class="shadow-sm account shadow-sm" variant="square account" no-caret>
        <b-dropdown-text class="text-secondary small">Jules Immerzeel</b-dropdown-text>
        <b-dropdown-divider/>
        <b-dropdown-item to="/account">Account</b-dropdown-item>
        <b-dropdown-divider/>
        <b-dropdown-item variant="danger" to="/auth">Uitloggen</b-dropdown-item>
      </b-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data(){
    return{
      searchHidden: true,
      searchInput: ''
    }
  },
  methods:{
    searchSubmit(e){
      e.preventDefault()
      //Place code here to search
      alert(this.searchInput);
    }
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
  .search-wrapper{
    .search-box{
      height: 50px;
      border-radius: 0 8px 8px 0;
      border: none;
      background-color: var(--background-secondary);
      color: var(--text-primary);
      max-width: 150px;
      transition: .5s;
      padding: 0.375rem 0.75rem;
      overflow-y: hidden;
    }
    @media (min-width: 768px) {
      .search-box{
        max-width: 300px;
      }
    }
    .search-button{
      border-radius: 8px 0 0 8px !important;
      transition: .5s;
    }
    &.hidden{
      .search-box{
        max-width: 0;
        padding: 0.375rem 0;
      }
      .search-button{
        border-radius: 8px !important;
      }

    }
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