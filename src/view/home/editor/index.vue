<template>
  <div class="home-editor">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>编辑器</span>
      </div>
      <div class="card-body">
        <CompEditor
          ref="test_editor">
        </CompEditor>
      </div>
      <el-button @click="submitEditor">获取内容</el-button>
      <el-button @click="setEditor">设置内容</el-button>
    </el-card>
  </div>
</template>

<script>
  import CompEditor from 'pkgs/components/editor'

  export default {
    name: 'editor',
    components: {
      CompEditor
    },
    data() {
      return {}
    },
    methods: {
      /** 获取内容 */
      submitEditor: function () {
        console.log(this.$refs['test_editor'].getEditorContent());
      },
      /** 设置内容 */
      setEditor: function () {
        this.$refs['test_editor'].setEditorContent('这是我动态设置的内容')
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .card-body {
    margin-bottom: 10px;
      .ql-toolbar, .ql-container {
        border-color: red !important;
    }
  }

</style>
