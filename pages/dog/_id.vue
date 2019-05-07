<template>
    <div>
      <nav-bar></nav-bar>
        <div class="container">
          <div v-for="dog in dogs" :key="dog.id">
            <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
            <h2>{{dog.name}}</h2>
            <p>{{dog.description}}</p>
          </div>
          <p>{{comment}}</p>
          <input type="text" v-model="comment">
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
      comment: 'some'
    }
  },
  mounted () {
    var params = this.$route.params.id
    console.log(params)
    axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              dogs (where:{
                id: "${params}"
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
});
  }
}
</script>
<style lang="scss" scoped>
img {
  width:200px;
}
</style>
