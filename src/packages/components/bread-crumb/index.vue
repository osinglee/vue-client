<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height: 50px; font-size: 16px">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index)  in levelList"
        :key="item.name + index"
        :to="item.path">
        {{renderZhCN(item.name)}}
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import mock from '@/mock/menu.json'

  export default {
    name: 'comp-bread',
    data() {
      return {
        levelList: null,
        menuList: mock.menu
      }
    },
    methods: {
      renderZhCN(path) {
        let val = [];
        for (let k = 0; k < this.menuList.length; k++) {
          const v = this.menuList[k].menuGroup.find(v => {
            return (v.to).trim() === (path === '/' ? '/' : '/' + path)
          });
          v && val.push(v)
        }
        return val.length ? val[0].label : '首页'
      },
      getBreadcrumb() {
        let matched = this.$route.matched.filter(item => item.name)
        const first = matched[0]
        if (first && first.name !== '／') {
          matched = [{path: '/', name: '／'}].concat(matched)
        }
        this.levelList = matched
      },
    },
    created() {
      this.getBreadcrumb()
    },
    watch: {
      $route() {
        this.getBreadcrumb()
      }
    },
  }
</script>
