<template>
    <div>
      <nav-bar></nav-bar>
        <div class="container">
          <div v-for="dog in dogs" :key="dog.id">
            <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
            <h2>{{dog.name}}</h2>
            <p>{{dog.description}}</p>
          </div>
          <p>{{comments}}</p>
          <input type="text" v-model="writeComment" placeholder="type ur comment">
          <button @click="sendComment()">send</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import navBar from '~/components/navBar'
import {Route} from 'vue-router'
export default {
  components: {
    navBar
  },
  data () {
    return {
      dogs: '',
      comments: '',
      writeComment: '',
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
  console.log(this.dogs)
})
    axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              comments (where: {
                dogId: "${this.params}"
              }) {
                message
              }
            }
        `
  }
}).then((result) => {
  this.comments = result.data.data.comments
  console.log(this.comments)
})
  },
  methods: {
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
</style>
