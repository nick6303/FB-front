import axios from 'axios'
const baseUrl = process.env.VUE_APP_API_URL

export default {
  getList() {
    return axios.get(`${baseUrl}/user`)
  },
  getItemById(id) {
    return axios.get(`${baseUrl}/user/${id}`)
  },
  addItem(data) {
    return axios.post(`${baseUrl}/user`, data)
  },
  update(data, id) {
    return axios.patch(`${baseUrl}/user/${id}`, data)
  },
  delete(id) {
    return axios.delete(`${baseUrl}/user/${id}`)
  },
}
