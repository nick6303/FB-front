<template lang="pug">
.post
  router-link.user(:to="`/posts/${data.user._id}`")
    figure
      img(:src="data.user.photo", alt="alt")
    .info
      p {{data.user.name}}
      span {{moment(data.updatedAt).format('YYYY/MM/DD HH:mm')}}
  .content
    p {{data.content}}
    figure(v-if="data.image")
      img(:src="data.image", alt="alt")
  el-button.toggleLike(
    :class="isLike?'like':''"
    @click="toggleLike"
  )
    i.icon-thumbup
    p(v-if="data.likes.length > 0") {{data.likes.length}}
    p.first(v-else) 成為第一個按讚的朋友
  .comments
    .addComment
      figure
        img(:src="user.photo", alt="alt")
      el-input(
        v-model="newComment"
        size="small"
      )
        template(#append)
          el-button(@click="addComment") 留言
    .comment(
      v-for="item in data.comments"
    )
      .info
        router-link.figure(:to="`/posts/${item.user._id}`")
          img(:src="item.user.photo", alt="alt")
        div
          router-link.name(:to="`/posts/${item.user._id}`") {{item.user.name}}
          .time {{moment(item.updatedAt).format('YYYY/MM/DD HH:mm')}}
          p {{item.content}}

</template>
<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import postApi from '@api/post'
import moment from 'moment'

export default {
  name: 'PostItem',
  props: {
    data: Object,
  },
  setup(props, { emit }) {
    const store = useStore()
    const data = computed(() => (props ? props.data : {}))
    const user = computed(() => store.state.user)
    const isLike = computed(() => {
      const isLike = data.value.likes.findIndex(
        (item) => item === user.value._id
      )
      return isLike > -1
    })
    const newComment = ref('')

    const toggleLike = async () => {
      try {
        const api = isLike.value ? postApi.unlike : postApi.like
        await api(data.value._id)
        emit('refresh')
      } catch {
        // pass
      }
    }

    const addComment = async () => {
      if (!newComment.value) {
        return
      }
      try {
        await postApi.addComment(
          {
            content: newComment.value,
          },
          data.value._id
        )
        emit('refresh')
      } catch {
        // pass
      }
    }

    return { toggleLike, isLike, newComment, user, addComment, moment }
  },
}
</script>
<style lang="sass" scoped>
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
      +avator(45px)
      margin: 0 16px 0 0
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
  &:deep(.toggleLike)
    background-color: transparent
    border: none
    padding: 0
    margin: 20px 0 16px
    min-height: auto
    &.like
      i
        color: #03438D
      p
        color: #000400
    span
      display: flex
    i
      font-size: 20px
      color: #9B9893
      font-weight: bolder
    p
      font-size: 16px
      color: #000400
      margin: 0 0 0 8px
      &.first
        color: #9B9893
  .comments
    .addComment
      display: flex
      align-items: center
      margin: 0 0 18px
      figure
        +avator
        margin: 0 8px 0 0
      &:deep(.el-input)
        width: calc(100% - 50px)
        display: flex
        .el-input__inner
          width: calc(100% - 130px)
          border: 2px solid #000400
          height: 36px
          min-height: auto
          border-radius: 0px
        .el-input-group__append
          +size(130px,36px)
          background-color: #03438D
          border-width: 2px 2px 2px 0
          border-color: #000400
          border-style: solid
          padding: 0
          border-top-right-radius: 0
          border-bottom-right-radius: 0
          .el-button
            margin: 0
            padding: 0
            min-height: auto
            +size(100%,100%)
            +flex-center
            color: #fff
            font-size: 16px
    .comment
      padding: 18px 16px 16px
      background-color: #EFECE7
      border-radius: 12px
      &:not(:last-child)
        margin: 0 0 16px
      .info
        display: flex
      .figure
        +avator
        margin: 0 12px 0 0
      .name
        color: #000400
        font-weight: bolder
        font-size: 16px
        line-height: 1.5
      .time
        font-size: 12px
        color: #9B9893
      p
        margin: 8px 0 0
</style>
