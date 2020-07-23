import axios from 'axios'
import qs from 'qs'
import router from '../router'
import {Message} from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  token && !config.headers.Authorization && (config.headers.Authorization = token)
  return config
})

const get = (url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {params, ...config}).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

const qsOption = {
  indices: false
}

const post = (url, params, config) => {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params, qsOption), config).then(res => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

axios.interceptors.response.use(res => {
  if (res.data.code && res.data.code !== 200 && res.data.code !== 203) {
    Message.error(res.data.msg)
  }
  if (res.data.code && res.data.code === 412) {
    router.push('/login')
  }
  return res
}, (err) => {
  if (err.response && err.response.data.error === 'invalid_token') {
    router.push('/login')
  }
})

export default {
  post,
  get,
  axios
}
