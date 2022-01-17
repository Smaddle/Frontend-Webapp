<template>
  <div class="account">
    <b-container fluid>
      <h1>Account</h1>
      <b-form @change="edited = true" @submit="updateAccount">
        <b-form-group label="E-mailadres">
          <b-form-input type="email" required v-model="user.emailAddress"/>
        </b-form-group>
        <b-form-group label="Username">
          <b-form-input type="text" required v-model="user.username"/>
        </b-form-group>
        <b-form-group label="Naam">
          <b-form-input type="text" class="mb-2" placeholder="Voornaam" required v-model="user.firstName"/>
          <b-form-input type="text" class="mb-2" placeholder="Tussenvoegsel" v-model="user.middleName"/>
          <b-form-input type="text" required placeholder="Achternaam" v-model="user.lastName"/>
        </b-form-group>
        <b-button :disabled="edited == false" type="submit" block variant="primary" class="mt-2">Wijzigingen opslaan</b-button>
      </b-form>
    </b-container>
  </div>

</template>

<script>

export default {
  name: "Account",
  data() {
    return {
      edited: false,
      user: { ...this.$store.state.user.user } //copy the value not the reference
    }
  },

  methods:{
    updateAccount(e){
      e.preventDefault()
      this.$store.dispatch('updateAccount', this.user)
    }
  }
}
</script>

<style scoped>
  .account{
    padding-top: 72px;
  }
</style>
