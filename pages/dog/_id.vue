<template>
    <div>
      <nav-bar></nav-bar>
        <div class="container">
          <div v-for="dog in dogs" :key="dog.id">
            <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
            <h2>{{dog.name}}</h2>
            <p>{{dog.description}}</p>
            <div class="button">
              <b-button variant="success" @click="addCart()">ADD TO CART</b-button>
            </div>
          </div>
          <comment-system></comment-system>
        </div>
    </div>
</template>
<script>
import commentSystem from '~/components/commentSystem'
import navBar from '~/components/navBar'
export default {
  components: {
    navBar,
    commentSystem
  },
  async asyncData ({$axios, params}) {
    var dogs = (await $axios.$post('',
 {
    query: `
            {
              dogs (where:{
                id: "${params.id}"
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
    )).data.dogs
    return { dogs }
  },
  data () {
    return {
      params: ''
    }
  },
  methods: {
    addCart() {
      var value = this.$route.params.id
      this.$store.commit('cart/addCart', value)
    }
  }
}
</script>
<style lang="scss" scoped>
img {
  width:200px;
}
.button {
  margin:15px;
  display:flex;
  justify-content: flex-end;
}
</style>
