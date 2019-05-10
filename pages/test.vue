<template>
  <div>
    <button @click="test()">test</button>
    <button @click="test2()">test2</button>
  </div>
</template>
<script>
import bcrypt from 'bcryptjs'
export default {
  data () {
    return {
      hash: ''
    }
  },
  methods: {
    test() {
bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash("B4c0/\/", salt,(err, hash) => {
        // Store hash in your password DB.
        this.hash = hash
        console.log(this.hash)
    });
});
    },
    test2() {
      console.log(bcrypt.compareSync("sasdB4c0/\/", this.hash))
    }
  }
}
</script>

