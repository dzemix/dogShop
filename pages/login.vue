<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <b-form-input v-model="name" placeholder="name"></b-form-input>
      <b-form-input v-model="password" placeholder="password" type="password"></b-form-input>
      <button @click="login()">login</button>
      {{response}}
    </div>
  </div>
</template>
<script>
import bcrypt from 'bcryptjs'
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      name: '',
      password: '',
      account: '',
      response: ''
    }
  },
  methods: {
    login () {
      var saltRounds = 10
      this.$axios.post('',
        {
          query: `
            {
              accounts(where: {
                name: "${this.name}"
              }){
                name,
                id,
                email,
                password
              }
            }
          `
        }
      ).then((result) => {
        var validate = result.data.data.accounts
        if(validate) {
          if(bcrypt.compareSync(this.password, validate[0].password)) {
            this.response = 'login correct'
            this.$store.commit('account/login', validate)
            setTimeout(function () {
              this.$nuxt.$router.replace({ path: '/' })
            },1000)      
          }
        } else {
          this.response = 'incorrect data try one more time'
        }
      })
    }
  }
}
</script>

