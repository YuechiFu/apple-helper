const axios = require('axios');
const log = require('./log');
const BASE_URL = 'https://www.apple.com.cn';

// create an axios instance
const service = axios.create({
  baseURL: BASE_URL,
  timeout: 3000
})


// response interceptor
service.interceptors.response.use(
  async res => {
      if (res.data?.body?.content) {
          return res.data.body.content
      } else {
          return Promise.reject(res.data ? res.data : new Error());
      }
  },
  error => {
      console.log('err' + error) // for debug
      return Promise.reject(error)
  }
)


module.exports = service;




  