<template>
  <div class="comp-editor">
    <vue-editor
      id="editor"
      useCustomImageHandler
      @imageAdded="handleImageAdded"
      v-model="htmlForEditor">
    </vue-editor>
  </div>
</template>

<script>
  import {VueEditor} from 'vue2-editor'
  import {imageBase64} from '@/tools/utils'

  export default {
    components: {
      VueEditor
    },

    data() {
      return {
        htmlForEditor: ''
      }
    },
    methods: {
      /** 添加图片资源 */
      handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
        imageBase64(file).then(res => {
          Editor.insertEmbed(cursorLocation, 'image', res);
          resetUploader();
        }).catch(err => {
          this.$message.error(err)
        })
      },
      getEditorContent: function () {
        return this.htmlForEditor
      },
      setEditorContent: function (value) {
        this.htmlForEditor = value
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .comp-editor {

  }
</style>
