<template lang="pug">
el-scrollbar#MainContain(
  always
)
  Header
  .row
    .contain
      router-view 
    SideBar
</template>
<script>
import { defineComponent } from 'vue'
import Header from '../header'
import SideBar from '../sideBar'
export default defineComponent({
  name: 'MainContain',
  components: {
    Header,
    SideBar,
  },
  setup() {
    return {}
  },
})
</script>
<style lang="sass" scoped>
#MainContain
  display: flex
  flex-direction: column
  +size(100vw,100vh)
  .row
    padding: 50px 5vw
    display: flex
    align-items: flex-start
    justify-content: center
  .contain
    width: 530px
    display: flex
    margin: 0 25px 0 0
#MainContain:deep(.is-vertical)
  .el-scrollbar__thumb
    background-color: #ccc
</style>
