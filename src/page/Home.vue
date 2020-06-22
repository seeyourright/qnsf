<template>
  <div class="container">
    <el-container style="height: 100%">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container class="center">
        <el-aside width="auto">
          <Sider></Sider>
        </el-aside>
        <el-main style="padding: 0" v-if="$route.meta.fullScreen">
          <router-view></router-view>
        </el-main>
        <el-main v-else>
          <div class="main-box">
            <router-view></router-view>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '../components/home/Header'
import Sider from '../components/home/Sider'
export default {
  name: 'Home',
  components: {
    Header, Sider
  }
}
</script>

<style lang='stylus' scoped>
  .container
    position: absolute
    height: 100%
    width: 100%
    top: 0
    left: 0
    overflow hidden
  .el-header
    padding 0
    background-color #fff
    height 70px
    box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.3)
    overflow visible
    z-index 1999
    .header
      overflow hidden
  .center
    overflow hidden
    flex 1
  .el-aside
    font-size 14px
    z-index 1999
    box-shadow 4px 0px 8px 0px rgba(0, 0, 0, 0.2)
  .el-main
    background-color:#ECF0F5
    padding: 20px 12px 30px
    position relative
    height 100%
    max-height 100%
    .main-box
      min-height 100%
      overflow hidden
      background-color #fff
      min-width 900px
      box-shadow:4px 4px 8px 0px rgba(0, 0, 0, 0.2);
/*页面*/
  /deep/.mm
    padding 30px 2.5% 40px
  /deep/ .y-page
    text-align center
    margin-top 20px
/*按钮*/
  /deep/ .text-danger
    color red
  /*  */
  /deep/ .el-table .el-image
    img
      max-height 20px
      width auto
</style>
