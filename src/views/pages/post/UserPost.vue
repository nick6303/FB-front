<template lang="pug">
#Post
  .userInfoBox
    .userInfo
      figure
        img(:src="pageOwner.photo")
      .info
        p.name {{pageOwner.name}}
        p.followers {{pageOwner.followers.length}}人追蹤
      el-button(
        v-if="user._id !== pageOwner._id"
        @click="toggleFollow"
        :class="isFollowed ? 'isFollowed':''"
      ) {{isFollowed ? '取消追蹤':'追蹤'}}
  el-form(
    :model="formData"
    inline
  )
    el-form-item
      el-select(
        v-model="formData.asc"
        @change="getPostList"
      )
        el-option(
          value=""
          label="最新貼文"
        )
        el-option(
          value="asc"
          label="由舊到新"
        )
    el-form-item
      el-input.keyword(
        v-model="formData.keyword"
        placeholder="搜尋貼文"
        @keyup.enter="getPostList"
      )
        template(#append)
          el-button(
            icon="el-icon-search" 
            @click="getPostList"
          )
  .posts(v-loading="loading")
    template(v-if="postList.length !== 0")
      PostItem(
        v-for="item in postList"
        :data="item"
      )
    PostEmpty(
      v-else
    )
</template>
<script>
import { defineComponent, ref, onMounted, reactive, computed, watch } from 'vue'
import postApi from '@api/post'
import userApi from '@api/user'
import router from '@/router'
import { useStore } from 'vuex'
import PostItem from '@c/postItem'
import PostEmpty from '@c/postEmpty'

export default defineComponent({
  name: 'UserPost',
  components: {
    PostItem,
    PostEmpty,
  },
  setup() {
    const store = useStore()
    const routerId = computed(() => router.currentRoute.value.params.id)
    const postId = computed(() => router.currentRoute.value.query.postId)
    const user = computed(() => store.state.user)

    const pageOwner = reactive({
      _id: '',
      photo: '',
      name: '',
      followers: [],
    })

    const formData = reactive({
      asc: '',
      keyword: '',
    })

    const loading = ref(false)
    const postList = ref([])
    const isFollowed = computed(
      () =>
        user.value.following.findIndex((item) => item.user === pageOwner._id) >
        -1
    )
    const getPostList = async () => {
      try {
        loading.value = true
        let res
        if (postId.value) {
          res = await postApi.getItemById(postId.value)
          postList.value = [res]
        } else {
          res = await postApi.getUserPosts(
            { q: formData.keyword, timeSort: formData.asc },
            routerId.value
          )
          postList.value = res
        }
      } catch {
        // pass
      } finally {
        loading.value = false
      }
    }
    const getUser = async () => {
      const res = await userApi.getItemById(routerId.value)
      Object.keys(pageOwner).forEach((key) => {
        if (res[key]) {
          pageOwner[key] = res[key]
        }
      })
    }

    const toggleFollow = async () => {
      let api = isFollowed.value ? userApi.unfollowed : userApi.followed
      try {
        await api(pageOwner._id)
        const res = await userApi.getProfile()
        store.dispatch('setUser', res)
        getUser()
      } catch {
        // pass
      }
    }

    watch(routerId, () => {
      if (router.currentRoute.value.name === 'UserPost') {
        getPostList()
        getUser()
      }
    })

    onMounted(() => {
      getPostList()
      getUser()
    })

    return {
      getPostList,
      formData,
      postList,
      loading,
      pageOwner,
      user,
      isFollowed,
      toggleFollow,
    }
  },
})
</script>

<style lang="sass" scoped>
#Post:deep(.el-form)
  display: flex
  align-items: center
  margin: 0 0 16px
  .el-form-item
    margin-bottom: 0
    &:last-child
      margin-right: 0
  .el-select
    width: 155px
    .el-input__icon
      color: #000400
      font-weight: bold
  .el-input__inner
    border: 2px solid #000400
    border-radius: 0
    height: 45px
  .keyword
    width: 365px
    .el-input-group__append
      padding: 0
      height: 45px
      width: 45px
      border-width: 2px 2px 2px 0
      border-style: solid
      border-color: #000400
      background-color: #03438D
      font-size: 20px
      color: #fff
    .el-button
      padding: 0
      margin: 0
      +flex-center
      +size(100%,100%)
#Post
  .userInfoBox
    position: relative
    &::before
      +fakeLine(calc(100% - 4px), calc(100% - 4px),#fff)
      border: 2px solid #000400
      border-radius: 8px
      position: absolute
      top: 5px
      left: -5px
      z-index: 0
  .userInfo
    border-radius: 8px
    display: flex
    align-items: center
    border: 2px solid #000400
    overflow: hidden
    padding: 0 16px 0 0
    margin: 0 0 16px
    background-color: #fff
    position: relative
    z-index: 1
    height: 80px
    figure
      +size(80px,80px)
      border-right: 2px solid #000400
    .info
      margin: 0 0 0 16px
      font-size: 16px
      .name
        font-weight: bolder
    &:deep(.el-button)
      +size(95px,35px)
      background-color: #EEC32A
      border: 2px solid #000400
      border-radius: 8px
      color: #000400
      font-weight: bolder
      font-size: 15px
      padding: 0
      +flex-center
      min-height: auto
      margin: 0 0 0 auto
      box-shadow: 0 2px 0 #000400
      &.isFollowed
        background-color: #EFECE7
  .posts
    width: 100%
  .empty
    background: #FFFFFF 0% 0% no-repeat padding-box
    box-shadow: 0px 3px 0px #000400
    border: 2px solid #000400
    border-radius: 8px
    .top
      height: 45px
      display: flex
      align-items: center
      justify-content: flex-start
      padding: 0 16px
      border-bottom: 2px solid #000400
      span
        display: flex
        align-items: center
        i
          +size(9px,9px)
          display: block
          border-radius: 50%
          border: 1px solid #707070
          margin: 0 6px 0 0
          &:nth-child(1)
            background-color: red
          &:nth-child(2)
            background-color: orange
          &:nth-child(3)
            background-color: green
    .content
      padding: 30px 0
      +flex-center
      p
        font-size: 16px
        line-height: 24px
        letter-spacing: 0px
        color: #9B9893
</style>
