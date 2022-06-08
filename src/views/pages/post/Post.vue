<template lang="pug">
#Post
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
        v-for="(item,index) in postList"
        :data="item"
        @refresh="refreshPost(item.id,index)"
      )
    PostEmpty(v-else)
</template>
<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import postApi from '@api/post'
import PostItem from '@c/postItem'
import PostEmpty from '@c/postEmpty'

export default defineComponent({
  name: 'Post',
  components: {
    PostItem,
    PostEmpty,
  },
  setup() {
    const formData = reactive({
      asc: '',
      keyword: '',
    })
    const loading = ref(false)
    const postList = ref([])

    const refreshPost = async (id, index) => {
      const res = await postApi.getItemById(id)
      postList.value[index] = res
    }

    const getPostList = async () => {
      try {
        loading.value = true
        const res = await postApi.getList({
          q: formData.keyword,
          timeSort: formData.asc,
        })
        postList.value = res
      } catch {
        // pass
      } finally {
        loading.value = false
      }
    }

    onMounted(() => {
      getPostList()
    })
    return {
      getPostList,
      formData,
      postList,
      loading,
      refreshPost,
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
  .posts
    width: 100%
</style>
