<template>
  <el-container style="height: 100%;">
    <!--菜单-->
    <comp-slider>
    </comp-slider>

    <el-container>
      <!--头部-->
      <el-header height="50" style="display: flex;justify-content: space-between">
        <comp-bread-crumb>
        </comp-bread-crumb>
        <h1 class="main_title">标题</h1>
        <comp-head-user>
        </comp-head-user>
      </el-header>
      <el-main>
        <!--路由-->
        <router-view>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import CompBreadCrumb from '../components/bread-crumb'
  import CompHeadUser from '../components/head-user'
  import CompSlider from '../components/slider'

  export default {
    data() {
      return {}
    },
    components: {
      CompBreadCrumb,
      CompHeadUser,
      CompSlider
    },
  }

</script>

<style scoped lang="scss">
  .el-container {
    width: 100%;
    height: 100%;
  }

  .el-header {
    height: 50px;
    line-height: 50px;
    border-radius: 0 !important;
    border-bottom: solid 1px #e6e6e6;
  }

  .el-header, .el-footer {
    color: #333;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .main_title {
    margin: 0;
  }

  .icon.iconfont {
    margin-right: 5px;
  }
</style>
