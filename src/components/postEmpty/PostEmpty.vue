<template lang="pug">
.empty
  .top
    span
      i
      i
      i
  .content
    p {{ routerId === user._id?  '目前尚無動態，新增一則貼文吧！': '目前尚無動態' }}
</template>

<script>
import router from '@/router'
import { useStore } from 'vuex'
import { computed } from '@vue/runtime-core'
export default {
  name: 'PostEmpty',
  setup() {
    const routerId = router.currentRoute.value.params.id
    const store = useStore()
    const user = computed(() => store.state.user)
    return { user, routerId }
  },
}
</script>
<style lang="sass" scoped>
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
