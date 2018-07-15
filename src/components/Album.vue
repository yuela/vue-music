<template>
    <div class="music">
      <div><span>{{ 2 }}</span></div>
      <div>
        {{lyrics }}
      </div>
      <img :src="image" :alt="name" :title="name">
      <div class="lyrics">{{ lyrics }}</div>
    </div>
</template>

<script>
  // import Play from '../components/Play'

  import {mapState} from 'vuex'
    export default {
        name: "Music",
      data(){
          return {
            lyrics:'',
            image:'',
            name:''
          }
      },
        computed:{
        ...mapState({
          message:'message'
        })
      },
        created(){
          let self=this;
          let songId=self.$route.query.id;
          this.image=self.$route.query.pic;
          this.name=self.$route.query.sname;

        },
      mounted(){

      },
      methods: {
        lyricsFormat() {
          let lyrics = this.musicInfo.lyrics.split(" ");//this.lrc代表歌词文件内容的引用
          let lrcObj = {};
          for(let i=0;i<lyrics.length;i++){
            let lyric = decodeURIComponent(lyrics[i]);
            let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
            let timeRegExpArr = lyric.match(timeReg);
            if(!timeRegExpArr)continue;
            let clause = lyric.replace(timeReg,'');
            for(let k = 0,h = timeRegExpArr.length;k < h;k++) {
              let t = timeRegExpArr[k];
              let min = Number(String(t.match(/\[\d*/i)).slice(1)),
                sec = Number(String(t.match(/\:\d*/i)).slice(1));
              let time = min * 60 + sec;
              lrcObj[time] = clause;
            }
          }
          return lrcObj;
        },
        player(){
          this.p = document.querySelector("#play");
          let _this = this;
          this.lrcObj = this.lyricsFormat();
          console.log(this.lrcObj);
          this.p.addEventListener("timeupdate",function(){
            let obj = _this.lrcObj[Math.floor(this.currentTime)];
            if(obj!=undefined){
              _this.g = obj;
            }
          });
          this.height =window.innerHeight+'px';
          window.onresize  = ()=>{
            _this.height =window.innerHeight+'px'
          }
        }
        },
    }

</script>

<style scoped>

</style>
