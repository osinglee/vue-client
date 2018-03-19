<template>
  <div width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu
      class="el-menu-vertical-demo"
      default-active="0-0"
      @select='handSelect'
      unique-opened
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
      width="200px"
      :collapse="isCollapse"
    >
      <el-submenu v-for="(submenu, index) in menuList" :index="index.toString()" :key="index">
        <template slot="title">
          <i :class="iconClass(submenu.icon)"></i>
          <span slot="title">{{submenu.submenu}}</span>
        </template>
        <el-menu-item-group v-for="(menu, v) in submenu.menuGroup" :key="'-' + v">
          <router-link class="head-link" :to="menu.to">
            <el-menu-item :index="index+ '-' + v">
              <span slot="title">{{menu.label}}</span>
            </el-menu-item>
          </router-link>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <div class="side_trgger" :style="{width: isCollapse?'64px':'200px'}" @click="collapse">
      <i :class="menuToger" :title="menuTogerTitle"></i>
    </div>
  </div>
</template>
<script>
  import mock from '@/mock/menu.json'

  export default {
    name: 'slider',
    data() {
      return {
        isCollapse: false,
        menuList: mock.menu,
      }
    },
    methods: {
      handSelect: function (key, path) {
        console.log(key, path);
      },
      iconClass(icon) {
        return `el-icon-${icon}`
      },
      collapse() {
        this.isCollapse = !this.isCollapse
      },
    },
    computed: {
      menuToger: function () {
        return !this.isCollapse ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'
      },
      menuTogerTitle: function () {
        return this.isCollapse ? '展开' : '收起'
      }
    },
  }
</script>

<style scoped lang="scss">
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .side_trgger {
    position: fixed;
    text-align: center;
    bottom: 0;
    cursor: pointer;
    height: 48px;
    line-height: 48px;
    color: #fff;
    background: #002140;
    z-index: 1;
    -webkit-transition: all .3s ease-in-out;
    transition: 0.3s width ease-in-out, 0.3s padding-left ease-in-out, 0.3s padding-right ease-in-out;
    width: 200px;
  }

  .el-menu-item {
    a {
      color: rgb(191, 203, 217);
    }
  }

  .el-menu {
    height: 100%;
  }

  .el-menu-item.is-active > a {
    color: #1890ff;
  }

  .el-menu-item-group a {
    text-decoration: none;
  }

  .el-menu-item a {
    text-decoration: none;
    display: block;
    width: 100%;
    height: 100%;
  }

  .head-link {
    &:active {
      text-decoration: none;
    }
  }
</style>
