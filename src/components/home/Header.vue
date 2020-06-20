<template>
  <div class="h">
    <div class="title">黔南·智慧司法服务平台</div>
    <div class="userinfo">
      <img src="../../assets/image/avatar.jpg" alt="">
      <span>{{$store.state.userInfo.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang='stylus' scoped>
  .h
    height 100%
    background-color: #006DF0
    display flex
    align-items center
    .title
      color white
      font-size 20px
      padding 20px
      flex 1
    .userinfo
      padding 0 17px
      display flex
      align-items center
      font-size 14px
      color #333333
      margin-right 100px
      img
        height 40px
        width 40px
        border-radius 50%
        margin-right 5px
</style>
