<template>
  <div id="load-index">
    <el-card class="box-card"
             body-style="border-top: 1px solid #ddd">
      <div slot="header" class="clearfix">
        <span>列表</span>
      </div>
      <div class="text item">
        <el-row :gutter="25" style="margin-left: 0; margin-right: 0">
          <comp-table
            :tableData="tableData"
            :tableHeader="tableHeader"
            :tableAttr="tableAttr"
            :loading="loading"
            className="tableClassName"
            @tableOtherClick="tableOtherClick"
          >
          </comp-table>
          <div class="block">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
            </el-pagination>
          </div>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
  import CompTable from 'pkgs/components/table'
  import CompUpload from 'pkgs/components/upload'

  export default {
    data() {
      return {
        loading: false,
        currentPage4: 1,
        tableAttr: {
          noIndex: true,
          other: [
            {name: '查看'},
            {name: '编辑'},
          ]
        },
        tableHeader: [
          {
            prop: 'date',
            label: '日期',
            width: 120,
            sort: true
          }, {
            prop: 'name',
            label: '姓名',
            width: 80
          }, {
            prop: 'address',
            label: '地址',
            width: 280
          }, {
            prop: 'sex',
            label: '性别',
            width: 80
          },
        ],
        tableData: [],
      }
    },
    components: {
      CompTable,
      CompUpload
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData: function () {
        this.loading = true
        setTimeout(() => {
          this.tableData = [{
            date: '2016-05-02',
            name: '当然感染',
            address: '上海市普陀区金沙江路 1518 弄',
            sex: '男',
          }, {
            date: '2016-05-04',
            name: '德国',
            address: '上海市普陀区金沙江路 1517 弄',
            sex: '男',
          }, {
            date: '2016-05-01',
            name: '分号',
            address: '上海市普陀区金沙江路 1519 弄',
            sex: '男',
          }, {
            date: '2016-05-03',
            name: '分号',
            address: '上海市普陀区金沙江路 1516 弄',
            sex: '女',
          }]
          this.loading = false
        }, 1000)
      },
      tableOtherClick(row, index) {
        console.log(row);
        console.log(index);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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
