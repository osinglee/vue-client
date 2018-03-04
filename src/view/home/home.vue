<template>
  <div id="load-index">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <el-col :span="10" :offset="5">
        <h1>{{name}}</h1>
      </el-col>
      <el-date-picker
        v-model="value1"
        type="datetime"
        placeholder="选择日期时间">
      </el-date-picker>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '文章',
      value1: ''
    }
  },
  components: {},
  mounted () {
    // todo
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }
</style>
