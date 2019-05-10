<template>
  <div>
    <button @click="test()">some</button>
    <button @click="commit()">mutation</button>
  </div>
</template>
<script>
export default {
  methods: {
    test () {
      console.log(this.$store)
    },
    commit () {
      this.$store.cache.dispatch('FETCH_USER', 1)
    }
  }
}
</script>
