<template lang="pug">
#Login
  .LoginBox
    figure.left
      img(src="@img/login/bgImage.jpg")
    .right
      figure.logo
        img(src="@img/login/slogan.jpg", alt="alt")
      template(
        v-if="isLogin"
      )
        p 到元宇宙展開全新社交圈
        el-form(
          :model="loginForm" 
          :rules="loginRules"
          @submit.prevent
        )
          el-form-item(
            prop="email"
          )
            el-input(
              v-model="loginForm.email"
              placeholder="Email"
            )
          el-form-item(
            prop="password"
          )
            el-input(
              v-model="loginForm.password"
              show-password
              placeholder="Password"
              autocomplete="new-password"
            )
          el-button(
            @click="login"
            :disabled="!loginForm.email || !loginForm.password"
          ) 登入
          router-link(to="/signup") 註冊帳號
      template(
        v-else
      )
        p 註冊
        el-form(
          :model="signupform" 
          :rules="signupRules"
          @submit.prevent
        )
          el-form-item(
            prop="name"
          )
            el-input(
              v-model="signupform.name"
              placeholder="暱稱"
            )
          el-form-item(
            prop="email"
          )
            el-input(
              v-model="signupform.email"
              placeholder="Email"
            )
          el-form-item(
            prop="password"
          )
            el-input(
              v-model="signupform.password"
              show-password
              placeholder="Password"
              autocomplete="new-password"
            )
          el-form-item(
            prop="password"
          )
            el-input(
              v-model="signupform.password2"
              show-password
              placeholder="Password Again"
              autocomplete="new-password"
            )
          el-button(
            @click="signup"
            :disabled="!signupform.email || !signupform.password || !signupform.password2|| !signupform.name"
          ) 註冊
          router-link(to="/login") 登入
</template>
<script>
import router from '@/router'
import { computed, reactive, ref } from 'vue'
import { getRules } from '@/utils'
import authApi from '@api/auth'

export default {
  name: 'Login',
  setup() {
    const isLogin = computed(() => router.currentRoute.value.meta.isLogin)
    const loading = ref(false)
    const loginFail = ref(false)
    const loginForm = reactive({
      email: '',
      password: '',
    })

    const loginRules = getRules(loginForm)

    const signupform = reactive({
      name: '',
      email: '',
      password: '',
      password2: '',
    })

    const signupRules = getRules(signupform)

    const login = async () => {
      loading.value = true
      try {
        await authApi.login({})
      } catch (error) {
        loginFail.value = true
        // pass
      } finally {
        loading.value = false
        loginFail.value = false
      }
    }

    return {
      isLogin,
      loginForm,
      loginRules,
      signupform,
      signupRules,
      login,
      loginFail,
    }
  },
}
</script>
<style lang="sass" scoped>
#Login
  +flex-center
  width: 100%
  min-height: 100vh
  .LoginBox
    display: flex
    padding: 130px 60px 100px 60px
    background-color: #efece7
    border: 4px solid #000400
    box-shadow: -10px 10px #c9c7c2
    .left
      margin-right: 50px
      width: 430px
    .right
      +flex-center
      flex-direction: column
      .logo
        width: 300px
      p
        font-size: 24px
        color: #000400
        font-weight: bolder
        text-align: center
        margin: 15px 0 35px
      &:deep(.el-form)
        width: 370px
        +flex-center
        flex-direction: column
        .el-form-item
          width: 100%
        .el-input__inner
          height: 50px
        .el-button
          +size(100%,50px)
          +flex-center
          border-radius: 8px
          box-shadow: -2px 2px #000400
          background-color: #03438D
          border: 2px solid #000400
          color: #fff
          font-size: 16px
          &.is-disabled
            background-color: #A8B0B9
            border: 2px solid #808080
            box-shadow: 0 0 #000400
        a
          color: #000400
          font-size: 16px
          font-weight: bolder
          margin: 16px 0 0
</style>
