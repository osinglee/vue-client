<template>
  <div>
    <div id="register" class='login-wrap'>
      <div class="container">
        <div class="ms-title">
          <span>
            <router-link to="/user/login" :style="[path === 'login' ? active : '']" class="user-login">登录</router-link>
          </span>
          <span class="this-span">·</span>
          <span>
            <router-link to="/user/register" :style="[path === 'register' ? active : '']"
                         class="user-login">注册</router-link>
          </span>
        </div>
        <div class="ms-login">
          <el-form ref="params" :model="params" label-width="82px">
            <el-form-item label="用户名：" prop="name">
              <el-input v-model="params.name" placeholder="至少4个字符"/>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="params.email" placeholder="请填写真实邮箱"/>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input type="password" placeholder="至少6个字符" v-model="params.password"/>
            </el-form-item>
            <el-form-item prop="password_confirmation" label="确认密码：">
              <el-input type="password" placeholder="请再次输入密码" v-model="params.password_confirmation"/>
            </el-form-item>
            <div class="login-btn">
              <el-button class="btn-define" @click="submit()">注 册</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import './reg.scss'
  export default {
    name: 'register',
    components: {
    },
    data() {
      return {
        params: {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        },
        active: {
          'color': '#00b5ad',
          'font-weight': 'bold',
          'border-bottom': '3px solid #00b5ad'
        },
        path: this.$route.path.split('/')[2]
      }
    },
    methods: {
      submit() {
        // todo
      },
      successWatcher(val, oldVal) {
        // todo
      },
      message() {
        this.$notify.success({
          title: '注册成功',
          message: '请先到前往邮箱激活账号',
          offset: 100
        })
      }
    },
    watch: {
      success: 'successWatcher',
      $route() {
        this.path = this.$route.path.split('/')[2]
      }
    }
  }
</script>
