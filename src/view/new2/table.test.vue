<template>
  <div id="load-index">
    <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
      <Table
        :tableData="tableData"
        :tableHeader="tableHeader"
        :tableAttr="tableAttr"
        :loading="loading"
        className="tableClassName"
        @tableOtherClick="tableOtherClick"
      ></Table>
    </el-row>
  </div>
</template>

<script>
  import Table from 'pkgs/components/table'

  export default {
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
            prop: 'checkboxValue',
            label: 'checkbox',
            width: 80
          }, {
            prop: 'checkboxValuebtn',
            label: 'checkboxBtn',
            width: 120
          }, {
            prop: 'radioValue',
            label: '单选',
            width: 80
          }, {
            prop: 'radioValueBtn',
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
    props: {
      /** 数据 */
      tableData: Array
    },
    components: {
      Table
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData: function () {
        this.$store.dispatch('newGetTableData')
      },
      tableOtherClick(row, type, index) {
        this.$emit('tableOtherClick', row, type, index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }
</style>
