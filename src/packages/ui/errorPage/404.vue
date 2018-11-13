<template>
  <div style="background:#f0f2f5;margin-top: -20px;height:100%;">
    <div class="wscn-http404">
      <div class="bullshit">
        <div class="bullshit__oops">发生错误 404!</div>
        <div class="bullshit__info">{{ message }}</div>
        <div class="bullshit__info">请检查您输入的网址是否正确</div>
        <div class="bullshit__info">请点击以下按钮返回主页或者发送错误报告</div>
        <a class="bullshit__return-home" @click="$router.go(-1)">返回首页</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'page404',
    data() {
      return {}
    },
    computed: {
      message() {
        return '抱歉，给您带来不便，请联系管理员...'
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .wscn-http404 {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    .bullshit {
      width: 500px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      padding: 20px 0;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        color: #1482f0;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 30px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        display: block;
        float: left;
        width: 110px;
        height: 36px;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        opacity: 0;
        font-size: 14px;
        line-height: 36px;
        cursor: pointer;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(100px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
</style>
