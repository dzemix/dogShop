<template>
  <div>
    <nav-bar></nav-bar>
    <div class="container">
      <button @click="login()">login</button>
    </div>
  </div>
</template>
<script>
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
}
</script>

