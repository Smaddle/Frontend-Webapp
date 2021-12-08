<template>
  <b-navbar toggleable="lg" type="light" variant="none">
    <b-navbar-brand href="#">Smaddle</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-button v-b-toggle.sidebar-1>Toggle Sidebar
          <b-icon-person-fill/>
        </b-button>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped lang="scss">
  .navbar{
    background: var(--background-secondary);
    .navbar-brand, .nav-link
    {
      color: var(--text-primary) !important;
    }
  }
</style>