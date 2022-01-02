<template>
  <div class="login pb-3">
    <b-form @submit="login">
      <b-form-group label="Username">
        <b-form-input type="text" required v-model="loginData.username"/>
      </b-form-group>
      <b-form-group label="Wachtwoord">
        <b-form-input type="password" required v-model="loginData.password"/>
      </b-form-group>
      <b-button block variant="outline-primary" class="mt-4" to="/auth/register">Account aanmaken</b-button>
      <b-button type="submit" block variant="primary" class="mt-2">Inloggen</b-button>
    </b-form>

  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginData:{
        username: '',
        password: ''
      }
    }
  },
  methods:{
    login(e){
      e.preventDefault(e);
      this.$store.dispatch('login', this.loginData)
    }
  }
}
</script>

<style scoped>

</style>