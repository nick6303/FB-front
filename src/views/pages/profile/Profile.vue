<template lang="pug">
#Profile
  .title
    p 修改個人資料
  .forms
    el-radio-group(v-model="tab")
      el-radio-button(label="profile") 暱稱修改
      el-radio-button(label="passwor") 重設密碼
    .profile(v-if="tab === 'profile'" v-loading="loading")
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
      el-form(
        :rules="passwordRules"
        :model="passwordForm"
        label-position="top"
        hide-required-asterisk
      )
        el-form-item(
          prop="password"
          label="輸入新密碼"
          :rules="[{ required: true, message: '↑此項必填' },{ validator: validatePass, trigger: 'blur' }]"
        )
          el-input(
            v-model="passwordForm.password"
            show-password
            type="text"
          )
        el-form-item(
          prop="password2"
          label="再次輸入"
          :rules="[{ required: true, message: '↑此項必填' },{ validator: validatePass, trigger: 'blur' }]"
        )
          el-input(
            v-model="passwordForm.password2"
            show-password
            type="text"
          )
      el-button.submitPassword(
        :disabled=" !passwordForm.password || passwordForm.password !== passwordForm.password2 "
        @click="submitPassword"
      ) 重設密碼
</template>
<script>
import { onMounted, reactive, ref } from 'vue'
import ImgUpload from '@c/imgUpload'
import userApi from '@api/user'
import { useStore } from 'vuex'
import { getRules } from '@/utils'
import { ElMessage } from 'element-plus'

export default {
  name: 'Profile',
  components: {
    ImgUpload,
  },
  setup() {
    const store = useStore()
    const tab = ref('profile')
    const loading = ref(false)

    const profileForm = reactive({
      photo: '',
      name: '',
    })
    const profileRules = getRules(profileForm)

    const passwordForm = reactive({
      password: '',
      password2: '',
    })
    const passwordRules = getRules(passwordForm)

    const submitProfile = async () => {
      try {
        const res = await userApi.updateProfile(profileForm)
        store.dispatch('setUser', res)
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      } catch {
        // pass
      }
    }

    const getProfile = async () => {
      loading.value = true
      try {
        const res = await userApi.getProfile()
        profileForm.photo = res.photo
        profileForm.name = res.name
      } catch {
        // pass
      } finally {
        loading.value = false
      }
    }

    const updateImg = (url) => {
      profileForm.photo = url
    }

    const validatePass = (rule, value, callback) => {
      if (value.length < 8) {
        callback(new Error('密碼至少8個字'))
      } else if (
        passwordForm.password !== passwordForm.password2 &&
        passwordForm.password &&
        passwordForm.password2
      ) {
        callback(new Error('兩次輸入密碼不一致'))
      } else {
        callback()
      }
    }

    const submitPassword = async () => {
      try {
        await userApi.updatePassword(passwordForm)
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
      } catch {
        // pass
      }
    }

    onMounted(() => {
      getProfile()
    })

    return {
      tab,
      profileForm,
      submitProfile,
      updateImg,
      profileRules,
      passwordForm,
      passwordRules,
      validatePass,
      submitPassword,
      loading,
    }
  },
}
</script>
<style lang="sass" scoped>
#Profile
  width: 100%
  .title
    +title
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
      +flex-center
      flex-direction: column
      border: 2px solid #000400
      border-radius: 8px
      width: 100%
      padding: 30px 105px
      background-color: #fff
    .profile
      .preview
        +size(100px,100px)
        border-radius: 50%
        border: 2px solid #000400
        margin: 0 0 16px
        overflow: hidden
    .profile:deep(.submitProfile),
    .password:deep(.submitPassword)
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
      &.is-disabled
        background-color: #A8B0B9
        color: #fff
        box-shadow: 0px 0px 0px #000400
        border: 2px solid #808080
        cursor: not-allowed
    &:deep(.el-form)
      width: 320px
      .el-form-item__label
        height: 32px
        padding: 0 0 4px
        line-height: 28px
        font-size: 16px
        font-weight: bolder
</style>
