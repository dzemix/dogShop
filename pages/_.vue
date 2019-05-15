<template>
  <div class="container">
    <p>this is 404 page i will be redirect to main page in 5s</p>
  </div>
</template>
<script>
export default {
  mounted () {
    setTimeout(function () {
      this.$nuxt.$router.replace({ path: '/' })
    },5000)
  }
}
</script>
