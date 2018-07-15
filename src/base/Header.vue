<template>
  <header>
    <div class="searchZone">
      <p>MY Music</p>
      <router-link to="/search"><img src="../assets/search.png" alt="搜索" title="搜索"></router-link>
    </div>
    <Toolbar></Toolbar>
  </header>
</template>

<script>
  import Toolbar from './Toolbar'
    export default {
        name: "Header",
      components:{
        Toolbar
      }
    }
</script>

<style scoped lang="scss">
.searchZone{
  background-color: lightcoral;
  position: relative;
  padding: 15px 0;
  color: #fff;
  font-size: 1.25em;
  >a{
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
