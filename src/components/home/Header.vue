<template>
  <div class="h">
    <div class="title">黔南·智慧司法服务平台</div>
    <div class="userinfo">
      <el-popover
        placement="bottom"
        trigger="click"
        >
        <ul class="userlist">
          <li @click="logout">退出</li>
        </ul>
        <img slot="reference" src="../../assets/image/avatar.jpg" alt="">
      </el-popover>
      <span>{{$store.state.userInfo.username}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logout () {
      localStorage.removeItem('userInfo')
      localStorage.removeItem('token')
      this.$store.state.userInfo = {}
      this.$router.push('login')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .h
    height 100%
    background-color: #4685f9
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
      color #fff
      margin-right 100px
      img
        cursor pointer
        height 40px
        width 40px
        border-radius 50%
        margin-right 15px
  .userlist
    text-align center
    li
      cursor pointer
</style>
