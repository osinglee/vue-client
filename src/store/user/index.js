/**
 * user
 */

import {LoginApi} from '@/view/login/login-api';

const USER_TOKEN = 'user.token'
const USER_USERINFOINFO = 'user.userInfo'
const USER_PWD = 'user.accountPwd'
const IS_LOGIN = 'user.isLogin'
const sessionStorage = window.sessionStorage

const defaultUser = {login: '', password: '', remember: false}

export default {
  state: {
    /** token */
    token: sessionStorage.getItem(USER_TOKEN),
    /** 用户登陆角色信息 */
    userInfo: JSON.parse(sessionStorage.getItem(USER_USERINFOINFO)) || defaultUser,
    /** 用户登陆账户密码 */
    accountPwd: JSON.parse(sessionStorage.getItem(USER_PWD)) || {},
    /** 是否登陆 */
    isLogin: sessionStorage.getItem(IS_LOGIN),
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation */
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED(state, data) {
      if (data.params.remember) {
        state.accountPwd = data.params
        sessionStorage.setItem(USER_PWD, JSON.stringify(data.params))
      }
      state.token = data.token
      state.userInfo = data.staffs[0]
      state.isLogin = true
      sessionStorage.setItem(USER_TOKEN, data.token)
      sessionStorage.setItem(USER_USERINFOINFO, JSON.stringify(data.staffs[0]))
      sessionStorage.setItem(IS_LOGIN, true)
    },
    ACCOUNT_LOGOUT_FAILURE(state) {
      state.token = null
      state.userInfo = null
      state.isLogin = null
      state.accountPwd = null
      sessionStorage.removeItem(USER_TOKEN)
      sessionStorage.removeItem(USER_USERINFOINFO)
      sessionStorage.removeItem(IS_LOGIN)
      sessionStorage.removeItem(USER_PWD)
    },
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    /** 登录 */
    accountLoginSubmit({commit}, params) {
      return new Promise((resolve, reject) => {
        LoginApi.login(params).then((res) => {
          console.log('%c 身份被服务器接受', 'color:#fa8c16')
          commit('ACCOUNT_AUTH_STATUS_CHANGED', {...res, params})
          resolve()
        }).catch(err => {
          console.log('%c 身份被服务器拒绝', 'color:#fa8c16')
          commit('ACCOUNT_LOGOUT_FAILURE')
          reject(err)
        })
      })
    },
    /** 登出 */
    accountLogoutSubmit({commit}) {
      return new Promise((resolve, reject) => {
        LoginApi.logout().then(res => {
          commit('ACCOUNT_LOGOUT_FAILURE')
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
