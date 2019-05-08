<template>
  <div class="comments">
    <p>comments:</p>
    <div v-for="comment in comments" :key="comment.id" class="single">
      <p class="delete" @click="deleteComment(comment.id)">delete</p>
      <p class="time">{{comment.createdAt}}</p>
      {{comment.message}}
    </div>
    <form action="" v-on:submit.prevent="sendComment()">
      <input type="text" placeholder="write your comment" v-model="yourComment">
      <input type="button" value="send" @click="sendComment()">
    </form>
  </div>
</template>
<script>
import axios from 'axios'
import {Route} from 'vue-router'
export default {
  data () {
    return {
      comments: '',
      params: '',
      yourComment: ''
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
              comments (where: {
                dogId: "${this.params}"
              },
              orderBy: createdAt_DESC) {
                message,
                id,
                createdAt
              }
            }
        `
  }
}).then((result) => {
  this.comments = result.data.data.comments
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
                message: "${this.yourComment}"
                dogId: "${this.params}"
              }
            ){
              id,
              message,
              createdAt
            }
          }
        `
          }
      }).then((result) => {
        console.log(result)
        if(result) {
          axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              comments (where: {
                dogId: "${this.params}"
              },
              orderBy: createdAt_DESC) {
                message,
                id,
                createdAt
              }
            }
        `
  }
}).then((result) => {
  this.comments = result.data.data.comments
  console.log(this.comments)
})
        }
      })
    },
    deleteComment(param) {
          axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
      mutation {
        deleteComment(where:{
          id: "${param}"
        }){
          id
          message
        }
      }
    `
  }
}).then((result) => {
  if (result) {
          axios({
  url: 'https://api-euwest.graphcms.com/v1/cjuv6vg2j85lu01fa1ppccsy7/master',
  method: 'post',
  data: {
    query: `
            {
              comments (where: {
                dogId: "${this.params}"
              },
              orderBy: createdAt_DESC) {
                message,
                id,
                createdAt
              }
            }
        `
  }
}).then((result) => {
  this.comments = result.data.data.comments
})    
  }
  this.comments = result.data.data.comments
})
    }
  }
}
</script>
<style lang="scss" scoped>
.comments {
  border-top: 1px solid grey;
  .single {
    height:30px;
    border-bottom: 1px solid grey;
    margin:10px;
    .time {
      float:right;
    }
  }
}
.delete {
  float:right;
  margin-left:10px;
}
.delete:hover {
  color:red;
  cursor: pointer;
}
</style>