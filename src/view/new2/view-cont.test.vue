<template>
  <div>
    <view-cont
      :listData="listData"
      :listValue="listValue"
      className="compVidewCont"
      labelWidth="95"
      col="3"
    />
  </div>
</template>

<script>
  import viewCont from 'pkgs/components/view-cont'

  export default {
    components: {
      viewCont
    },
    data() {
      return {
        listData: [
          {
            prop: 'login',
            label: '账号',
          }, {
            prop: 'number',
            label: '金额',
          }, {
            prop: 'selectValues',
            label: '下拉',
          }, {
            prop: 'selectValuesMu',
            label: '下拉多选',
          }, {
            prop: 'checkboxValue',
            label: 'checkbox',
          }, {
            prop: 'checkboxValuebtn',
            label: 'checkboxBtn',
          }, {
            prop: 'radioValue',
            label: '单选',
          }, {
            prop: 'radioValueBtn',
            label: '单选btn',
          }, {
            prop: 'dateTime',
            label: '日期时间',
          },
        ],
      }
    },
    props: {
      listValue: Object
    },
  }
</script>

<style lang="scss" scoped>
</style>
