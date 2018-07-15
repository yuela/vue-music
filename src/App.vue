<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Play></Play>
  </div>
</template>

<script>
  import Header from './base/Header'
  import Play from './base/Play'
  export default {
    name: 'App',
    components:{
      Header,Play
    },
  }
</script>

<style>
#app {
  font-family: '微软雅黑', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height:100%;
}
  ul,p{
    padding: 0;
    margin: 0;
  }
  html,body{
    height:100%;
  }
</style>
