<template>
  <div>
    <el-upload
      :action="servers"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
  import {imageBase64} from '@/tools/utils'
  import debug from '../../../../config/debug.json'

  export default {
    data() {
      return {
        servers: '',
        imageUrl: '',
        dialogImageUrl: '',
        dialogVisible: false
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(file.raw);
        imageBase64(file.raw).then(res => {
          this.imageUrl = res;
        }).catch(err => {
          this.$message.error(err)
          console.log(err);
        })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
    },
    mounted() {
      this.servers = debug.servers + '/posts'
    }
  }
</script>
<style lang="scss" scoped>
  .avatar-uploader {
    :global {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409EFF;
      }
    }
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
