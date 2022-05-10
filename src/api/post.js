import axios from 'axios'
const baseUrl = process.env.VUE_APP_API_URL
import { assemblyParams } from '@/utils'

export default {
  getList(params) {
    const queryString = params ? `?${assemblyParams(params)}` : ''
    return axios.get(`${baseUrl}/post${queryString}`)
  },
  getItemById(id) {
    return axios.get(`${baseUrl}/post/${id}`)
  },
  addItem(data) {
    return axios.post(`${baseUrl}/post`, data)
  },
  update(data, id) {
    return axios.patch(`${baseUrl}/post/${id}`, data)
  },
  delete(id) {
    return axios.delete(`${baseUrl}/post/${id}`)
  },
  upload(data) {
    return axios.post(`${baseUrl}/post/upload`, data)
  },
}
