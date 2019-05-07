<template>
  <div>
    <nav-bar />
    <section class="container">
      <div v-for="dog in dogs" :key="dog.id" class="obj">
        <p>{{dog.name}}</p>
        <p>{{dog.description}}</p>
        <p>age : {{dog.age}}</p>
        <p>{{dog.image.handle}}</p>
        <!-- <img src="https://media.graphcms.com/{{dog.image.handle}}" alt=""> -->
        <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
      </div>
    </section>
  </div>

</template>

<script>
import navBar from '~/components/navBar.vue'
import axios from 'axios'
export default {
  components: {
    navBar
  },
  data () {
    return {
      dogs: ''
    }
  },
  mounted () {
    axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
          {
            dogs {
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
  console.log(result.data.data.dogs)
});
  }
}
</script>

<style lang="scss">
.obj {
  border: 1px solid grey;
  margin:5px;
  border-radius: 10px;
}
.obj {
  p {
    margin:10px;
  }
  img {
    width:100px;
  }
}
</style>
