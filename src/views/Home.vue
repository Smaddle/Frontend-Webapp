<template>
    <b-row no-gutters>
        <Map @smaddleSelected="setSelectedSmaddle"/>
<!--      <NavColumn/>-->
      <SmaddleColumn :smaddle="selectedSmaddle" :show="false"/>
    </b-row>
</template>

<script>
// import NavColumn from "../components/NavColumn";
import Map from "../components/Map";
import SmaddleColumn from "../components/SmaddleColumn";
export default {
  name: 'Home',
  components: {
    // NavColumn,
    Map,
    SmaddleColumn
  },
  data() {
    return {
      selectedSmaddle: {
        'name':'Bas fiets',
        'lastSeen': '7 december 10:05',
        'imageUrl': 'https://www.bikefeeling.nl/images/productimages/big/travel-lite-dames-e-bike-neodrives-santos.jpg'
      }
    }
    },
  methods: {
    setSelectedSmaddle(e) {
      this.selectedSmaddle = e
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
  div{
    .center {
      background: var(--background-primary);
    }
  }
</style>
