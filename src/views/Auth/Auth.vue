<template>
  <div class="auth">
    <header class="d-flex justify-content-center align-items-center pt-3" @click="$router.push('/')">
      <img src="../../assets/logo.png" alt="Logo" height="50px"/>
      <h1 class="mb-0 ml-3">Smaddle</h1>
    </header>
    <b-card class="form-container">
      <b-card-title>{{$route.name}}</b-card-title>
      <transition
          name="fade"
          mode="out-in"
      >
        <router-view></router-view>
      </transition>

    </b-card>
  </div>
</template>

<script>
export default {
  name: "Auth",
}
</script>

<style scoped lang="scss">
  .auth{
    background-image: url("https://images.unsplash.com/photo-1471506480208-91b3a4cc78be?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2074&q=80");
    background-size: cover;
    background-position: center;
    background-color: rgba(0,0,0,.5);
    background-blend-mode: overlay;
    height: 100%;
    position: relative;
    header{
      cursor: pointer;
    }
  }
  .form-container{
    .card-title{
      text-align: center;
      font-size: xx-large;
      margin-bottom: 24px;
    }
    position: absolute;
    width: 90%;
    max-width: 400px;
    left: 50%;
    top: 100px;
    transform: translate(-50%);
    background: var(--background-secondary);
    border-radius: 12px;
    max-height: 80%;
    overflow-y: auto;
  }



  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
</style>