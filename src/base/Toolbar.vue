<template>
    <nav class="toolBar">
      <ul>
        <li>
          <router-link :to="'/home'" class="ai-home"></router-link>
        </li>
        <li>
          <router-link :to="'/new'">最新</router-link>
        </li>
        <li>
          <router-link :to="'/about'">关于</router-link>
        </li>
      </ul>
    </nav>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'ToolBar',
    computed:{
      ...mapState({

      })
    },
  }
</script>

<style scoped lang="scss">
  @import '../assets/icons/css/androidicons.css';
  .toolBar {
    background: rgba(0,0,0,.5);
    padding:15px 0;
    width: 100%;
    >ul {
      display: -webkit-flex; /* Safari */
      display: flex;
      list-style-type: none;
      justify-content:center;
      align-items: center;
    }
    >li>a{
      color:#fff;
      &:hover,&:focus{
        color:#fff;
      }
    }
  }
</style>

