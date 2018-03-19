<template>
  <div id="new2">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>
      <div class="text item">
        <div>
          <comp-search
            @onOk="onOk">
          </comp-search>
        </div>
        <el-button type="primary" @click="add('新增')">新增</el-button>
        <comp-table
          :tableData="tableData"
          @tableOtherClick="tableOtherClick"
        >
        </comp-table>
        <comp-pagination
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          :page="page"
          :pageSize="pageSize"
          :totalCount="totalCount"
        >
        </comp-pagination>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          width="60%"
          @before-close="handleClose()">
          <comp-form
            @formSubClick="formSubClick"
            :ruleForm="ruleForm"
            ref="newForm"
            v-if="dialogTitle !== '查看'"
          >
          </comp-form>
          <view-cont
            :listValue="listValue"
            v-else
          >
          </view-cont>
        </el-dialog>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CompTable from './table.test'
  import CompForm from './form.test'
  import viewCont from './view-cont.test'
  import CompSearch from './query-form.test'
  import CompPagination from 'pkgs/components/pagination'
  import {NewApi} from './api'

  export default {
    name: 'new2',
    data() {
      return {
        dialogTitle: '', // 弹窗名称
        dialogVisible: false, // 弹窗开关
        tableData: [], // 表格数据源
        ruleForm: {}, // 表单字段
        listValue: {}, // 查看的value值
        /** 分页信息 */
        page: 1,
        /** 每页数量  默认50 */
        pageSize: 50,
        /** 总数  需要动态获取 */
        totalCount: 200
      }
    },
    components: {
      CompTable,
      CompForm,
      CompSearch,
      viewCont,
      CompPagination
    },
    mounted() {
      this.defaultFormData();
      this.getDataList()
    },
    methods: {
      defaultFormData: function () {
        this.ruleForm = {
          login: '',
          selectValues: '',
          selectValuesMu: [],
          checkboxValue: [],
          checkboxValuebtn: [],
          radioValue: '',
          radioValueBtn: '',
          dateTime: '',
          number: '',
        }
      },
      /** 关闭弹窗 */
      handleClose: function () {
        this.dialogVisible = false
      },
      /** 点击新增按钮打开弹窗 */
      add: function (name) {
        this.dialogVisible = true;
        this.dialogTitle = name;
        this.defaultFormData()
      },
      /** 获取表个数据 */
      getDataList: function () {
        // 带查询条件
        // NewApi.GetListApi().then(res => {
        //   this.tableData = res.data
        // })
      },
      /** 点击表单提交按钮 */
      formSubClick: function (item) {
        this.handleClose();
        if (this.dialogTitle.trim() === '新增') {
          this.tableData = [...this.tableData, item] // 测试用
          // NewApi.AddApi().then(res => {
          //   this.getDataList()
          // })
        } else {
          /** 修改 */
          // NewApi.EditorApi(item.id, item).then(res => {
          //   this.getDataList()
          // })
        }
      },
      /** 点击表格操作， 没有则省去 */
      tableOtherClick: function (item, type) {
        if (type === 'edit') {
          this.dialogVisible = true;
          this.dialogTitle = '修改';
          this.ruleForm = item
        } else if (type === 'del') {
          // NewApi.DeleteApi(item.id, item).then(res => {
          //   this.getDataList()
          // })
        } else if (type === 'look') {
          this.listValue = item;
          this.dialogTitle = '查看';
          this.dialogVisible = true;
        }
        this.ruleForm = item
      },
      handleSizeChange: function (val) {
        this.pageSize = val;
        this.getDataList()
      },
      handleCurrentChange: function (val) {
        this.page = val;
        this.getDataList()
      },
      onOk: function (search) {
        console.log(search);
        this.getDataList(search)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content-body {
    margin-top: 30px;
  }

  .tableClassName {
    background-color: red;
  }
</style>
