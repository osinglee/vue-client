<template>
  <div class="mh-login">
    <div class="ec-logo"></div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px"
             class="demo-ruleForm login-container">
      <h3 class="mh-login-title">重庆市学生资助与经费监管平台</h3>
      <el-form-item prop="loginStr" label="用户名:">
        <el-input
          type="text"
          v-model="ruleForm.loginStr"
          ref="adminput"
          auto-complete="off"
          placeholder="请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码:">
        <el-input
          type="password"
          v-model="ruleForm.password"
          auto-complete="off"
          placeholder="请输入密码"
        >
        </el-input>
      </el-form-item>

      <el-form-item label="" style="margin-bottom: 5px">
        <el-checkbox
          label="记住账号" name="type" v-model="ruleForm.remember"
          style="text-align: left">
        </el-checkbox>
      </el-form-item>

      <el-button
        style="width: 100%;"
        type="primary"
        @click.native.prevent="submitForm"
        :loading="loading">登录
      </el-button>
      <br>
      <br>
      <div class="mh-login-footer">重庆市教委经费监管事务中心 {{version}}</div>
    </el-form>
  </div>
</template>

<script>
  import {version} from '../../../package'
  import {mapState} from 'vuex'

  export default {
    name: 'Login',
    components: {},
    /** state 默认信息 */
    data() {
      return {
        loading: false,
        version,
        rules: {
          loginStr: [
            {required: true, message: '请输入登录账号', trigger: 'change'},
            {min: 6, max: 12, message: '账号长度在6-12位', trigger: 'change'}
          ],
          password: [
            {required: true, message: '请输入登录密码', trigger: 'change'},
            {min: 6, max: 12, message: '密长度在6-12位', trigger: 'change'}
          ],
        }
      }
    },
    created() {
      window.addEventListener('keydown', this.Enter);
    },
    /** 计算属性 */
    computed: mapState({
      ruleForm: state => state.user.accountPwd,
    }),
    /** 完成挂载 */
    mounted() {
      this.$refs['adminput'].focus();
    },
    destroyed() {
      window.removeEventListener('keydown', this.enter)
    },
    /** 方法事件 */
    methods: {
      enter(e) {
        if (!!this.ruleForm.loginStr && e.which === 13) {
          this.submitForm()
        }
      },
      submitForm() {
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            this.loading = true;
            this.$store.dispatch('accountLoginSubmit', this.ruleForm).then(() => {
              this.loading = false;
              this.$router.push({path: '/index'})
            }).catch(() => {
              this.loading = false;
            })
          } else {
            return false
          }
        })
      },
    },
  }
</script>

<style lang="scss" scoped>

  .ec-logo {
    width: 450px;
    height: 70px;
    background-repeat: no-repeat;
    position: absolute;
    top: 30px;
    left: 30px;
  }

  .chrome-span {
    a {
      text-decoration: none;
      color: var(--mainColor);
      &:hover {
        text-decoration: underline;
        text-decoration-color: var(--mainColor);
      }
    }
  }

  .login-yzm {
    display: flex;
    &-img {
      margin-left: 20px;
      cursor: pointer;
      line-height: 20px;
    }
  }

  .mh-login {
    width: 100%;
    height: 100%;
    background-color: #cccccc;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-width: 1000px;
    .el-form-item {
      .el-form-item__content {
        .icon {
          position: absolute;
          left: 8px;
          z-index: 1;
          display: inline-block;
          height: 100%;
          line-height: 36px;
        }
      }
    }
    &-title {
      margin-bottom: 15px;
      text-align: center;
      letter-spacing: 2px
    }

    &-footer {
      font-size: 14px;
      color: #606266;
    }

  }

  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    width: 380px;
    padding: 35px 35px 15px 35px;
    background: rgba(255, 255, 255, .8);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    min-width: 270px;
    .title {
      text-align: center;
      color: #505458;
    }
  }
</style>
<style>
  .mh-login .el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
    content: '';
  }
</style>
