<template lang="pug">
#Following
  .title
    p 追蹤名單
  .user(v-for="user in followList")
    figure
      img(:src="user.photo")
    .info
      p.name {{user.name}}
      .row
        p.time 追蹤時間：{{moment(user.createdAt).format('YYYY/MM/DD HH:mm')}}
        p.day {{countDay(user.createdAt)}}
</template>
<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import userApi from '@api/user'
import moment from 'moment'

export default {
  name: 'Following',
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const followList = ref([])

    const getFollowing = async () => {
      const temps = []

      for (let i = 0; i < user.value.following.length; i++) {
        const item = user.value.following[i]
        const res = await userApi.getItemById(item.user)
        const { name, photo } = res
        temps.push({ name, photo, createdAt: item.createdAt })
      }

      followList.value = temps
    }

    const countDay = (time) => {
      return time
    }

    onMounted(() => {
      getFollowing()
    })
    return { followList, countDay, moment }
  },
}
</script>
<style lang="sass" scoped>
#Following
  .title
    position: relative
    margin: 0 0 30px
    &::before
      +fakeLine(calc(100% - 4px),calc(100% - 4px),#fff)
      position: absolute
      top: 4px
      left: -4px
      border: 2px solid #000400
    p
      +size(530px,65px)
      background-color: #fff
      border: 2px solid #000400
      position: relative
      z-index: 1
      +flex-center
      font-size: 20px
      font-weight: bolder
  .user
    display: flex
    align-items: center
    background-color: #fff
    border: 2px solid #000400
    border-radius: 8px
    padding: 20px 15px
    box-shadow: 0 3px 0 #000400
    figure
      +size(40px,40px)
      border: 1px solid #000400
      border-radius: 50%
      margin: 0 16px 0 0
    .info
      width: calc( 100% - 56px )
      .name
        font-weight: bold
        color: #000400
      .row
        display: flex
        width: 100%
        justify-content: space-between
        font-size: 14px
        .time
          color: #9B9893
        .day
          color: #000400
</style>
