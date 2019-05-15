<template>
  <div>
    <nav-bar />
    <section class="container">
      <nuxt-link class="obj" :to="`/dog/${dog.id}`" v-for="dog in dogs" :key="dog.id">
        <div class="main">
          <h2>{{dog.name}}</h2>
          <p>{{dog.description}}</p>
          <p>age : {{dog.age}}</p>
          <div class="image">
            <img :src="`https://media.graphcms.com/${dog.image.handle}`" /> 
          </div>           
        </div>
      </nuxt-link>
    </section>
  </div>

</template>

<script>
import navBar from '~/components/navBar.vue'
export default {
  components: {
    navBar
  },
  asyncData ({$axios}) {
    return $axios.$post('',
      {
        query: `
          {
            dogs {
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
    ).then( (res) => {
      return { dogs: res.data.dogs }
    })
    
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 50px;
}
.obj {
  text-decoration: none;
  margin:50px;
  div.main {
    border: 1px solid grey;
    border-radius:5px;
    height:250px;
    overflow:hidden;
    position:relative;
    div {
      position:absolute;
      top:0;
      width:300px;
      overflow:hidden;
      img {
        width:300px;
      }
    }
    h2 {
      color:black;
      margin-left: 330px;
    }
    p {
      color:black;
      margin-left: 330px;
    }    
  }
}
.obj:hover {
  text-decoration: none;
  div {
    h2 {
      color:green;
    }    
  }
}
</style>
