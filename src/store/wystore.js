import Vue from 'vue'
import Vuex from 'vuex'
import {highQualityMusic,suggestedMusic} from '../api/wymusicAPI'


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
    //精品歌单
    highQualityList:{},
    //网友推荐
    suggestedList:{}
  },

  actions:{

    highQuality({commit}){
      highQualityMusic().then(data=>{
        console.log(data);
        if(data.status===200){
            commit("setHighList",data.data.playlists);
        }else{
          commit("setMessage",{success:false,msg:data.statusText});
        }
        commit("setIsLoading",false);
      }).catch(error=>{
        console.log(error);
        commit("setIsLoading",false);
        commit("setMessage",{success:false,msg:error.code});
      })

    },
    suggest({commit}){
      suggestedMusic().then(data=>{
        console.log(data);
        if(data.status===200){
          commit("setHighList",data.data.playlists);
        }else{
          commit("setMessage",{success:false,msg:data.statusText});
        }
        commit("setIsLoading",false);
      }).catch(error=>{
        console.log(error);
        commit("setIsLoading",false);
        commit("setMessage",{success:false,msg:error.code});
      })

    }

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
    //设置精品音乐列表
    setHighList (state,data) {
      state.highQualityList = data;
    },
    //设置网友收藏音乐列表
    setSuggestedList (state,data) {
      state.suggestedList = data;
    },
  }
})
