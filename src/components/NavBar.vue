<template>
  <b-navbar toggleable="sm" type="light" variant="none">
    <b-navbar-brand href="#"><strong>Smaddle</strong></b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-button variant="account">JI</b-button>
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 99;
    background: var(--background-primary);
    .navbar-brand, .nav-link
    {
      color: var(--text-primary) !important;
    }

    .btn {
      background: none;
      border: none;
    }
  }
  .btn.btn-account{
    height: 50px;
    width: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #654ea3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #eaafc8, #654ea3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #eaafc8, #654ea3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    color: white;
    font-weight: bold;
  }
</style>