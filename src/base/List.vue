<template>
  <ol class="list" :class="{hasIndex:flag==='play'}">
    <Item v-for="item in list" :key="item.id" :item="item" :type="type"></Item>
  </ol>
</template>

<script>
  import Item from "./Item";
    export default {
        name: "List",
      props:["list",'type','flag'],
      components:{
          Item
      },
    }
</script>

<style scoped lang="scss">
  @import "../assets/css/public";
  .list{
    text-align: left;
    padding:0 0.5em;
    margin:0;
  }
  .hasIndex{}
</style>
