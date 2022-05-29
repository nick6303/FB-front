import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
})

axios.defaults.withCredentials = true

http.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token')
    if (
      access_token &&
      access_token !== '' &&
      !config.headers.withOutAuthorization
    ) {
      config.headers['Authorization'] = 'Bearer ' + access_token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      ElMessage(response.data.message)
    }
    return response.data.data
  },
  async (error) => {
    const { response } = error
    const errorMsg = {
      message: response.data.message,
      type: 'error',
      duration: 3000,
      showClose: true,
    }
    switch (response.status) {
      case 400:
        errorMsg.message = JSON.stringify(response.data)
        break
      case 401:
        localStorage.clear()
        router.push({ path: '/login' })
        break
      case 403:
        localStorage.clear()
        router.push({ path: '/login' })
        break
      default:
        break
    }

    if (errorMsg.message) {
      ElMessage(errorMsg)
    }
    const parse = JSON.stringify({ status: response.status })
    return Promise.reject(new Error(parse), response)
  }
)

export default http
