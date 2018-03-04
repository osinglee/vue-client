/**
 * 项目api
 */
import { server } from './servers'

/**
 * 登陆
 */
export class LoginApi {
  static login (params) {
    return server.connection('POST', '/api/sessions', params)
  }

  static logout () {
    return server.connection('POST', '/api/logout')
  }
}

/**
 * 首页
 */
export class Home {

}
