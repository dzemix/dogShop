<template>
  <div>
    <nav-bar />
    <section class="container">
      <div v-for="dog in dogs" :key="dog.id" class="obj">
        <h2><a href="">{{dog.name}}</a></h2>
        <p>{{dog.description}}</p>
        <p>age : {{dog.age}}</p>
        <p>{{dog.image.handle}}</p>
        <div class="image">
          <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
        </div>
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
  overflow:hidden;
  position:relative;
  height:200px;
  p {
    margin:10px;
    margin-left: 270px;
  }
  h2 {
    margin-left: 270px;
    a {
      text-decoration: none;
      color:black;
    }
  }
  .image{ 
    position:absolute;
    overflow:hidden;
    top:0px;
    left:0px;
    width:250px;
    height:300px;
    img {
      display:block;
      width:250px;
      margin: 0 0;
    }
  }
}
.obj:hover {
  h2 {
    a {
      color:green;
    }
  }
}
.container {
  margin-top: 50px;
}
</style>
