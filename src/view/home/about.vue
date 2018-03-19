<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>详情</span>
      <el-button style="float: right; padding: 3px 0" type="text">编辑</el-button>
    </div>
    <div class="text item">
      <view-cont
        :listData="listData"
        :listValue="listValue"
        className="compVidewCont"
        labelWidth="95"
        col="2"
      >
      </view-cont>
    </div>
  </el-card>
</template>

<script>
  import viewCont from 'pkgs/components/view-cont'

  export default {
    components: {
      viewCont
    },
    data() {
      return {
        listData: [
          {label: '姓名', prop: 'name'},
          {label: '年龄', prop: 'age'},
          {label: '性别', prop: 'sex'},
          {label: '住址', prop: 'desc'},
        ],
        listValue: {
          name: 'sgsg',
          age: '30',
          sex: '1',
          desc: 'dgegjkegkeheri俄奥结果'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .compVidewCont {
    // todo
  }
  .text {
    font-size: 14px;
  }
</style>
