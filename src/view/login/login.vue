<template>
  <div id="Login">
    <headers/>
    <div id="login-s" class='login-wrap'>
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
          <el-form :model="params" label-width="68px" class="demo-ruleForm">
            <el-form-item prop="login" label="账号：">
              <el-input v-model="params.login" placeholder="用户名/邮箱"/>
            </el-form-item>
            <el-form-item prop="password" label="密码：">
              <el-input type="password" placeholder="请输入密码" v-model="params.password"/>
            </el-form-item>
            <div class="login-btn">
              <el-button class="btn-define" @click="submit()">登 录</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Headers from '@/packages/components/common/Headers'
import { mapState } from 'vuex'
import './login.scss'

export default {
  name: 'Login',
  components: {
    Headers
  },
  data () {
    return {
      params: {
        login: '',
        password: '',
      },
      active: {
        'color': '#00b5ad',
        'font-weight': 'bold',
        'border-bottom': '3px solid #00b5ad',
      },
      path: this.$route.path.split('/')[2],
    }
  },
  computed: mapState({
    isLogin: state => state.user.auth.isLogin,
    user: state => state.user.auth.user
  }),
  beforecreate: {
    // todo 判断是否有保存登录信息，如果有，则取出并赋值到对应的位置
  },
  methods: {
    submit () {
      this.$store.dispatch('accountLoginSubmit', {
        login: '15223719447',
        password: '12345678',
        type: 0,
        remember: true
      })
    },
    successWatcher (val, oldVal) {
      if (val) {
        const redirectUrl = this.$route.query.redirect_url || '/'
        this.$router.push(redirectUrl)
      }
    }
  },
  watch: {
    isLogin: 'successWatcher',
    $route (to, from) {
      this.path = this.$route.path.split('/')[2]
    }
  }
}
</script>
