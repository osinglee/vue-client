import {server} from '@/tools/servers'

export class NewApi {
  static GetListApi(search = {}) {
      return server.connection('GET', `xxxx/articles`, search)
  }

  static GetItemApi(id) {
    return server.connection('GET', `xxxx/articles/${id}`)
  }

  static AddApi(data) {
    return server.connection('POST', `xxxx/articles`, data)
  }

  static EditorApi(id, data) {
    return server.connection('PUT', `xxxx/articles/${id}`, data)
  }

  static DeleteApi(id) {
    return server.connection('DELETE', `xxxx/articles/${id}`)
  }
}
