<template>
  <div class="view_cont">
    <form class="el-form viewform" :class="className">
      <div class="el-form-item"
           v-for="(item, index) in listData"
           :style="{float:'left', width:colItem}"
           :key="index">
        <label class="el-form-item__label" :style="{width: labelWidthPX}">{{item.label}} ：</label>
        <div class="el-form-item__content" :style="{marginLeft: labelWidthPX}">
          <span>{{gshValue(item.prop)}}</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      /** 要渲染的数据 label */
      listData: {
        type: Array,
        default: null,
      },
      /** 数据对象 */
      listValue: Object,
      /** 列表的class名 */
      className: String,
      /** 一行显示的个数 */
      col: String,
      /** label的宽度 */
      labelWidth: String
    },
    computed: {
      colItem: function () {
        return `${1 / parseInt(this.col) * 100}%`
      },
      labelWidthPX: function () {
        return `${this.labelWidth || 58}px`
      },
    },
    methods: {
      gshValue: function (type) {
        return this.listValue[type]
      }
    }
  }
</script>
<style lang="scss" scoped>
  .view_cont {
    .el-form {
      overflow: hidden;
    }
  }
</style>
