<template>
  <div class="searchPage">
    <div class="searchHead">

    </div>
    <div class="searchBody">
      <div class="searchCondition">
        <input type="text" placeholder="歌曲名称，歌手" v-model="searchName">
        <input type="image" src="../assets/search.png" @click="search"/>
      </div>
      <div class="result">
        <List v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20" v-if="searchNum>1" :list="musicList" :type="'add'" :flag="'search'"></List>

      </div>
    </div>
    <Loading v-show="isLoading"></Loading>
    <Message v-show="!message.success" :message="message.msg"></Message>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import List from "../base/List";
  import Loading from "../base/List";
  import Message from "../base/List";
    export default {
        name: "Search",
      components: {
        List,Message,Loading
      },
      data(){
          return {
            searchName:'',
            musicList:{},
            searchNum:1,
            num:0
          }
      },
      computed:{
        ...mapState({
          fetchCount:'fetchCount',
          isFetch:'isFetch'
        })
      },
      methods:{
          search(){
            this.$store.commit("setIsLoading",true);
            // if(!this.isFetch){
            //   this.$store.commit("setISFetch");
            //   let info={
            //     name:this.searchName,
            //     page:this.fetchCount
            //   };
            //   searchMusic(info).then(data=>{
            //     if(data.success){
            //       this.num=data.all;
            //       this.musicList=data.list;
            //       let n=this.fetchCount;
            //       this.$store.commit("setFetchCount",++n);
            //       this.$store.commit("setIsLoading",false);
            //     }else{
            //       this.$store.commit("setMessage",data);
            //     }
            //   });
            // }


          },

        loadMore() {
          this.loading = true;
          setTimeout(() => {
            let last = this.list[this.list.length - 1];
            for (let i = 1; i <= 10; i++) {
              this.list.push(last + i);
            }
            this.loading = false;
          }, 2500);
        }
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public';
.searchHead{
  @include header;
}
  .searchCondition{
    >input[type=text] {
      width: 80%;
      height: 30px;
      border-radius: 10px;
      padding: 5px 15px;
      border: 1px solid #fdc;
    }
    >input[type=image]{
      width: 40px;
      height: 42px;
      border-radius: 10px;
      background: rgba(0,0,0,.2);
      border:0;
    }
  }
  .result{
    margin-top: 30px;
    .resultList{
      text-align: left;
      margin:30px 10% 30px 20%;
    }
  }
</style>
