<template>
  <div class="playList">
      <p>播放列表，共{{num}}首</p>
    <a href="javascript:void(0)" @click.prevent="close" class="close">&times;</a>
      <div>
        <List class="playSongList" :list="musicList" :type="'del'" v-if="num>0" :flag="'play'"></List>
        <div v-else>播放列表为空，<router-link to="'/home'">去添加</router-link></div>
      </div>
  </div>
</template>

<script>
  import {suggestedMusic,lastestMusic} from "../api/wymusicAPI";
  import List from "./List";
  export default {
    name: 'Home',
    components: {
     List
    },
    data() {
      return {
        num:0,
        showMore: false,
        musicList:{},
        suggest:{},
      }
    },
    computed: {

    },
    created(){
      if(localStorage.getItem('playList') && localStorage.getItem('playList').length){
        this.num=localStorage.getItem('playList').length;
        let playList = JSON.parse(localStorage.getItem('playList'));
        this.num=playList.length;
        this.musicList=playList;
      }else{

      }
    },
    methods:{
        close(){
          this.$emit("playList");
        }
    }
  }
</script>

<style scoped lang="scss">
  .playList{
    position:absolute;
    z-index:99;
    width:100%;
    background: rgba(0,0,0,.5);
    height:0;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    .close{
      position: absolute;
      top: 5px;
      right: 5px;
      text-decoration: none;
      font-size: 15px;
      color: #fff;
    }
    @keyframes up {
      from{
        transform: translateY(200px);
      }
      to{
        transform: translateY(0);
      }
    }
    .playSongList{
      animation:up 3s linear ;
    }
  }
</style>
