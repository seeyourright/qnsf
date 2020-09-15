<template>
  <div class="ctitle">
    <div class="title">
      <span>
        {{title}}
      </span>
    </div>
    <img class="brokenline" :src="require('../../../assets/image/dv/brokenline1.png')" alt="">
    <img class="circlelist1" :src="require('../../../assets/image/dv/circlelist.png')" alt="">
    <img class="circlelist2" :src="require('../../../assets/image/dv/circlelist.png')" alt="">
    <div class="highlight"></div>
  </div>
</template>

<script>
  export default {
    name: 'Ctitle',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .ctitle
    position relative
    width 100%
    height 32px
    border 1px solid #1B91FF
    box-sizing border-box
    .title
      position absolute
      height 100%
      width 100%
      display flex
      justify-content center
      align-items center
      span
        font-family "Source Han Sans CN"
        font-size 16px
        color #1783FF
        background linear-gradient(92deg, #5D95EA 0%, #B2F5FB 48.8525390625%, #75C9FB 100%)
        -webkit-background-clip text
        -webkit-text-fill-color transparent
    .brokenline
      position absolute
      top: -5px
      left: -12px
    .circlelist1
      position absolute
      top: 5px
      left: 12px
    .circlelist2
      transform rotate(180deg)
      position absolute
      top: 5px
      right: 12px
    .highlight
      position absolute
      bottom 0
      left 50%
      transform translate(-50%, 50%)
      height 6px
      width 120px
      background radial-gradient(ellipse, rgba(67, 220, 255, 1) 20%, transparent 80%)
</style>
