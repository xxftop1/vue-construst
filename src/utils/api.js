import axios from 'axios'
import Messsge from 'element-ui';

axios.interceptors.request.use(config => {
  if(config.url.indexOf("login") != -1){
    // config.url='/YlGeneralForm'+config.url;
    return config;
  } 
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // if (!config.headers.hasOwnProperty('Authorization') && token) {
  //   config.headers.Authorization = tokenHead + token;
  // }
  return config;
}, err => {
  Messsge.error({
    message: '请求超时!'
  });
  return Promise.resolve(err);
})
axios.interceptors.response.use(data => {
  if (data.status && data.status == 200 && data.data.status == 'error') {
    Messsge.error({
      message: data.data.msg
    });
    return;
  }
  return data;
}, err => {
  try {
    if (err.response) {
      if (err.response.status == 504 || err.response.status == 404) {
        Messsge.error('服务器异常,请联系管理员!');
      } else if (err.response.status == 403) {
        Messsge.error('权限不足,请联系管理员!');
      } else if (err.response.status == 401) {
          Messsge.error('token已过期!');
          window.top.location.href = location.origin+"/";
          return;
        }
    } else {
      window.top.location.href = location.origin+"/";
      return;
    }
  } catch (e) {
    window.top.location.href = location.origin+"/";
  }
  return Promise.resolve(err);
})

//后端请求地址
let base = 'http://yangyangpiao.natapp1.cc';

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params
  });
}
export const uploadFileRequest = (url, formData) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
export const deleteRequest = (url, params) => {
  return axios({
    method: 'delete',
    params: params,
    url: `${base}${url}`
  });
}
export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    params: params,
    url: `${base}${url}`
  });
}