import axios from 'axios'
import qs from 'qs'
import debug from '../../config/debug.json'
import {Msg} from './message'

/**
 * 请求类
 */
export class BaseApi {
  servers;

  /**
   * 初始化servers
   * @param hot
   */
  constructor(hot) {
    const headers = new Headers();
    headers.set('App-Version', '0.1.0');
    this.servers = axios.create({
      baseURL: `${hot}/`,
      headers,
      timeout: 1,
    });
    this.getStatusToken();
    this.servers.defaults.timeout = 5000;
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      Msg.error(error);
      return Promise.reject(error);
    });
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      Msg.error(error.response.data.message);
      return Promise.reject(error.response.data.message);
    })
  }

  /**
   * fetch
   * @param method
   * @param url
   * @param body
   * @returns {Promise<any>}
   */
  connection(method = 'GET', url, body) {
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (method === 'get') {
      url = `${url}?${qs.stringify(body)}`;
      body = {}
    }
    this.getStatusToken();
    return Promise.resolve(this.servers[method](url, body))
  }

  /**
   * 设置token
   * @param isLogin
   * @param token
   */
  setToken({isLogin, token}) {
    if (isLogin) {
      this.servers.defaults.headers.common['Authorization'] = token;
    }
  }

  /**
   * 获取登录状态，token值
   * @returns {{isLogin: string, token: string}}
   */
  getStatusToken() {
    const isLogin = window.sessionStorage.getItem('user.isLogin');
    const token = window.sessionStorage.getItem('user.token');
    this.setToken({isLogin, token})
  }
}

export const server = new BaseApi(debug.servers);
