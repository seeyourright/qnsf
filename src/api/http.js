import axios from 'axios'
import qs from 'qs'
// import router from '../router'
// import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  token && (config.headers.Authorization = token)
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
  return res
}, () => {

})

export default {
  post,
  get,
  axios
}
