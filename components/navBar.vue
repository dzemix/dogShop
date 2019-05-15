<template>
  <header>
    <div class="account">
      <a href="/cart" class="cart">
        <i class="fas fa-shopping-cart fa-lg"></i>
        <div :class="{
          cartValue: true,
          displayCart: displayTrue}">{{cartValue}}</div>
      </a>
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
      <a href="#" @click='logout()' :class="{hidden : !isLogin}">logout</a>
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
import cartVue from '../pages/cart.vue';
export default {
    data () {
      return {
        isLoginActive: false,
        isRegisterActive: false,
        isLogin: false,
        name: ''
      }
    },
    computed: {
      displayTrue: function () {
        if (this.cartValue) {
          return true
        } else {
          return false
        }
      },
      cartValue: function () {
        return 2
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
      setTimeout(() => {
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
      }, 1000)
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
.cart {
  position:relative;
  .cartValue {
    position:absolute;
    display: none;
    border-radius:50%;
    top:-9px;
    left:15px;
    background:#21A2DC;
    color:white;
    width:20px;
    height:20px;
    justify-content: center;
    align-items:center;
  }
  .displayCart {
    display:flex;
  }
}
</style>
