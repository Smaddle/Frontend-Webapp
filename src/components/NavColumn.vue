<template>
  <b-sidebar id="sidebar-1" class="nav-column" title="Sidebar" shadow>
    <div id="profile-display">
          <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="profile picture">
          <span>Bob Huis</span>
    </div>
      <router-link :to="'/'"><b-icon-map-fill class="mr-2"/>Kaart</router-link>
      <router-link :to="'Account'"><b-icon-gear-fill class="mr-2"/>Settings</router-link>
      <router-link :to="'Account'"><b-icon-person-fill class="mr-2"/>Account</router-link>
  </b-sidebar>
</template>

<script>
export default {
  name: "NavColumn"
}
</script>
<style>
  .b-sidebar-body {
    background: var(--background-secondary);
  }
  .b-sidebar-header {
    background: var(--background-secondary);
    color: var(--text-primary);
  }
</style>
<style scoped lang="scss">
  .b-sidebar-body{
    background: var(--background-secondary);

    #profile-display {
      background: var(--background-primary);
      padding: 3rem;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        padding-bottom: 1rem;
        border-radius: 50%;
        max-width: 50%;
      }
    }

    a:hover {
      background: var(--background-primary);
    }

    .router-link-active {
      background: var(--background-primary);
    }

    a {
      text-decoration: none;
      color: var(--text-primary);
      display: block;
      padding: 1rem;
      text-align: start;
    }
  }
</style>