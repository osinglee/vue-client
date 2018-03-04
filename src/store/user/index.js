/**
 * user
 */

import Vue from 'vue'
import { LoginApi } from '@/tools/api'
import * as types from './user-types'

const AUTH_TOKEN = 'auth.token'
const AUTH_USER = 'auth.user'
const ACCOUNT_PWD = 'auth.accountPwd'
const IS_LOGIN = 'auth.isLogin'

export default {
  state: {
    auth: {
      /** token */
      token: sessionStorage.getItem(AUTH_TOKEN),
      /** 用户登陆角色信息 */
      user: JSON.parse(sessionStorage.getItem(AUTH_USER)),
      /** 用户登陆账户密码 */
      accountPwd: JSON.parse(sessionStorage.getItem(ACCOUNT_PWD)),
      /** 是否登陆 */
      isLogin: sessionStorage.getItem(IS_LOGIN),
    }
  },
  mutations: {
    ACCOUNT_AUTH_STATUS_CHANGED: (state, data) => {
      if (data.params.remember) {
        Vue.set(state.auth, 'accountPwd', data.params)
        window.sessionStorage.setItem(ACCOUNT_PWD, JSON.stringify(data.params))
      }
      Vue.set(state.auth, 'token', data.token)
      Vue.set(state.auth, 'user', data.staffs[0])
      Vue.set(state.auth, 'isLogin', true)
      window.sessionStorage.setItem(AUTH_TOKEN, data.token)
      window.sessionStorage.setItem(AUTH_USER, JSON.stringify(data.staffs[0]))
      window.sessionStorage.setItem(IS_LOGIN, true)
    },
    ACCOUNT_LOGOUT_FAILURE: (state) => {
      Vue.set(state.auth, 'accountPwd', null)
      Vue.set(state.auth, 'token', null)
      Vue.set(state.auth, 'user', null)
      Vue.set(state.auth, 'isLogin', false)
      window.sessionStorage.removeItem(AUTH_TOKEN)
      window.sessionStorage.removeItem(AUTH_USER)
      window.sessionStorage.removeItem(IS_LOGIN)
      window.sessionStorage.removeItem(ACCOUNT_PWD)
    },
  },
  actions: {
    accountLoginSubmit ({commit}, params) {
      LoginApi.login(params).then((res) => {
        commit(types.ACCOUNT_AUTH_STATUS_CHANGED, {...res, params})
      }).catch(() => {
        commit(types.ACCOUNT_LOGOUT_FAILURE)
      })
    },
    accountLogoutSubmit ({commit}) {
      LoginApi.logout().then(res => {
        commit(types.ACCOUNT_LOGOUT_FAILURE)
      })
    }
  }
}
