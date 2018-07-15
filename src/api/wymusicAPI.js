import axios from './axiosService'

// //获取歌单分类
// export const musicList=()=>{
//   return axios.get("/playlist/catlist")
// };
//获取精品歌单,默认20条
export const highQualityMusic=()=>{
    return axios.get("/top/playlist/highquality")
};
//获取网友精选碟歌单,默认20条,tag=new/hot
export const suggestedMusic=(tag)=>{
  return axios.get("/top/playlist?limit=20&order="+tag)
};
//获取歌单详情
export const musicListDetail=(musicListId)=>{
  return axios.get("/playlist/detail?id="+musicListId)
};
//搜索歌曲
/*
必选参数 : keywords : 关键词
可选参数 : limit : 返回数量 , 默认为 30
offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002:
用户 1004: MV 1006: 歌词 1009: 电台
*/
export const searchMusic=(data)=>{
  return axios.get("/search?keywords="+data)
};
//热门搜索
export const searchHot=()=>{
  return axios.get("/search/hot")
};
//搜索建议
export const searchSuggested=(data)=>{
  return axios.get("/search/suggest?keywords="+data+"&limit=10")
};
//获取歌词
export const getLyrics=(songId)=>{
  return axios.get("/lyric?id="+songId)
};
//歌曲评论
export const getSongComments=(songId,data)=>{
  return axios.get("/comment/music?id="+songId+"&limit=20"+data)
};
//歌曲详情
export const getSongInfo=(songId)=>{
  return axios.get("/song/detail?ids="+songId)
};
//专辑详情
export const getAlbumInfo=(albumId)=>{
  return axios.get("/album?id="+albumId)
};
//获取歌手专辑信息 可选参数 : limit : 返回数量 , 默认为 30
export const getArtistAlbum=(artistId)=>{
  return axios.get("/artist/album?id=6452"+artistId)
};
//获取歌手单曲信息
export const getArtist=(artistId)=>{
  return axios.get("/artists?id="+artistId)
};
//获取歌手MV信息
export const getArtistMV=(artistId)=>{
  return axios.get("/artist/mv?id="+artistId)
};
