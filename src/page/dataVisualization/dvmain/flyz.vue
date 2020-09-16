<template>
  <div class="flyz-box">
    <div class="flyz-item">
      <img :src="require('../../../assets/image/dv/flyz/pass.png')" alt=""/>
      <span class="flyz-text">通过</span>
      <span class="flyz-number">{{pass}}</span>
    </div>
    <div class="flyz-item">
      <img :src="require('../../../assets/image/dv/flyz/nopass.png')" alt=""/>
      <span class="flyz-text">未通过</span>
      <span class="flyz-number">{{nopass}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'flyz',
    data () {
      return {
        pass: 2321,
        nopass: 2132
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .flyz-box
    height 100%
    width 100%
    display flex
    flex-direction column
    align-items center
    justify-content space-evenly
    .flyz-item
      display flex
      align-items center
      width 180px
      height 65px
      background: url("../../../assets/image/dv/flyz/flyzbg.png")
      background-size: 100% 100%;
      box-sizing border-box
      padding 0 20px
      img
        margin-right 4px
        width 35px
      .flyz-number
        color #00EAFF
        font-family baotuculangti
        font-size 16px
      .flyz-text
        color #fff
        font-family "Source Han Sans CN"
        font-size 14px
        width 50px
</style>
