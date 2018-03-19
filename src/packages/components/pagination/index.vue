<template>
  <el-pagination
    background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page"
    :page-sizes="[50, 100, 150, 200]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount">
  </el-pagination>
</template>

<script>
  export default {
    data() {
      return {}
    },
    mounted() {
    },
    props: {
      page: {
        type: Number,
        default: 1
      },
      pageSize: {
        type: Number,
        default: 50,
      },
      totalCount: {
        type: Number,
        default: 100
      }
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('handleSizeChange', val);
      },
      handleCurrentChange(val) {
        this.$emit('handleCurrentChange', val);
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
