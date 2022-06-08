<template lang="pug">
#Likes
  .title
    p 我按讚的貼文
  .likes(v-loading="loading")
    .like(
      v-for="item in likesList"
    )
      router-link.figure(:to="`/posts/${item.user._id}`")
        img(:src="item.user.photo" alt="")
      .info
        router-link.name(:to="`/posts/${item.user._id}`") {{item.user.name}}
        .time 發文時間：{{moment(item.updatedAt).format('YYYY/MM/DD HH:mm')}}
      .btns
        el-button(type="text" @click="unLike(item._id)")
          i.icon-thumbup
          | 取消
        el-button(type="text" @click="check(item.user._id,item._id)")
          i.el-icon-right
          | 查看
</template>
<script>
import { onMounted, ref } from 'vue'
import userApi from '@api/user'
import moment from 'moment'
import postApi from '@api/post'
import router from '@/router'

export default {
  name: 'Likes',
  setup() {
    const loading = ref(false)
    const likesList = ref([])
    const getLikeList = async () => {
      loading.value = true
      try {
        const res = await userApi.getLikeList()
        likesList.value = res.likeList
        console.log(likesList.value)
      } catch {
        // pass
      } finally {
        loading.value = false
      }
    }

    const unLike = async (id) => {
      try {
        await postApi.unlike(id)
        getLikeList()
      } catch {
        // pass
      }
    }

    const check = (userId, postId) => {
      router.push({ path: `/posts/${userId}`, query: { postId } })
    }

    onMounted(() => {
      getLikeList()
    })
    return {
      loading,
      likesList,
      moment,
      unLike,
      check,
    }
  },
}
</script>
<style lang="sass" scoped>
#Likes
  .title
    +title
  .like
    border: 2px solid #000400
    border-radius: 8px
    background: #FFFFFF 0% 0% no-repeat padding-box
    box-shadow: 0px 3px 0px #000400
    display: flex
    align-items: center
    padding: 18px 40px 18px 16px
    &:not(:last-child)
      margin: 0 0 20px
    .figure
      +avator
    .info
      margin: 0 auto 0 16px
      .name
        font-size: 16px
        font-weight: bolder
        color: #000400
        line-height: 1.5
      .time
        font-size: 14px
        color: #9B9893
    .btns
      display: flex
      &:deep(.el-button)
        padding: 0
        border: none
        &:not(:last-child)
          margin: 0 25px 0 0
        span
          +flex-center
          flex-direction: column
          font-size: 14px
          font-weight: bolder
          line-height: 1.2
          color: #000400
        .icon-thumbup
          font-size: 20px
          color: #03438D
          font-weight: bolder
          margin: 0 0 5px
        .el-icon-right
          +size(20px,20px)
          +flex-center
          border-radius: 50%
          font-weight: bolder
          border: 2px solid #000400
          font-size: 12px
          color: #000400
          margin: 0 0 5px
</style>
