import axios from 'axios'
import qs from 'qs'
import debug from '../../config/debug.json'
import { Msg } from './message'

const isLogin = window.sessionStorage.getItem('user.isLogin')
const token = window.sessionStorage.getItem('user.token')

/**
 * 请求类
 */
export class BaseApi {
  servers

  /**
   * 初始化servers
   * @param hot
   */
  constructor (hot) {
    const headers = new Headers()
    headers.set('App-Version', '0.1.0')
    if (isLogin) headers.set('Authorization', token)
    this.servers = axios.create({
      baseURL: `${hot}/api`, // http://moe.cn-su.net/api 测试用
      headers,
      timeout: 1,
    })
    this.servers.defaults.timeout = 5000
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      Msg.error(error.message)
    })
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      Msg.error(error.message)
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @returns {Promise<any>}
   */
  connection (method = 'GET', url, body) {
    if (typeof body !== 'object') body = {}
    method = method.toLocaleLowerCase()
    if (method === 'get' || method === 'head' || method === 'delete') {
      url = `${url}?${qs.stringify(body)}`
      body = {}
    }
    return Promise.resolve(this.servers[method](url, body))
  }
}

export const server = new BaseApi(debug.servers)
