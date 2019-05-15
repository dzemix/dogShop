<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <b-button @click="clear()">clear</b-button>
      <div class="cartTable">
        <div class="cart" v-for="dog in dogs" :key="dog.id">
            <img :src="`https://media.graphcms.com/${dog.image.handle}`" />
        </div>
      </div>
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
      cartValues: '',
      dogs: []
    }
  },
  mounted () {
    setTimeout ( () => {
      this.cartValues = this.$store.state.cart.cart
      for(var counter = 0; this.cartValues.length > counter; counter++) {
        console.log()
        axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              dogs (where:{
                id: "${this.cartValues[counter]}"
              }) {
                id,
                name,
                age,
                description,
                image {
                  id,
                  handle
                }
              }
            }
        `
  }
}).then((result) => {
  this.dogs.push(result.data.data.dogs[0])
  console.log(this.dogs)
})
      }
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
<style lang="scss" scoped>
.cart {
  img {
    width:100px;
  }
}
</style>

