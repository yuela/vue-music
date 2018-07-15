import $ from 'jquery';
import axios from './axiosService'
//最新歌单
export const lastestMusic=()=>{
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=27&_=1519963122923&guid=126548448';
  return new Promise((resolve, reject)=> {
    $.ajax({
      url: url,
      type: "get",
      dataType: 'jsonp',
      jsonp: "jsonpCallback",
      scriptCharset: 'GBK',//解决中文乱码
      success: function (data) {
        //最新音乐数据
        let list=[];
        for(let item of data.songlist){
          list.push({
            order:item.cur_count,
            albumId:item.data.albumid,
            albumName:item.data.albumName,
            singer:item.data.singer,
            songId:item.data.songmid,
            songName:item.data.songname
          });
        }
        let info={success:true,info:data.topinfo,list:list};
        resolve(info);
      },
      error: function (e) {
        console.log('error');
        let err={success: false, msg: "接口错误"};
        reject(err);
      }
    });
  })
};
//推荐歌单
export const suggestedMusic=()=>{
  let url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid=36&_=1520777874472&guid=126548448';
  return new Promise((resolve, reject)=>{
    $.ajax({
      url:url,
      type:"get",
      dataType:'jsonp',
      jsonp: "jsonpCallback",
      scriptCharset: 'GBK',//解决中文乱码
      success: function(data){
        //最新音乐数据
        let list=[];
        for(let item of data.songlist){
          list.push({
            order:item.cur_count,
            albumId:item.data.albumid,
            albumName:item.data.albumname,
            singer:item.data.singer,
            songId:item.data.songmid,
            songName:item.data.songname
          });
        }
        let info={success:true,info:data.topinfo,list:list};
        resolve(info);
      },
      error:function (e) {
        console.log('error');
        let err={success:false,msg:"接口错误"};
        reject(err);
        // return
      }
    });
  })

};
// 歌曲搜索api
export const searchMusic=(info) => {
  let url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+info.name+'&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p='+info.page+'&remoteplace=txt.mqq.all&_=1520833663464';
  return new Promise((resolve, reject)=> {
    $.ajax({
      url: url,
      type: "get",
      dataType: 'jsonp',
      jsonp: "callback",
      jsonpCallback: 'callback',
      scriptCharset: 'GBK',//解决中文乱码
      success: function (data) {
        //获取搜索数据
        console.log(data);
        let list=[];
        for(let [key,item] of data.data.song.list.entries()){
          list.push({
            order:key-0+1,
            albumId:item.albumid,
            albumName:item.albumName,
            singer:item.singer,
            songId:item.songmid,
            songName:item.songname
          });
        }
        let info={success:true,all:data.data.song.totalnum,list:list};
        resolve(info);
      },
      error: function (e) {
        console.log('error');
        Indicator.close();
        let err={success:false,msg:"接口错误"};
        reject(err);
      }
    });
  })
};
// 获取歌曲歌词api
export const musicLyrics=(musicId) => {
  return axios.get('/getLrc?songId'+musicId);
};
