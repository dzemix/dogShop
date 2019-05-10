<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <div>
    <b-form @submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
        description="We'll never share your email with anyone else."
      >
        <b-form-input
          id="input-1"
          type="email"
          v-model="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          required
          v-model="name"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Your Password:" label-for="input-3">
        <b-form-input
          id="input-3"
          required
          v-model="password"
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Confirm Password:" label-for="input-4">
        <b-form-input
          id="input-4"
          required
          v-model="password2"
          type="password"
          placeholder="Confirm password"
        ></b-form-input>
      </b-form-group>
      <b-alert show variant="primary" v-if="alert">{{alert}}</b-alert>
      <b-button type="submit" variant="primary">Register</b-button>
    </b-form>
  </div>
    </div>
  </div>
</template>
<script>
import bcrypt from 'bcryptjs'
import axios from 'axios'
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      alert: '',
      password: '',
      password2: '',
      name: '',
      email: ''
    }
  },
  methods: {
    onSubmit() {
      
      if(this.password == this.password2) {
        const saltRounds = 10
        var hash = bcrypt.hashSync(this.password, saltRounds)
        console.log(hash)
          axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
mutation {
  createAccount(
  data:{
    name: "${this.name}",
    email: "${this.email}",
    password: "${hash}"
  }){
    name,
    email,
    password
  }
}
        `
  }
}).then((result) => {
  var data = result.data.data
  if(!data) {
    this.alert = result.data.errors[0].message
  }
  if(data) {
    var query = []
    query.push(data.createAccount)
    this.$store.commit('account/login', query)
    this.$nuxt.$router.replace({path: '/'})
  }
})
      } else {
        this.alert = 'incorrect password'
      }
    }
  }
}
</script>

