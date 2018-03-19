<template>
  <el-dropdown>
    <span><i class="icon iconfont icon-my"></i>王小虎</span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item><i class="icon iconfont icon-yanzhengma"></i>修改密码</el-dropdown-item>
      <el-dropdown-item><i class="icon iconfont icon-tuichu"></i>退出登陆</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    name: 'comp-bread',
    data() {
      return {}
    },
    props: {},
    methods: {},
  }
</script>
