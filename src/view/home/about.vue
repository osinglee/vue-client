<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="5">
        <div class="about">
          <p class="first">关于</p>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .about {
    color: #555;
    line-height: 30px;
    .first {
      text-align: center;
      font-size: 25px;
      padding: 40px 0 40px;
    }
  }
</style>
