<template lang="pug">
#Post(v-loading="loading")
  el-form(
    :model="formData"
    inline
  )
    el-form-item
      el-select(
        v-model="formData.asc"
      )
        el-option(
          value="asc"
          label="最新貼文"
        )
        el-option(
          value=""
          label="由舊到新"
        )
    el-form-item
      el-input.keyword(
        v-model="formData.keyword"
        placeholder="搜尋貼文"
      )
        template(#append)
          el-button(icon="el-icon-search")
  .posts(v-if="postList.length !== 0")
    .post(
      v-for="item in postList"
    )
      .user
        figure
          img(:src="item.user.photo", alt="alt")
        .info
          p {{item.user.name}}
          span {{item.updatedAt}}
      .content
        p {{item.content}}
        figure(v-if="item.image")
          img(:src="item.image", alt="alt")
  .empty(
    v-else 
  )
    .top
      span
        i
        i
        i
    .content
      p 目前尚無動態，新增一則貼文吧！
</template>
<script>
import { defineComponent, ref, onMounted, reactive } from 'vue'
import postApi from '@api/post'

export default defineComponent({
  name: 'Post',
  setup() {
    const formData = reactive({
      asc: 'asc',
      keyword: '',
    })
    const loading = ref(false)
    const postList = ref([])
    const getPostList = async () => {
      try {
        loading.value = true
        const res = await postApi.getList(formData)
        postList.value = res.data.data
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
    .post
      padding: 24px
      border: 2px solid #000400
      border-radius: 8px
      background: #FFFFFF 0% 0% no-repeat padding-box
      box-shadow: 0px 3px 0px #000400
      &:not(:last-child)
        margin: 0 0 16px
      .user
        display: flex
        justify-content: flex-start
        margin: 0 0 16px
        figure
          +size(45px,45px)
          margin: 0 16px 0 0
          border-radius: 50%
          overflow: hidden
        .info
          height: 100%
          p
            font-weight: bold
            font-size: 16px
            line-height: 24px
            letter-spacing: 0px
            color: #000400
          span
            font-size: 12px
            line-height: 20px
            letter-spacing: 0px
            color: #9B9893
      .content
        width: 100%
        display: flex
        flex-direction: column
        align-items: flex-start
        p
          font-size: 16px
          line-height: 24px
          letter-spacing: 0px
          color: #000400
        figure
          border: 2px solid #000400
          border-radius: 8px
          box-sizing: border-box
          overflow: hidden
          margin: 16px 0 0
          img
            max-width: 100%
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
