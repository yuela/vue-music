import axios from 'axios'


// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers:{
    // 'Access-Control-Allow-Origin':'*',
    'Content-Type': 'application/x-www-form-urlencoded',
    // 'Cookie':'appver=2.0.2',
    // 'Referer':'http://music.163.com',
  }
});

// respone拦截器
service.interceptors.response.use(response => {
  return response
}, error => {
  console.log('err' + error);
  return Promise.reject(error);
});
export default service;
