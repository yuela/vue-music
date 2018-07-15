<template>
  <li class="item">
    <span v-show="flag!=='play'">{{item.order}}</span>
    <div class="singer">
      <span v-for="singer in item.singer">{{singer.name}}</span>
    </div>
    <span class="songName">{{item.songName}}</span>
    <div class="playAction">
        <a href="javascript:void(0)" @click="addPlayList" class="ai-plus" v-show="type==='add'"></a>
        <a href="javascript:void(0)" @click="playSong" class="ai-headphones"></a>
        <a href="javascript:void(0)" class="ai-download" :download="download" @click="down"></a>
        <a href="javascript:void(0)" @click="delPlayList" class="ai-trash" v-show="type==='del'"></a>
      </div>
  </li>
</template>

<script>
    export default {
        name: "Item",
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
            let song=this.item;
            if(localStorage.getItem('playList') && localStorage.getItem('playList').length){
              let playList = JSON.parse(localStorage.getItem('playList'));
              for(let play of playList){
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
  @import '../assets/icons/css/androidicons.css';
.item {
  list-style-type: none;
  margin:5px;
  padding:5px 20px;
  background: lightgray;
  border-radius:20px;
  >span,>img,.itemContent,.singer{
    display:inline-block;
  }
  >span:first-child{
    width:30px;
  }
  >img{
    width:20%;
    height:auto;
  }
  >img,.itemContent{
    vertical-align: middle;
  }
  .singer,.songName{
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    vertical-align: top;
  }
  .singer{
    width: 60px;
  }
  .songName{
    width:calc(100% - 200px);
  }
  .itemContent{

  }
  .playAction{
    display: inline-block;
    float:right;
    &:after{
      content:'';
      clear:right;
    }
    >a{
      cursor: pointer;
      display: inline-block;
      width:20px;
      height:20px;
      border-radius:5px;
      background-color: lightcoral;
      margin:0 5px;
      color: #fff;
      text-align: center;
    }
  }
}



</style>
