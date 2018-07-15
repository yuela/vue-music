<template>
  <div class="newMusicList">
    <div class="wrapper">
      <div class="title">
        <img :src="suggest.headPic_v12" :alt="suggest.ListName" :title="suggest.ListName">
        <p>{{suggest.ListName}}</p>
        <div>最新音乐</div>
      </div>
      <List :list="musicList" :type="'add'" v-show="musicList.length>0" :flag="'rank'"></List>
    </div>
    <Loading v-show="isLoading"></Loading>
    <Message v-show="!message.success"></Message>
  </div>
</template>

<script>
  import {lastestMusic} from '../api/musicAPI'
  import {mapState} from 'vuex'
  import List from "../base/List";
  import Loading from '../base/Loading'
  import Message from '../base/Message'
  export default {
    name: 'Home',
    components: {
      Message, Loading,List
    },
    data() {
      return {
        showMore: false,
        musicList:{},
        suggest:{},
      }
    },
    computed: {
      ...mapState({
        isLoading:'isLoading',
        message: 'message',
      })
    },
    created(){
      this.$store.commit("setIsLoading",true);
      lastestMusic().then(data=>{
        if(data.success){
          this.suggest=data.info;
          this.musicList=data.list;
        }else{
          this.$store.commit("setMessage",data);
        }
        this.$store.commit("setIsLoading",false);
      }).catch(error=>{
        this.$store.commit("setIsLoading",false);
        this.$store.commit("setMessage",error);
      })
    },
    methods:{

    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/css/public";

  .newMusicList {
    @include recommendList;

  }
</style>
