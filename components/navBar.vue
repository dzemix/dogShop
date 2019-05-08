<template>
  <header>
    <div class="container">
      <div class="logo">
        <img src="../static/logo.jpg" alt="">
      </div>
    </div>
    <div class="navigation">
      <nav>
        <a href="/" class="home">home</a>
        <a href="">web design</a>
        <a href="">graphic design</a>
        <a href="">testimonials</a>
        <a href="">about</a>
        <a href="">contact</a>
      </nav>      
    </div>
  </header>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.logo {
  text-align:center;
  padding-top:13px;
  height:226px;
}
.navigation {
  height:77px;
  background:#F3F7F9;
  nav {
    text-align:center;
    a {
      color:#918FA5;
      line-height: 77px;
      font-size:17px;
      margin: 0 15px;
      text-transform: uppercase;
      font-weight: bold;
      font-family: 'Open Sans Condensed', sans-serif;
    }
    a:hover {
      text-decoration:none;
    }
    .home {
      color:#20A1DB;
    }
  }
}
@media (min-width: 768px) {
  nav {
    display:block;
  }
 }
@media (max-width: 768px) {
  nav {
    display:none;
  }
 }
</style>
