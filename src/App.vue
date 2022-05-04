<template lang="pug">
router-view 
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
import userApi from '@api/user'

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore()
    const login = async () => {
      const res = await userApi.getItemById('626e404636dc947768296a63')
      const { photo, name, _id } = res.data.data
      store.dispatch('setUser', { name, photo, _id })
    }
    onMounted(() => {
      login()
    })
    return {}
  },
})
</script>
