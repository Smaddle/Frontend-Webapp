<template>
  <div class="register pb-3">
    <b-form @submit="register">
      <b-form-group label="E-mailadres">
        <b-form-input type="email" required v-model="registerData.emailAddress"/>
      </b-form-group>
      <b-form-group label="Username">
        <b-form-input type="text" required v-model="registerData.username"/>
      </b-form-group>
      <b-form-group label="Wachtwoord">
        <b-form-input type="password" required v-model="registerData.password"/>
      </b-form-group>
      <b-form-group label="Wachtwoord Bevestigen">
        <b-form-input type="password" required :state="(registerData.password === registerData.password_confirm) && registerData.password !== ''" v-model="registerData.password_confirm"/>
      </b-form-group>
      <b-form-group label="Naam">
        <b-form-input type="text" class="mb-2" placeholder="Voornaam" required v-model="registerData.firstname"/>
        <b-form-input type="text" class="mb-2" placeholder="Tussenvoegsel" v-model="registerData.middlename"/>
        <b-form-input type="text" required placeholder="Achternaam" v-model="registerData.lastname"/>
      </b-form-group>
      <b-button block variant="outline-primary" class="mt-4" to="/auth">Ik heb al een account</b-button>
      <b-button type="submit" block variant="primary" class="mt-4" :disabled="registerData.password !== registerData.password_confirm && registerData.password === ''">Account aanmaken</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data(){
    return {
      registerData:{
        username: '',
        emailAddress: '',
        password: '',
        password_confirm: '',
        firstname: '',
        middlename: '',
        lastname: '',
      }
    }
  },
  methods:{
    register(e){
      e.preventDefault();
      if (this.registerData.password === this.registerData.password_confirm){
        this.$store.dispatch('register', this.registerData)
      }
    }
  }
}
</script>

<style scoped>
</style>