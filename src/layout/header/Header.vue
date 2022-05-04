<template lang="pug">
header#Header
  .row
    router-link.logo(to="/") MetaWall
    .userInfo
      figure.avator
        img(:src="user.photo")
      p {{user.name}}
</template>

<script>
import { computed } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  name: '',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    return { user }
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
