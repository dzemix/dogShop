<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <b-button @click="clear()">clear</b-button>
      <div class="cartTable">
        <p>{{cartValues}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  data () {
    return {
      cartValues: ''
    }
  },
  mounted () {
    setTimeout ( () => {
      this.cartValues = this.$store.state.cart.cart
    },1000) 
  },
  methods: {
    clear() {
      this.$store.commit('cart/clear')
      this.cartValues = ''
    }
  }
}
</script>

