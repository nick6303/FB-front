import http from './http'
import { assemblyParams } from '@/utils'

export default {
  getList(params) {
    const queryString = params ? `?${assemblyParams(params)}` : ''
    return http({
      url: `/posts${queryString}`,
      method: 'get',
    })
  },
  getItemById(id) {
    return http({
      url: `/posts/${id}`,
      method: 'get',
    })
  },
  addItem(data) {
    return http({
      url: `/posts`,
      method: 'post',
      data,
    })
  },
  update(data, id) {
    return http({
      url: `/posts/${id}`,
      method: 'patch',
      data,
    })
  },
  delete(id) {
    return http({
      url: `/posts/${id}`,
      method: 'delete',
    })
  },
  upload(data) {
    return http({
      url: '/upload/image',
      method: 'post',
      data,
    })
  },
  getUserPosts(data, id) {
    return http({
      url: `/posts/user/${id}`,
      method: 'get',
      data,
    })
  },
  like(postId) {
    return http({
      url: `/posts/${postId}/likes`,
      method: 'post',
    })
  },
  unlike(postId) {
    return http({
      url: `/posts/${postId}/likes`,
      method: 'delete',
    })
  },
}
