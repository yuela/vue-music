<template>
    <transition>
      <div class="play">
        <div class="playContent">
          <div class="musicImg">
            <router-link :to="{path:'music',query:{id:currentSong.songInfo.songId,pic:currentSong.songInfo.pic,sname:currentSong.songInfo.songName}}">
              <img :src="currentSong.songInfo.pic" :alt="currentSong.songInfo.songName" :title="currentSong.songInfo.songName">
            </router-link>
          </div>
          <div class="musicInfo" rel="imageCover">
            <div>
              <span class="playTime">{{ dataFormat(time) }}</span>
              <input type="range" :max="duration" min="0" step="1" v-model="time" :style="{backgroundSize:((time/duration)*100)+'% 100%'}"/>
              <span>{{ dataFormat(duration)}}</span>
            </div>
            <div>
              <input type="range" rel="voiceRange" :max="voice" min="0" step="0.1" v-model="currentVoice" @change="voiceChange" :style="{backgroundSize:((currentVoice/voice)*100)+'% 100%'}"/>
            </div>
            <div class="playDo">
              <a href="javascript:void(0)" class="ai-playback-rew" @click.prevent="prevOrNext('p')"></a>

              <a href="javascript:void(0)" :class="{ 'ai-playback-play':!isPlaying, 'ai-playback-pause':isPlaying}" @click.prevent="play"></a>
              <a href="javascript:void(0)" class="ai-playback-forw" @click.prevent="prevOrNext('n')"></a>
              <a href="javascript:void(0)" :class="{ 'icon-menu3':showPlayList, ' icon-menu4':!showPlayList}" @click.prevent="playList"></a>
              <a href="javascript:void(0)" class="ai-volume-up" @click.prevent="voiceChange"></a>
              <a href="javascript:void(0)" :class="{ 'ai-playback-shuffle':mode===3, 'ai-playback-repeat':mode===1,'ai-playback-repeat-1':mode===2}" @click.prevent="playMode"></a>
            </div>
          </div>
        </div>

        <audio ref="play" :src="currentSong.songInfo.source" controls preload="auto"></audio>
       <PlayList v-show="showPlayList" @playList="playList" :class="{upAnimation:showPlayList,downAnimation:!showPlayList}"></PlayList>

      </div>

    </transition>
</template>

