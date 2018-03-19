<template>
  <div id="new-vuex">
    <el-card class="box-card">
      <div slot="header" class="clear-fix">
        <span>卡片名称</span>
      </div>
      <div class="text item">
        <el-button type="primary" @click="newAdd('新增')">新增</el-button>
        <comp-table>
        </comp-table>
        <el-dialog
          :title="dialogTitle"
          :visible.sync="dialogVisible"
          width="60%"
          :before-close="closeDialog">
          <comp-form
            ref="newForm"
            v-if="dialogTitle !== '查看'"
          >
          </comp-form>
          <view-cont
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
  import {mapState, mapActions} from 'vuex'

  export default {
    name: 'new-vuex',
    data() {
      return {}
    },
    components: {
      CompTable,
      CompForm,
      viewCont,
    },
    computed: mapState({
      dialogVisible: state => state.newPage.dialogVisible,
      dialogTitle: state => state.newPage.dialogTitle,
    }),
    methods: {
      ...mapActions([
        'closeDialog',
        'newAdd'
      ]),
    }
  }
</script>

<style lang="scss" scoped>
</style>
