<template>
  <div>
    <viewCont
      :listData="listData"
      className="compVidewCont"
      labelWidth="60"
      col="3"
    />
  </div>
</template>

<script>
  import viewCont from 'pkgs/components/view-cont'
  // import Api from './api.js'
  export default {
    components: {
      viewCont
    },
    data() {
      return {
        listData: []
      }
    },
    mounted() {
      this.getTableData()
    },
    methods: {
      getTableData: function () {
        // Api.GetItemApi({id: 'id'}).then(res => {
        //   this.listData = res.data
        // })
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
