<template>
  <li class="item">
    <router-link :to="'/album/'+item.id">{{item.coverImgUrl}}</router-link>
    <router-link :to="'/album/'+item.id">{{item.name}}</router-link>
    <div class="singer">{{item.description}}</div>
    <div>
      <router-link v-for="tag in item.tags" :to="'/search'+tag"></router-link>
    </div>
    <span class="songName">{{item.songName}}</span>
    <div class="playAction">
        <a href="javascript:void(0)" @click="addPlayList" class="add" v-show="type==='add'"></a>
        <a href="javascript:void(0)" @click="playSong" class="play"></a>
        <a href="javascript:void(0)" class="down" :download="download" @click="down"></a>
        <a href="javascript:void(0)" @click="delPlayList" class="del" v-show="type==='del'"></a>
      </div>
  </li>
</template>

<script>
    export default {
        name: "AlbumItem",
      props: ['item','type','flag'],
      data () {
        return {
          picture:'http://imgcache.qq.com/music/photo/album_300/'+(this.item.albumId)%100+'/300_albumpic_'+this.item.albumId+'_0.jpg',
          audio:'http://ws.stream.qqmusic.qq.com/C100'+this.item.songId+'.m4a?fromtag=0&guid=126548448',
          download:this.item.songName +'.m4a'
        }
      },
      created() {

      },
      methods:{
          addPlayList(){
            const self = this;
            let song=this.item;
            if(localStorage.getItem('playList') && localStorage.getItem('playList').length){
              let playList = JSON.parse(localStorage.getItem('playList'));
              for(let play of playList.entries()){
                if(this.item.songId===play.songId){
                  this.$store.commit("setMessage",{success:false,msg:'已在播放列表啦！'});
                }
              }
              this.$store.commit("setMessage",{success:false,msg:'添加成功！'});
              playList.push(song);
              localStorage.setItem('playList',JSON.stringify(playList));
            }else{
              this.$store.commit("setMessage",{success:false,msg:'添加成功！'});
              localStorage.setItem('playList',JSON.stringify([song]));
            }
          },
          playSong(){
            let info={
              songId:this.item.songId,
              songName:this.item.songName,
              pic:this.picture,
              source:this.audio
            };
            this.$store.commit("setSong",{status:'play',songInfo:info});
            localStorage.setItem('currentPlay',JSON.stringify(this.item.songId));
          },
        delPlayList(){
            let songId=this.item.songId;
          let playList = JSON.parse(localStorage.getItem('playList'));
          playList.splice(0,songId);
          localStorage.setItem("playList",playList);
        },
          down(){
            let info={
              source:this.audio
            };
            this.$store.commit("setDownload",info);
          }
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/css/public';

.item {
  list-style-type: none;
  margin:5px;
  padding:5px 20px;
  background: lightgray;
  border-radius:20px;
  >span:first-child{
    display:inline-block;
    width:30px;
  }
  >img{
    width:20%;
    height:auto;
  }
  >img,.itemContent{
    display:inline-block;
    vertical-align: middle;
  }
  .singer{
    display:inline-block;
  }
  .itemContent{

  }
  .playAction{
    display: inline-block;
    >a{
      cursor: pointer;
      display: inline-block;
      width:30px;
      height:30px;
      border-radius:5px;
      background-color: lightcoral;
      margin:0 10px;
    }
    .add{
      /*background: url("../assets/playbar.png") no-repeat 0 0;*/
      /*width: 13px;*/
      /*height: 13px;*/
      /*background-position: 44px 200px;*/
      //&:hover,&:focus{
      //  background-position: -22px -700px;
     // }
    }
    .play{
      //@include playBar;
      //width: 17px;
      //height: 17px;
      //background-position: 0 -103px;
      //&:hover,&:focus{
      //  background-position: 0 -128px;
     // }
    }
    .down{
     // @include playBar;
      //width: 18px;
      //height: 16px;
      //background-position: -81px -174px;
     // &:hover,&:focus{
     //   background-position: -104px -174px;
    //  }
    }
  }
}



</style>
