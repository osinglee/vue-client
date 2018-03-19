<template>
  <div id="new-vuex-table">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <Table
        :tableData="tableData"
        :tableHeader="tableHeader"
        :tableAttr="tableAttr"
        :loading="loading"
        className="tableClassName"
        @tableOtherClick="tableOtherClicks"
      ></Table>
    </el-row>
  </div>
</template>

<script>
  import Table from 'pkgs/components/table'
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'new-vuex-table',
    data() {
      return {
        loading: false,
        /** 表格属性设置 待完善 */
        tableAttr: {
          noIndex: true,
          other: [
            {name: '查看', type: 'look'},
            {name: '编辑', type: 'edit'},
            {name: '删除', type: 'del'},
          ]
        },
        /** 表头 */
        tableHeader: [
          {
            prop: 'login',
            label: '账号',
            width: 120,
            sort: true
          }, {
            prop: 'number',
            label: '金额',
            width: 80
          }, {
            prop: 'selectValues',
            label: '下拉',
            width: 100
          }, {
            prop: 'selectValuesMu',
            label: '下拉多选',
            width: 100
          }, {
            prop: 'checkbox',
            label: 'checkbox',
            width: 80
          }, {
            prop: 'checkboxBtn',
            label: 'checkboxBtn',
            width: 120
          }, {
            prop: 'radio',
            label: '单选',
            width: 80
          }, {
            prop: 'radioBtn',
            label: '单选btn',
            width: 80
          }, {
            prop: 'dateTime',
            label: '日期时间',
            width: 120
          },
        ],
      }
    },
    components: {
      Table
    },
    computed: mapState({
      tableData: state => state.newPage.tableData,
    }),
    mounted() {
      this.newGetTableData();
    },
    methods: {
      ...mapActions([
        'newGetTableData',
        'newAdd',
        'tableOtherClick'
      ]),
      /** 因为 vuex action 只接收两个参数，第一个是当前的vuex本生，第二个是自定义值，故合并到一起 */
      tableOtherClicks: function (row, type) {
        this.tableOtherClick(Object.assign(row, {TYPE: type}))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }
</style>
