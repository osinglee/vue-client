import {server} from '@/tools/servers'

/**
 * 登陆
 */
export class LoginApi {
  static login (params) {
    return server.connection('POST', '/sessions', params)
  }

  static logout () {
    return server.connection('POST', '/logout')
  }
}
