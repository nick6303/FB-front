<template lang="pug">
.ImgUpload
  el-upload(
    action
    :http-request="uploadAction"
    :before-upload="beforeUpload"
    accept="image/*"
    :show-file-list="false"
  )
    el-button {{btnText}}
</template>
<script>
import postApi from '@api/post'
import { ElMessage } from 'element-plus'
export default {
  name: 'ImgUpload',
  props: {
    btnText: {
      type: String,
      default: '上傳圖片',
    },
  },
  setup(props, { emit }) {
    const uploadAction = async (request) => {
      const { file } = request
      if (file) {
        const form = new FormData()
        form.append('files', file)
        const res = await postApi.upload(form)
        emit('change', res.imgUrl)
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
    return { uploadAction, beforeUpload }
  },
}
</script>
<style lang="sass" scoped>
.el-upload
  .el-button
    background-color: #000400
    border: 0px
    border-radius: 4px
    +flex-center
    +size(130px,32px)
    line-height: 32px
    min-height: 32px
    font-size: 16px
    color: #fff
    padding: 8px 20px
    border-radius: 0
</style>
