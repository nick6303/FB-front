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
      el-upload(
        action
        :http-request="uploadAction"
        :before-upload="beforeUpload"
        accept="image/*"
        :show-file-list="false"
      )
        el-button 上傳圖片
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

export default defineComponent({
  name: 'AddPost',
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

    const uploadAction = async (request) => {
      const { file } = request
      if (file) {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = document.createElement('img')

        img.onload = async function () {
          canvas.width = img.width
          canvas.height = img.height
          ctx.drawImage(img, 0, 0, img.width, img.height)
          const base64Img = canvas.toDataURL('image/png')
          const test = base64Img.replace('data:image/png;base64,', '')
          const res = await postApi.upload({ file: test })
          formData.image = res.data.data.data.link
          canvas.remove()
          img.remove()
        }

        img.src = URL.createObjectURL(file)
      } else {
        ElMessage({
          message: '上傳失敗',
          type: 'error',
        })
      }
    }

    const beforeUpload = (file) => {
      const pattern = /image/
      const isAcceptType = pattern.test(file.type)
      if (!isAcceptType) {
        ElMessage({
          message: '僅能上傳圖片',
          type: 'error',
        })
        return false
      }
    }

    const clearImage = () => {
      formData.image = ''
    }

    return {
      formData,
      submit,
      beforeUpload,
      uploadAction,
      clearImage,
      elfrom,
      validate,
      rules,
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
    .el-upload
      .el-button
        background-color: #000400
        border-radius: 4px
        +flex-center
        +size(130px,32px)
        font-size: 16px
        color: #fff
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
