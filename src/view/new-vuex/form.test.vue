<template>
  <div class="payment">
    <Form
      :formList="formList"
      :ruleForm="ruleForm"
      :rules="rules"
      ref="refsForm"
      class="compForm"></Form>
    <el-button style="width: 100%;" type="primary" @click="submitclick">确定</el-button>
  </div>
</template>

<script>
  import Form from 'pkgs/components/form'
  import {mapState, mapActions} from 'vuex'
  // import Api from './api.js'

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
            data: [
              {label: '区域一', value: '1'},
              {label: '区域二', value: '2'},
              {label: '区域三', value: '3'},
            ]
          },
          {
            label: '下拉多选',
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
    computed: mapState({
      ruleForm: state => state.newPage.ruleForm,
    }),
    methods: {
      ...mapActions([
        'submitForm',
      ]),
      submitclick() {
        this.$refs['refsForm'].submitForm().then(valid => {
          if (valid) {
            this.submitForm()
          } else {
            return false;
          }
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .compForm {
    // todo 开始你对表演
  }
</style>
