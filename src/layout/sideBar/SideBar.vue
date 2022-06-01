<template lang="pug">
#SideBar  
  router-link.addPost(to="/addPost") 張貼動態
  ul
    li
      a
        figure
          img(:src="user.photo")
        p {{user.name}}
    li
      router-link(to="/following") 
        figure
          i.el-icon-bell
        p 追蹤名單
    li
      a
        figure 
          i.icon-thumbup
        p 我按的讚
</template>
<script>
import { computed, defineComponent } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'SideBar',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    return { user }
  },
})
</script>
<style lang="sass" scoped>
#SideBar
  width: 310px
  background-color: #fff
  border: 2px solid #000400
  padding: 30px 24px 0
  .addPost
    +size(260px,55px)
    background-color: #03438D
    box-shadow: -2px 2px 0px #000400
    border: 2px solid #000400
    border-radius: 8px
    +flex-center
    color: #fff
    font-size: 16px
    font-weight: bold
    margin: 0 0 25px
    cursor: pointer
    transition: all .4s ease
    &:hover
      background-color: #EEC32A
      color: #000400
  ul
    li
      margin-bottom: 20px
      a
        display: flex
        align-items: center
        justify-content: flex-start
        cursor: pointer
        &:hover
          figure
            background-color: #03438D
            color: #fff
          p
            color: #03438D
      figure
        +size(50px,50px)
        border-radius: 50%
        overflow: hidden
        margin: 0 15px 0 0
        border: 2px solid #000400
        background-color: #E2EDFA
        color: #000400
        +flex-center
        font-size: 20px
        transition: all .4s ease
        i
          font-style: normal
          font-weight: bold
      p
        font-weight: bold
        font-size: 16px
        line-height: 24px
        transition: all .4s ease
        color: #000400
</style>
