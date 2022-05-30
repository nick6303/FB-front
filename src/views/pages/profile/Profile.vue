<template lang="pug">
#Profile
  .title
    p 修改個人資料
  .forms
    el-radio-group(v-model="tab")
      el-radio-button(label="profile") 暱稱修改
      el-radio-button(label="passwor") 重設密碼
    .profile(v-if="tab === 'profile'")
      figure.preview
        img(:src="profileForm.photo")
      ImgUpload(
        btnText="上傳大頭照"
        @change="updateImg"
      )
      el-form(
        :rules="profileRules"
        :model="profileForm"
        label-position="top"
      )
        el-form-item(
          label="暱稱"
        )
          el-input(
            v-model="profileForm.name"
          )
      el-button.submitProfile(
        @click="submitProfile"
      ) 送出更新
    .password(v-else)
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import ImgUpload from '@c/imgUpload'
import userApi from '@api/user'
import { useStore } from 'vuex'
import { getRules } from '@/utils'

export default {
  name: 'Profile',
  components: {
    ImgUpload,
  },
  setup() {
    const store = useStore()
    const tab = ref('profile')
    const profileForm = reactive({
      photo: '',
      name: '',
    })

    const profileRules = getRules(profileForm)

    const submitProfile = async () => {
      const res = await userApi.updateProfile(profileForm)
      store.dispatch('setUser', res)
    }

    const getProfile = async () => {
      const res = await userApi.getProfile()
      profileForm.photo = res.photo
      profileForm.name = res.name
    }

    const updateImg = (url) => {
      profileForm.photo = url
    }

    onMounted(() => {
      getProfile()
    })

    return { tab, profileForm, submitProfile, updateImg, profileRules }
  },
}
</script>
<style lang="sass" scoped>
#Profile
  width: 100%
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
  &:deep(.el-radio-group)
    margin: 0 0 0 15px
    .el-radio-button__inner
      border-radius: 8px 8px 0 0
      font-size: 16px
      padding: 10px 20px
      border: solid #000400
      border-width: 2px 2px 0 2px
      font-weight: bolder
    .el-radio-button__orig-radio:checked+.el-radio-button__inner
      background-color: #000400
  .forms
    width: 100%
    .profile,.password
      border: 2px solid #000400
      border-radius: 8px
      width: 100%
      padding: 30px 105px
      background-color: #fff
    .profile
      +flex-center
      flex-direction: column
      .preview
        +size(100px,100px)
        border-radius: 50%
        border: 2px solid #000400
        margin: 0 0 16px
      &:deep(.submitProfile)
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
    &:deep(.el-form)
      width: 320px
      .el-form-item__label
        height: 32px
        padding: 0 0 4px
        line-height: 28px
        font-size: 16px
        font-weight: bolder
</style>
