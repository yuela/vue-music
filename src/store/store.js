import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    message:{
      success:true,
      msg:''
    },
    isLoading:false,
    all: 0,
    fetchCount: 1,
    // 判断是否在加载，防止滚动加载多次
    isFetch: false,
    currentSong:{
      status:'pause',
      songInfo:{}
    },//当前播放的歌曲
    downloadSong:{
    }//要下载的歌曲,
  },

  actions:{

  },
  mutations:{
    //设置是否加载
    setIsLoading (state,data) {
      state.isLoading = data;
    },
    //设置提示信息
    setMessage (state,data) {
      state.message = data;
    },
    //设置查询结果条数
    setDataNum (state, data) {
      state.all = data;
    },
    //设置滚动结果条数
    setFetchCount (state, data) {
      state.fetchCount = data;
      state.isFetch = false;
    },
    //设置正在滚动
    setISFetch (state) {
      state.isFetch = true;
    },
    //设置音乐播放
    setSong (state,data) {
      state.currentSong = data;
    },
    //设置音乐下载
    setDownload (state,data) {
      state.downloadSong = data;
    },
  }
})
