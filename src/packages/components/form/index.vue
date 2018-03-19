<template>
  <el-form
    :model="ruleForm"
    :rules="rules"
    :class="className"
    status-icon
    ref="ruleForm"
    :label-width="defaWidth"
    style="overflow: hidden"
    class="demo-ruleForm">
    <el-form-item
      v-for="item in formList"
      :key="item.prop"
      :label="item.label"
      :prop="item.prop"
      :style="{float: isFloat, marginRight: '10px'}"
    >
      <template v-if="item.type === 'input'">
        <el-input v-model="ruleForm[item.prop]" :placeholder="item.placeholder">
        </el-input>
      </template>
      <template v-else-if="item.type === 'select'">
        <el-select v-model="ruleForm[item.prop]"
                   :placeholder="item.placeholder"
                   :multiple="item.multiple"
                   :value="ruleForm[item.prop]">
          <el-option
            v-for="(list, index) in item.data"
            :key="index"
            :label="list.label"
            :value="list.value">
          </el-option>
        </el-select>
      </template>
      <template v-else-if="item.type === 'checkbox'">
        <el-checkbox-group v-model="ruleForm[item.prop]">
          <el-checkbox
            v-for="(list, index) in item.data"
            :key="index"
            :label="list.value"
          >{{list.label}}
          </el-checkbox>
        </el-checkbox-group>
      </template>
      <template v-else-if="item.type === 'checkboxBtn'">
        <el-checkbox-group v-model="ruleForm[item.prop]">
          <el-checkbox-button
            v-for="(list, index) in item.data"
            :key="index"
            :label="list.value"
          >{{list.label}}
          </el-checkbox-button>
        </el-checkbox-group>
      </template>
      <template v-else-if="item.type === 'radio'">
        <el-radio-group v-model="ruleForm[item.prop]">
          <el-radio
            v-for="(list, index) in item.data"
            :key="index"
            :label="list.label"
          >{{list.label}}
          </el-radio>
        </el-radio-group>
      </template>
      <template v-else-if="item.type === 'radioBtn'">
        <el-radio-group v-model="ruleForm[item.prop]">
          <el-radio-button
            v-for="(list, index) in item.data"
            :key="index"
            :label="list.label"
          >{{list.label}}
          </el-radio-button>
        </el-radio-group>
      </template>
      <template v-else-if="item.type === 'time'">
        <el-date-picker
          v-model="ruleForm[item.prop]"
          type="datetime"
          :placeholder="item.placeholder">
        </el-date-picker>
      </template>
      <template v-else-if="item.type === 'button'">
        <el-button type="primary" @click="submitForm()">{{item.label}}</el-button>
      </template>
      <template v-else-if="item.type === 'number'">
        <el-input-number v-model="ruleForm[item.prop]">
        </el-input-number>
      </template>
      <div v-else>
        <el-input v-model="ruleForm[item.prop]">
        </el-input>
      </div>
    </el-form-item>
    <el-form-item
      label-width="0"
      :style="{float: isFloat, marginRight: '10px'}"
      class="el-form-item-btn"
    >
      <slot></slot>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    props: {
      /** 渲染带列表 */
      formList: {
        type: Array,
        default: null
      },
      /** 结果集合 */
      ruleForm: Object,
      /** 验证规则 */
      rules: Object,
      /** class 名称 */
      className: String,
      /** label 宽度 */
      labelWidth: {
        type: String,
        default: '100'
      },
      /** 是否浮动 */
      float: String
    },
    data() {
      return {}
    },
    computed: {
      defaWidth: function () {
        return isNaN(this.labelWidth) ? this.labelWidth : this.labelWidth + 'px'
      },
      isFloat: function () {
        return /true/.test(this.float) ? 'left' : 'inherit'
      }
    },
    methods: {
      submitForm() {
        return new Promise(resolve => {
          this.$refs['ruleForm'].validate(valid => {
            resolve(valid)
          })
        })
      },
      resetForm() {
        this.$refs['ruleForm'].resetFields()
      }
    }
  }
</script>
<style lang="scss" scoped>
</style>
