<template>
  <div class="payment">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>新增</span>
      </div>
      <div class="text item">
        <Form
          :formList="formList"
          :ruleForm="ruleForm"
          :rules="rules"
          ref="refsForm"
          class="compForm"></Form>
        <div>
          <el-button style="width: 200px;" type="primary" @click="submitForm">确定</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
  import Form from 'pkgs/components/form'

  export default {
    components: {
      Form
    },
    data() {
      return {
        formList: [
          {label: '账号', prop: 'login', type: 'input', placeholder: '请输入账号'},
          {label: '金额', prop: 'number', type: 'number', placeholder: '请输入数字'},
          {
            label: '下拉',
            prop: 'selectValues',
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
            label: '多选',
            prop: 'checkboxValue',
            type: 'checkbox',
            data: [
              {label: '地推活动', value: 1},
              {label: '线下主题活', value: 2},
              {label: '单纯品牌曝光', value: 3},
            ]
          },
          {
            label: '多选bnt',
            prop: 'checkboxValuebtn',
            type: 'checkboxBtn',
            data: [
              {label: '地推活动', value: 1},
              {label: '线下主题活', value: 2},
              {label: '单纯品牌曝光', value: 3},
            ]
          },
          {
            label: '单选',
            prop: 'radioValue',
            type: 'radio',
            data: [
              {label: '备选项11', value: 1},
              {label: '备选项22', value: 2},
              {label: '备选项33', value: 3},
            ]
          },
          {
            label: '单选btn',
            prop: 'radioValueBtn',
            type: 'radioBtn',
            data: [
              {label: '备选项11', value: 1},
              {label: '备选项22', value: 2},
              {label: '备选项33', value: 3},
            ]
          },
          {label: '日期时间', prop: 'dateTime', type: 'time', placeholder: '请输入日期时间'},
        ],
        ruleForm: {
          login: '',
          selectValues: '',
          checkboxValue: [],
          checkboxValuebtn: [],
          radioValue: '',
          radioValueBtn: '',
          dateTime: '',
          number: '',
        },
        rules: {
          login: [
            {required: true, message: '请输入登陆账户', trigger: 'blur'},
            {min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur'}
          ],
          number: [
            {required: true, message: '请输入登陆密码', trigger: 'change'}
          ],
        }
      }
    },
    methods: {
      submitForm() {
        this.$refs['refsForm'].submitForm().then(res => {
          console.log(res);
          console.log(this.ruleForm);
        })
      },
    }
  }
</script>

<style lang="scss" scoped>
  .compForm {
    // todo 开始你对表演
  }
</style>
