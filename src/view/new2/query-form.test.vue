<template>
  <div class="new2-query-form">
    <comp-queryform
      :formList="formList"
      :ruleForm="ruleForm"
      ref="refsForm"
      class="compForm"
      labelWidth="80"
      float="true"
    >
      <el-button style="width: 120px;" type="primary" @click="submitForm">查询</el-button>
      <el-button style="width: 120px;" type="primary" @click="resetForm">清空</el-button>
    </comp-queryform>
  </div>
</template>

<script>
  import CompQueryform from 'pkgs/components/form'
  // import Api from './api.js'

  export default {
    components: {
      CompQueryform
    },
    data() {
      return {
        formList: [
          {label: '账号 :', prop: 'login', type: 'input', placeholder: '请输入账号'},
          {label: '金额 :', prop: 'number', type: 'number', placeholder: '请输入数字'},
          {
            label: '下拉 :',
            prop: 'selectValues',
            type: 'select',
            placeholder: '选择密码',
            data: [
              {label: '区域一', value: '1'},
              {label: '区域二', value: '2'},
              {label: '区域三', value: '3'},
            ]
          },
          {
            label: '下拉多选 :',
            prop: 'selectValuesMu',
            type: 'select',
            placeholder: '选择密码',
            multiple: true,
            data: [
              {label: '区域一', value: '1'},
              {label: '区域二', value: '2'},
              {label: '区域三', value: '3'},
            ]
          },
          {
            label: '多选 :',
            prop: 'checkboxValue',
            type: 'checkbox',
            data: [
              {label: '地推活动', value: 1},
              {label: '线下主题活', value: 2},
              {label: '单纯品牌曝光', value: 3},
            ]
          },
          {
            label: '单选 :',
            prop: 'radioValue',
            type: 'radio',
            data: [
              {label: '备选项11', value: 1},
              {label: '备选项22', value: 2},
              {label: '备选项33', value: 3},
            ]
          },
          {label: '日期时间 :', prop: 'dateTime', type: 'time', placeholder: '请输入日期时间'},
        ],
        ruleForm: {
          login: '',
          selectValues: '',
          selectValuesMu: [],
          checkboxValue: [],
          radioValue: '',
          dateTime: '',
          number: '',
        },
      }
    },
    methods: {
      submitForm() {
        this.$refs['refsForm'].submitForm().then(valid => {
          if (valid) {
            this.$emit('onOk', this.ruleForm)
            // Api.AddApi(this.ruleForm).then(res => {
            //   if (res.success) {
            //     this.$message({
            //       message: '提交成功',
            //       type: 'success',
            //       duration: 3.5 * 1000
            //     })
            //   }
            // })
          } else {
            return false;
          }
        });
      },
      resetForm() {
        this.$refs['refsForm'].resetForm()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .new2-query-form {
    :global {
      .el-form-item__label {
        font-weight: bold;
      }
    }
  }
</style>
