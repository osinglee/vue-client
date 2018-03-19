<template>
  <div class="compTable" :class="className">
    <el-table
      highlight="true"
      :data="tableData"
      :border="tableAttr.border"
      :default-sort="{prop: 'date', order: 'descending'}"
      :style="{width: defaWidth}"
      v-loading="loading">
      <el-table-column
        v-if="tableAttr.noIndex"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        v-for="item in tableHeader"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :sortable="item.sort || false"
      >
      </el-table-column>
      <el-table-column
        v-if="tableAttr.other"
        label="操作"
        width="140">
        <template slot-scope="scope">
          <el-button
            v-for="(list, index) in tableAttr.other"
            @click="handleClick(scope.row, list.type, scope.$index)"
            :key="index"
            type="text" size="small">{{list.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  /**
   * 表格组件
   */
  export default {
    name: 'table-component',
    data() {
      return {}
    },
    props: {
      /**  class名称 */
      className: String,
      /** loading */
      loading: {
        type: Boolean,
        default: false,
      },
      /** 表格配置属性 */
      tableAttr: {
        /** 表格宽度 */
        width: {
          type: [Number, String],
          default: '100%'
        },
        /** 是否带 */
        border: {
          type: Boolean,
          default: true
        },
        /** 是否带有序号 */
        noIndex: {
          type: Boolean,
          default: false
        },
        /** 其他操作 */
        other: {
          type: Array,
          default: null, // [{name: '查看'}]
        }
      },
      /** 表格数据 */
      tableData: {
        type: Array,
        default: function () {
          return [{
            date: '2016-05-02',
            name: '当然感染',
            address: '上海市普陀区金沙江路 1518 弄',
            sex: '男',
          }]
        }
      },
      /** 表头 */
      tableHeader: {
        type: Array,
        default: function () {
          return [
            /** prop:字段名 label：名称    width： 列跨度 sort： 是否排序 */
            {prop: 'date', label: '日期', width: 120, sort: true},
            {prop: 'name', label: '姓名', width: 80},
            {prop: 'address', label: '地址', width: 280},
            {prop: 'sex', label: '性别', width: 80},
          ]
        }
      },
    },
    computed: {
      defaWidth: function () {
        const {width} = this.tableAttr
        return isNaN(width) ? width : width + 'px'
      }
    },
    methods: {
      handleClick(row, type, index) {
        this.$emit('tableOtherClick', row, type, index);
      }
    }
  }
</script>
