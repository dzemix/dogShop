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
import axios from 'axios'
import navBar from '~/components/navBar'
import {Route} from 'vue-router'
export default {
  components: {
    navBar,
    commentSystem
  },
  data () {
    return {
      dogs: '',
      params: ''
    }
  },
  mounted () {
    this.params = this.$route.params.id
    axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              dogs (where:{
                id: "${this.params}"
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
  this.dogs = result.data.data.dogs
})

  },
  methods: {
    addCart() {
      var value = this.$route.params.id
      this.$store.commit('cart/addCart', value)
    },
    sendComment () {
    axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
mutation {
	createComment(
    data: {
      message: "${this.writeComment}"
      dogId: "${this.params}"
    }
  ) {
    id
    message
  }
}
        `
  }
}).then((result) => {
  console.log(result)
})
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