<script>
  import {mapState} from 'vuex'
  import PlayList from './PlayList'
    export default {
        name: "Play",
      components:{
        PlayList
      },
      data(){
          return {
            isPlaying:false,
            duration:0,
            time:0,
            voice:0,
            currentVoice:0,
            styleTime:'',
            mode:1,
            modeList:['l','o','r'],
            showPlayList:false,
            imageAnimation:'imgRotate '+this.duration+'s linear infinite;',
          }
      },
      computed:{
        ...mapState({
          currentSong:'currentSong',
          downloadSong:'downloadSong',
          message:'message'
        })
      },
      created(){

          if(!this.currentSong.songInfo){
            let playList=JSON.parse(localStorage.getItem("playList"));
            this.$store.commit("setSong",{status:'play',songInfo:playList[0]});
          }
      },
      methods: {
        play() {
          if(this.isPlaying){
            this.$refs.play.pause();
          }else{
            this.$refs.play.play();
          }
          this.isPlaying=!this.isPlaying;
        },
        prevOrNext(songDo,e) {
          if (localStorage.getItem('playList') && localStorage.getItem('playList').length) {
            let playList = JSON.parse(localStorage.getItem('playList'));
            // let songId=JSON.parse(localStorage.getItem("currentPlay"));
            let order=0;
            // if(songId){
            //   order = playList.indexOf(songId);
            // }
            let play = 0;
            switch(songDo){
              case 'p':
                if (order > 0) {
                  play = order - 1;
                } else {
                  play = playList.length - 1;
                }
                break;
              case typeof songDo==Number:
                play=songDo;
                break;
              default:
                if (order === (playList.length - 1)) {
                  play = 0;
                } else {
                  play = order + 1;
                }
                break;
            }
            let info = {
              songId: playList[play].songId,
              songName: playList[play].songName,
              pic: 'http://imgcache.qq.com/music/photo/album_300/' + (playList[play].albumId) % 100 + '/300_albumpic_' + playList[play].albumId + '_0.jpg',
              source: 'http://ws.stream.qqmusic.qq.com/C100' + playList[play].songId + '.m4a?fromtag=0&guid=126548448'
            };
            this.$store.commit("setSong", {status: 'play', songInfo: info});
          } else {
            ReactDOM.findDOMNode(e.target);
            this.$refs.play.loop=true;
          }
        },
        playMode() {
          let n=this.mode;
          if(n===3){
            this.mode=1;
          }else{
            this.mode=++n;
          }
        },
        addEventListeners() {
          const self = this;
          self.$refs.play.addEventListener("timeupdate", self.currentTime);
          self.$refs.play.addEventListener("canplay", self.durationTime);
        },
        removeEventListeners() {
          const self = this;
          self.$refs.play.removeEventListener("timeupdate", self.currentTime);
          self.$refs.play.removeEventListener("canplay", self.durationTime);
        },
        currentTime() {
          const self = this;
          self.time = parseInt(self.$refs.play.currentTime);
          if (self.$refs.play.ended) {
            switch (this.mode) {
              case 2:
                this.self.$refs.play.loop=true;
                break;
              case 3:
                let curn=Math.round(Math.random() * localStorage.getItem("playList"));
                this.prevOrNext(curn);
                break;
              default:
                this.prevOrNext('n');
                break;
            }
          }
        },
        durationTime() {
          const self = this;
          self.duration = parseInt(self.$refs.play.duration);
          if (this.currentSong.status === "play") {
            self.$refs.play.play();
            this.isPlaying=true;
            // this.$refs.imageCover.style.animation=this.imageAnimation;
          }
        },
        voiceChange() {
          this.$refs.play.volume = this.volume;

        },
        dataFormat(time) {
          return Math.floor(time / 60) + ":" + ((time - Math.floor(time / 60) * 60).toString().length > 1 ? (time - Math.floor(time / 60) * 60) : ("0" + (time - Math.floor(time / 60) * 60)))
        },
        getDownloadUrl() {
          const self = this;
          self.time = self.$refs.player;
        },
        playList(){
          this.showPlayList=!this.showPlayList;
        }
      },
      mounted(){
        this.addEventListeners();

      },
      beforeDestroyed() {
        this.removeEventListeners()
      }
    }
</script>

<style scoped lang="scss">
  @import '../assets/icons/css/androidicons.css';
.play {
  height: 36px;
  position:relative;
}
.playContent{
  >div{
    display:inline-block;
    vertical-align: middle;
  }
}
input[type=range]{
  margin-top: 8px;
  outline: none;
  -webkit-appearance: none;/*清除系统默认样式*/
  width:56% !important;
  background: -webkit-linear-gradient(#61bd12, #61bd12) no-repeat, #ddd;
  background-size: 0 100%;/*设置左右宽度比例*/
  height: 3px;/*横条的高度*/
}
/*拖动块的样式*/
input[type=range]::-webkit-slider-thumb {
  -webkit-appearance: none;/*清除系统默认样式*/
  height:16px;/*拖动块高度*/
  width: 16px;/*拖动块宽度*/
  background: #fff;/*拖动块背景*/
  border-radius: 50%; /*外观设置为圆形*/
  border: solid 1px #ddd; /*设置边框*/
}
@keyframes imgRotate {
  from{
    transform: rotate(0);
  }
  to{
    transform: rotate(360deg);
  }
}
.musicImg{
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fff;
  overflow: hidden;
  img{
    width:40px;
  }
}
  .playDo{
    .playOrPause{

    }
  }
  @keyframes down {
    from{
      transform: translateY(0);
    }
    to{
      transform: translateY(200px);
    }
  }
  @keyframes up {
    from{
      transform: translateY(200px);
    }
    to{
      transform: translateY(0);
    }
  }
  .upAnimation{
    animation:up 2s linear ;
  }
  .downAnimation{
    animation:down 2s linear ;
  }
  .playDo{
    >a{
      text-decoration: none;
      font-size:1.5rem;
      color:lightcoral;
    }
  }
</style>
