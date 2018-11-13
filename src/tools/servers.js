import axios from 'axios'
import qs from 'qs'
import {version} from '../../package'
import {db} from './db'

/**
 * 请求类
 */
export class BaseApi {
  servers;
  hot;

  /**
   * 初始化servers
   */
  constructor(hot) {
    this.hot = hot;
    this.servers = axios.create({
      baseURL: hot,
      headers: {
        'App-Version': version,
      },
      timeout: 6000,
      // withCredentials: true
    });
    this.servers.interceptors.request.use(function (config) {
      return config
    }, function (error) {
      return Promise.reject(error || '网络繁忙，请稍候再试！');
    });
    this.servers.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      return Promise.reject(error.response || '网络繁忙，请稍候再试！');
    })
  }

  /**
   * fetch2
   * @param method
   * @param url
   * @param body
   * @param fileList
   * @param fileKey
   * @returns {Promise<any>} 直接返回数据data
   */
  connection(method = 'GET', url, body, fileList, fileKey = 'files') {
    this.getStatusToken();
    if (typeof body !== 'object') body = {};
    method = method.toLocaleLowerCase();
    if (fileList && (fileList instanceof Array)) {
      let headers = {'Content-Type': 'multipart/form-data'};
      const param = new window.FormData();
      for (const key in body) {
        if ({}.hasOwnProperty.call(body, key)) param.append(key, body[key]);
      }
      fileList.forEach(file => param.append(fileKey, file));
      return Promise.resolve(this.servers[method](url, param, {headers}))
    }
    if (method === 'get') {
      url = url + (url.indexOf('?') >= 0 ? '&' : '?' + qs.stringify(body, { arrayFormat: 'brackets' }));
      body = {}
    }
    return new Promise(async (resolve, reject) => {
      try {
        const {data} = await this.servers[method](url, body);
        resolve(data)
      } catch (e) {
        reject(e.data)
      }
    })
  }

  /**
   * 设置token
   */
  getStatusToken() {
    const user = db.get('user.info');
    if (db.get('user.login') && user) {
      this.servers.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
    }
  }
}

export const server = new BaseApi(process.env.BASE_API);
