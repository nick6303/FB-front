<template lang="pug">
#AddPost
  .title
    p 張貼動態
  el-form(
    ref="elfrom"
    :model="formData" 
    label-position="top"
    :rules="rules"
    @submit.prevent
  )
    el-form-item(
      label="貼文內容"
      prop="content"
    )
      el-input(
        v-model="formData.content"
        type="textarea"
        resize="none"
      )
    el-form-item
      ImgUpload(
        @change="uploadImg"
      )
      figure(
        v-if="formData.image"
      )
        el-button(
          type="danger"
          icon="el-icon-close"
          size="mini"
          @click="clearImage"
        )
        img(:src="formData.image", alt="alt")
    el-button.submit(
      @click="validate"
    ) 送出貼文
</template>
<script>
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import postApi from '@api/post'
import { getRules } from '@/utils'
import router from '@/router'
import ImgUpload from '@c/imgUpload'

export default defineComponent({
  name: 'AddPost',
  components: {
    ImgUpload,
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.state.user)
    const formData = reactive({
      content: '',
      image: '',
    })
    const elfrom = ref(null)

    const rules = getRules(formData)

    const validate = () => {
      elfrom.value.validate((valid) => {
        if (valid) {
          submit()
        } else {
          return false
        }
      })
    }

    const submit = async () => {
      const params = {
        user: user.value._id,
        content: formData.content,
        image: formData.image,
      }
      try {
        await postApi.addItem(params)
        ElMessage({
          type: 'success',
          message: '貼文新增完成',
        })
        router.push({ path: '/' })
      } catch (error) {
        ElMessage({
          type: 'error',
          message: '新增失敗',
        })
      }
    }

    const clearImage = () => {
      formData.image = ''
    }

    const uploadImg = (url) => {
      formData.image = url
    }

    return {
      formData,
      submit,
      clearImage,
      elfrom,
      validate,
      rules,
      uploadImg,
    }
  },
})
</script>
<style lang="sass" scoped>
#AddPost
  width: 100%
  .title
    position: relative
    width: 100%
    &:before
      position: absolute
      top: 4px
      right: 4px
      +fakeLine(100%,100%,#FFFFFF)
      background-color: #fff
      border: 2px solid #000400
      z-index: 0
      box-sizing: border-box
    p
      +size(100%,64px)
      background-color: #fff
      border: 2px solid #000400
      +flex-center
      z-index: 1
      position: relative
      letter-spacing: 0px
      font-size: 20px
      font-weight: bold
      color: #000400
  &:deep(.el-form)
    background-color: #fff
    box-shadow: 0px 3px 0px #000400
    border: 2px solid #000400
    border-radius: 8px
    margin: 20px 0 0
    padding: 32px
    .el-form-item__label
      font-size: 16px
      line-height: 24px
      letter-spacing: 0px
      color: #000400
      padding: 0 0 5px
    .el-textarea__inner
      border: 2px solid #000400
      border-radius: 0
      +size(470px,170px)

    figure
      margin: 16px 0 32px
      border: 2px solid #000400
      border-radius: 8px
      overflow: hidden
      display: block
      position: relative
      .el-button
        position: absolute
        top: 0
        right: 0
        padding: 0
        +size(30px,30px)
    .submit
      margin: 0 auto
      background-color: #A8B0B9
      border: 2px solid #000400
      border-radius: 8px
      +flex-center
      +size(320px,55px)
      span
        font-size: 16px
        font-weight: bold
        line-height: 19px
        color: #000400
</style>
