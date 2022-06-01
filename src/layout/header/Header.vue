<template lang="pug">
header#Header
  .row
    router-link.logo(to="/") MetaWall
    el-popover(
      placement="bottom" 
      v-model:visible="visible" 
      popper-class="menu"
      :show-arrow="false"
      :width="184"
      :offset="5"
    )
      template(#reference)
        button.userInfo
          figure.avator
            img(:src="user.photo")
          p {{user.name}}
      
      button(@click="toMyPost") 我的貼文牆
      router-link(to="/profile") 修改個人資料
      button(@click="logout") 登出
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import router from '@/router'

export default {
  name: '',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const visible = ref(false)
    const logout = () => {
      localStorage.clear()
      store.dispatch('setUser', {
        name: '',
        photo: '',
        _id: '',
        followers: [],
        following: [],
      })
      router.push({ path: '/login' })
    }
    const toMyPost = () => {
      router.push({ path: `/posts/${user.value._id}` })
    }
    return { user, logout, visible, toMyPost }
  },
}
</script>

<style lang="sass" scoped>
#Header
  width: 100%
  +flex-center
  height: 60px
  border-bottom: 3px solid #000400
  .row
    width: 860px
    display: flex
    justify-content: space-between
    align-items: center
    .logo
      font-weight: bold
      font-size: 26px
      line-height: 36px
      letter-spacing: 0px
      color: #000400
    .userInfo
      display: flex
      align-items: center
      cursor: pointer
      border: none
      .avator
        +size(30px,30px)
        border: 2px solid #000400
        border-radius: 50%
        margin-right: 5px
        overflow: hidden
        img
          width: 100%
      p
        font-size: 16px
        line-height: 1
        font-weight: bold
        color: #000400
        border-bottom: 2px solid #000400
        padding-bottom: 5px
</style>
<style lang="sass">
.menu
  padding: 0 !important
  background-color: transparent !important
  display: flex
  flex-direction: column
  box-sizing: border-box
  border: none !important
  box-shadow: none !important
  position: relative
  &:before
    +fakeLine(calc(100% - 4px),calc(100% - 4px),#fff)
    border: 2px solid #000400
    position: absolute
    top: 7px
    left: 2px
    z-index: 0
  a,button
    +size(180px,40px)
    +flex-center
    position: relative
    z-index: 1
    border-left: 2px solid #000400
    border-right: 2px solid #000400
    border-top: 1px solid #000400
    border-bottom: 1px solid #000400
    background-color: #fff
    font-size: 16px
    color: #000400
    font-weight: bolder
    box-sizing: border-box
    margin: 0
    transition: all .4s ease
    &:first-child
      border-top: 2px solid #000400
    &:last-child
      border-bottom: 2px solid #000400
    &:hover
      background-color: #EFECE7
</style>
