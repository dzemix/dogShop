<template>
  <nav-bar></nav-bar>
</template>
<script>
import navBar from '@/components/navBar'
export default {
  components: {
    navBar
  },
  mounted () {
    this.$store.commit('add', 10)
  }
}
</script>

