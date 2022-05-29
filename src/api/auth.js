import http from './http'

export default {
  login(data) {
    return http({
      url: '/users/sign_in',
      method: 'post',
      data,
    })
  },
}
