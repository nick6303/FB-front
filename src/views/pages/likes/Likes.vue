<template lang="pug">
#Likes
  .title
    p 我按讚的貼文
  .like(
    v-for="item in likesList"
  )

</template>
<script>
import { onMounted, ref } from 'vue'
import userApi from '@api/user'

export default {
  name: 'Likes',
  setup() {
    const likesList = ref([])
    const getLikeList = async () => {
      try {
        likesList.value = await userApi.getLikeList()
        console.log(likesList.value)
      } catch {
        // pass
      }
    }

    onMounted(() => {
      getLikeList()
    })
    return {
      likesList,
    }
  },
}
</script>
<style lang="sass" scoped>
#Likes
  .title
    +title
</style>
