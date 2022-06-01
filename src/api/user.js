import http from './http'

export default {
  getList() {
    return http({
      url: '/users',
      method: 'get',
    })
  },
  getItemById(id) {
    return http({
      url: `/users/${id}`,
      method: 'get',
    })
  },
  addItem(data) {
    return http({
      url: '/users/sign_up',
      method: 'post',
      data,
    })
  },
  update(data, id) {
    return http({
      url: `/users/${id}`,
      method: 'patch',
      data,
    })
  },
  delete(id) {
    return http({
      url: `/users/${id}`,
      method: 'delete',
    })
  },
  updateProfile(data) {
    return http({
      url: '/users/profile',
      method: 'patch',
      data,
    })
  },
  getProfile() {
    return http({
      url: '/users/profile',
      method: 'get',
    })
  },
  updatePassword(data) {
    return http({
      url: '/users/updatePassword',
      method: 'post',
      data,
    })
  },
  followed(userId) {
    return http({
      url: `/users/${userId}/follow`,
      method: 'post',
    })
  },
  unfollowed(userId) {
    return http({
      url: `/users/${userId}/follow`,
      method: 'delete',
    })
  },
}
