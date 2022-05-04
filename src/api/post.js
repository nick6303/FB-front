import axios from 'axios'
const baseUrl = process.env.VUE_APP_API_URL

export default {
  getList() {
    return axios.get(`${baseUrl}/post`)
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
}
