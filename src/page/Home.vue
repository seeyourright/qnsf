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
  },
  created () {
    this.userTypeInit()
    this.wsInit()
  },
  methods: {
    wsInit () {
      const permissions = this.$store.state.permission
      const user = this.$store.state.user
      this.$store.state.ws = new WebSocket('ws://139.9.249.249:8091/ws/' + this.$store.state.user.id)
      this.$store.state.ws.onmessage = (res) => {
        const data = JSON.parse(res.data)
        if (data.type === '法律援助'&&permissions.indexOf('lawHelp') > -1) {
          if (user.userType === '2' && (data.cityNumber === user.unitId || user.unitId === '5227000000')) {
            this.flyz(data)
          }
        }
        if (data.type === '人民调解') {
          if (user.userType === '1') {
            this.rmtj(data)
          } else if (user.userType === '2' && user.unitId === '5227000000'&& permissions.indexOf('adjust') > -1 ) {
            this.rmtj(data)
          } else if (user.userType === '2' && permissions.indexOf('adjust') > -1) {
            const cityArr = data.cityNumber.split('-')
            if (!user.townId && user.unitId === cityArr[0]) {
              this.rmtj(data)
            }
            if (!user.communityId && user.townId === cityArr[1]) {
              this.rmtj(data)
            }
            if (user.communityId && user.communityId === cityArr[2]) {
              this.rmtj(data)
            }
          }
        }
      }
    },
    flyz (data) {
      const that = this
      sessionStorage.setItem('lawHelpId', data.applyId)
      this.$notify({
        duration: 0,
        position: 'bottom-right',
        message: `${data.applyForMan}在${this.$util.dateFormat(data.applyForTime)}申请了一条${data.type}信息`,
        onClick () {
          that.$router.push('helpDetail')
          this.type = 'success'
        }
      })
    },
    rmtj (data) {
      const that = this
      sessionStorage.setItem('adjustObj', data.yyNumber)
      const message = this.$store.state.user.userType === '2'
                      ? `${data.applyForMan}在${this.$util.dateFormat(data.applyForTime)}申请了一条${data.type}信息`
                      : `有一条${data.type}信息更新了`
      this.$notify({
        duration: 0,
        position: 'bottom-right',
        message: message,
        onClick () {
          that.$router.push('adjustDetail')
          this.type = 'success'
        }
      })
    },
    userTypeInit () {
      if (this.$store.state.user.userType === '4') {
        this.setLawyerServices()
      }
      if (this.$store.state.user.userType === '5') {
        this.setNotaryServices()
      }
      if (this.$store.state.user.userType === '6') {
        this.setJudicialAppraisal()
      }
    },
    setLawyerServices () {
      this.$http.get(this.$url.Law_Firm_List, {userId:this.$store.state.user.id}).then(res => {
        if (res.code === 200) {
          sessionStorage.setItem('lawyerServicesId', res.data[0].id)
        }
      })
    },
    setNotaryServices () {
      this.$http.get(this.$url.Notarial_Office_By_Id, {userId: this.$store.state.user.id}).then(res => {
        if (res.code === 200) {
          sessionStorage.setItem('notaryServicesId', res.data.id)
        }
      })
    },
    setJudicialAppraisal () {
      this.$http.get(this.$url.Appraisal_Office_List, {userId:this.$store.state.user.id}).then(res => {
        if (res.code === 200) {
          sessionStorage.setItem('appraisalOfficeId', res.data[0].id)
        }
      })
    }
  },
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
  /deep/ .d-btns
    margin-top 30px
    text-align center
    >*
      margin 0 30px
/*按钮*/
  /deep/ .text-danger
    color red
  /*  */
  /deep/ .el-table .el-image
    height 20px
    img
      width auto
  /deep/ .nocenter .el-image__inner--center
    top 0
    left 0
    transform none
</style>
