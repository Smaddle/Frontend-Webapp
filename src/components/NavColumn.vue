<template>
  <b-col class="nav-column" cols="12" md="3" order-md="1">
    <div id="profile-display">
      <b-row class="mb-2">
        <b-col cols="12" >
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="profile picture">
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" >
          <span>Bob Huis</span>
        </b-col>
      </b-row>
    </div>
    <b-row>
      <b-col class="text-left" cols="12">
        <b-row class="link fluid p-3">
          <b-col>
            <span><b-icon-map-fill class="mr-2"/>Kaart</span>
          </b-col>
        </b-row>
        <b-row class="link fluid p-3">
          <b-col>
            <span><b-icon-gear-fill class="mr-2"/>Settings</span>
          </b-col>
        </b-row>
        <b-row class="link fluid p-3">
          <b-col>
            <span><b-icon-person-fill class="mr-2"/>Account</span>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-col>
</template>

<script>
export default {
  name: "NavColumn"
}
</script>

<style scoped lang="scss">
  .nav-column {
    background: var(--background-secondary);

    #profile-display {
      background: var(--background-primary);
      padding: 3rem;

      img {
        border-radius: 50%;
      }
    }

    .link:hover {
      background: var(--background-primary);
    }
  }
</style>