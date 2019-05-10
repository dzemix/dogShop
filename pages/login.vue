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
import axios from 'axios'
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
          axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              accounts(where: {
                name: "${this.name}",
                password: "${this.password}"
                }){
                name,
                id,
                email,
                password
              }
            }
        `
  }
}).then((result) => {
  this.account = result.data.data.accounts
  if(this.account.length > 0) {
    this.response = 'login correct'
    this.$store.commit('account/login', this.account)
    setTimeout(function () {
      this.$nuxt.$router.replace({ path: '/' })
    },1000)
  } else {
    this.response = 'incorrect data try one more time'
  }
})
    }
  }
}
</script>

