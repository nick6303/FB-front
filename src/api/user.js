import http from './http'

export default {
  getList() {
    return http({
      url: '/user',
      method: 'get',
    })
  },
  getItemById(id) {
    return http({
      url: `/user/${id}`,
      method: 'get',
    })
  },
  addItem(data) {
    return http({
      url: '/user',
      method: 'post',
      data,
    })
  },
  update(data, id) {
    return http({
      url: `/user/${id}`,
      method: 'patch',
      data,
    })
  },
  delete(id) {
    return http({
      url: `/user/${id}`,
      method: 'delete',
    })
  },
}
