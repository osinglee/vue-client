/**
 * new-vuex
 */

import {NewApi} from '@/view/new-vuex/api';
import Vue from 'vue'
import {Message} from 'element-ui'

const defaultForm = {
  login: '',
  selectValues: '',
  selectValuesMu: [],
  checkboxValue: [],
  checkboxValuebtn: [],
  radioValue: '',
  radioValueBtn: '',
  dateTime: '',
  number: '',
};

export default {
  state: {
    /** 数据 */
    tableData: [],
    /** 弹窗开关 */
    dialogVisible: false,
    /** 弹窗标题 */
    dialogTitle: '',
    /** 表单项 */
    ruleForm: {},
    /** 查看单个的动态数据 */
    listValue: {}
  },
  /** 计算属性 */
  getters: {
    // doneTodos: state => {
    //   return state.todos.filter(value => value.done)
    // }
  },
  /** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation， 不可异步操作 */
  mutations: {
    /** 获取表格数据 */
    SET_TABLE_DATA(state, data) {
      state.tableData = data
    },
    /** 打开弹窗 */
    OPEN_DIALOG(state, name) {
      /** 下面展示另一种赋值写法 */
      Vue.set(state, 'dialogVisible', true);
      Vue.set(state, 'dialogTitle', name);
      Vue.set(state, 'ruleForm', JSON.parse(JSON.stringify(defaultForm)))
    },
    CLOSE_DIALOG(state) {
      Vue.set(state, 'dialogVisible', false);
    },
    /** 表单确定 */
    SUBMIT_FORM(state) {
      if (state.dialogTitle.trim() === '新增') {
        state.tableData = [...state.tableData, state.ruleForm];
        this.dispatch('addApi', state.ruleForm)
      } else {
        // todo 修改信息
      }
    },
    /**  table 操作点击 */
    TABLE_OTHER_CLICK(state, item) {
      const {TYPE, ...other} = item;
      Vue.set(state, 'dialogVisible', true);
      if (TYPE === 'edit') {
        state.dialogTitle = '修改';
        state.dialogVisible = true;
        state.ruleForm = other
      } else if (TYPE === 'del') {
        this.dispatch('delApi', state.ruleForm.id)
      } else if (TYPE === 'look') {
        state.listValue = other;
        state.dialogTitle = '查看';
        state.dialogVisible = true;
      }
    }
  },
  /** Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。 */
  actions: {
    newGetTableData({commit}) {
      commit('SET_TABLE_DATA', [])
      // NewApi.GetListApi().then((res) => {
      // }).catch(() => {
      //   commit('ACCOUNT_LOGOUT_FAILURE')
      // })
    },
    newAdd(that, name) {
      that.commit('OPEN_DIALOG', name)
    },
    closeDialog({commit}) {
      commit('CLOSE_DIALOG')
    },
    submitForm({commit}) {
      commit('SUBMIT_FORM');
      commit('CLOSE_DIALOG')
    },
    tableOtherClick({commit}, item) {
      commit('TABLE_OTHER_CLICK', item);
    },
    addApi({commit}, data) {
      Message.success('新增成功')
      // NewApi.AddApi(data).then(() => {
      //   Message.success('新增成功')
      //   this.dispatch('newGetTableData')
      // }).catch(err => {
      //   Message.error('新增失败' + err)
      // })
    },
    delApi({commit}, id) {
      // NewApi.DeleteApi(id).then(() => {
      //   Message.success('删除成功')
      //   this.dispatch('newGetTableData')
      // }).catch(err => {
      //   Message.error('删除失败' + err)
      // })
    }
  }
}
