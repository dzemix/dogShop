<template>
  <header>
    <div class="account">
      <p :class="{
        welcome: true,
        open: isLogin
          }">hello: {{name}}</p>
      <a href="/login" :class="{
        active: isLoginActive,
        hidden: isLogin
        }">login</a>
      <a href="/register" :class="{
        active: isRegisterActive,
        hidden: isLogin
        }">register</a>
      <a href="#" @click='logout()'>logout</a>
    </div>
    <div class="container">
      <div class="logo">
        <nuxt-link to="/"><img src="../static/logo.jpg" alt=""></nuxt-link>
      </div>
    </div>
    <div class="navigation">
      <nav>
        <a href="/" class="home">home</a>
        <a href="">web design</a>
        <a href="">graphic design</a>
        <a href="">testimonials</a>
        <a href="">about</a>
        <a href="">contact</a>
      </nav>      
    </div>
  </header>
</template>
<script>
export default {
    data () {
      return {
        isLoginActive: false,
        isRegisterActive: false,
        isLogin: false,
        name: ''
      }
    },
    mounted () {
      if(this.$route.name == 'login') {
        this.isLoginActive = true
      }
      if(this.$route.name == 'register') {
        this.isRegisterActive = true
      }
      if (this.$store.state.account.account.length != 0) {
        this.isLogin = true
      }
      if(this.$store.state.account.account.length != 0) {
        this.name = this.$store.state.account.account[0].name
      }
    },
    methods: {
      logout() {
        this.$store.commit('account/logout', '')
        this.isLogin = false
      }
    }
}
</script>
<style lang="scss" scoped>
$font: #918FA5;
.logo {
  text-align:center;
  padding-top:13px;
  height:226px;
}
.navigation {
  height:77px;
  background:#F3F7F9;
  nav {
    text-align:center;
    a {
      color:$font;
      line-height: 77px;
      font-size:17px;
      margin: 0 15px;
      text-transform: uppercase;
      font-weight: bold;
      font-family: 'Open Sans Condensed', sans-serif;
    }
    a:hover {
      text-decoration:none;
    }
    .home {
      color:#20A1DB;
    }
  }
}
@media (min-width: 768px) {
  nav {
    display:block;
  }
 }
@media (max-width: 768px) {
  nav {
    display:none;
  }
 }
 .account {
   float:right;
   margin:5px;
   margin-right:20px;
   padding:10px;
   a {
     text-decoration:none;
     text-transform: uppercase;
     color:$font;
     padding:0px;
     margin:5px;
   }
  a:hover {
    border-bottom:3px solid $font;
  }
  .active {
    border-bottom: 3px solid $font
  }
 }
 .hidden {
   display:none;
 }
 .welcome {
   color:$font;
   margin:5px;
   padding:0px;
   text-transform: uppercase;
   display:none;
 }
 .open {
   @extend .welcome;
   display:inline-block;
 }
</style>
