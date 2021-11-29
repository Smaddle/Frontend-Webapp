<template>
  <b-navbar toggleable="lg" type="light" variant="none">
    <b-navbar-brand href="#">Smaddle</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item  href="#">
          <b-icon-person-fill/>
        </b-nav-item>
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