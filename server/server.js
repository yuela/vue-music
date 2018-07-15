const http = require('http');
const fs = require('fs');
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const app = express();
const router = express.Router();
const Base64=require('js-base64');
// import Base64 from 'js-base64'

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
//提供静态文件服务
app.use(express.static(__dirname));
app.use(bodyParser.json()); // for parsing application/json

app.get('/getLrc',function(req,res){
    let songId = req.query.songId;
    let url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg?callback=MusicJsonCallback_lrc&pcachetime=1494070301711&songmid='+songId+'&g_tk=5381&jsonpCallback=MusicJsonCallback_lrc&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8¬ice=0&platform=yqq&needNewCode=0';
    let options = {
        url: url,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.110 Safari/537.36",
            "Accept": "*/*",
            "Referer": "https://y.qq.com/portal/player.html",
            "Accept-Language": "zh-CN,zh;q=0.8",
            "Cookie": "pgv_pvid=8455821612; ts_uid=1596880404; pgv_pvi=9708980224; yq_index=0; pgv_si=s3191448576; pgv_info=ssid=s8059271672; ts_refer=ADTAGmyqq; yq_playdata=s; ts_last=y.qq.com/portal/player.html; yqq_stat=0; yq_playschange=0; player_exist=1; qqmusic_fromtag=66; yplayer_open=1",
            "Host": "c.y.qq.com",
        }
    };
    request(options,(error, response, body)=>{
        if(!error && response.statusCode == 200){

          eval(body);//把获取的字符串放进去,通过eval再次执行一次代码
          console.log(body);
          //创建一个函数MusicJsonCallback_lrc
          function MusicJsonCallback_lrc(body){
            let lyric = Base64.Base64.decode(body.lyric);
            res.json(lyric);
          }
        }else{
            res.json({success:false})
        }
    });

});

app.listen(3000,function () {
    console.log('连接成功');
});


