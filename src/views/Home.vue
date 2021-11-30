<template>
  <b-container fluid class="home">
    <b-row no-gutters>
      <b-col class="center" cols="12" md="6" order-md="2">
        <Map />
      </b-col>
      <NavColumn/>
      <b-col class="right p-3" cols="12" md="3" order-md="3">
        <b-row class="mb-2">
          <b-col>
            <b-img fluid class="py-2" src="https://i.pinimg.com/736x/f6/1c/de/f61cdee3e645b0d5948c837bd446fe8f--libraries-swag.jpg" alt="bike photo"></b-img>
          </b-col>
        </b-row>
        <b-row class="mb-2">
          <b-col class="text-left" cols="12">
            <h5>Smaddle Details</h5>
            <span>Racefiets Bob</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-left" cols="12">
            <h5>Laatst gezien</h5>
            <span>29 November 2021</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NavColumn from "../components/NavColumn";
import Map from "../components/Map";
export default {
  name: 'Home',
  components: {
    NavColumn,
    Map
  }
}
</script>

<style scoped lang="scss">
  div{
    .center {
      background: var(--background-primary);
    }
    .right {
      background: var(--background-tertiary);
      h5 {
        color: var(--text-secondary);
        margin-bottom: 0px;
      }
    }
  }
</style>
