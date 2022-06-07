<template lang="pug">
.post
  router-link.user(:to="`/posts/${data.user._id}`")
    figure
      img(:src="data.user.photo", alt="alt")
    .info
      p {{data.user.name}}
      span {{data.updatedAt}}
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

</template>
<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'
import postApi from '@api/post'

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

    const toggleLike = async () => {
      try {
        const api = isLike.value ? postApi.unlike : postApi.like
        await api(data.value._id)
        emit('refresh')
      } catch {
        // pass
      }
    }
    return { toggleLike, isLike }
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
  &:deep(.toggleLike)
    background-color: transparent
    border: none
    padding: 0
    margin: 20px 0 0
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
</style>
