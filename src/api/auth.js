import http from './http'

export default {
  login(data) {
    return http({
      url: '/users/sign_in',
      method: 'post',
      headers: {
        withOutAuthorization: true,
      },
      data,
    })
  },
  signup(data) {
    return http({
      url: '/users/sign_up',
      method: 'post',
      headers: {
        withOutAuthorization: true,
      },
      data,
    })
  },
}
