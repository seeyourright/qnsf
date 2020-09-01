<template>
  <div class='container'>
    <img v-if='$store.state.isIE' class='image' src='http://img.yangrq.com/qnsfbgimg2' alt=''>
    <video v-else class='video' webkit-playsinline playsinline x-webkit-airplay x5-video-player-type='h5' x5-video-player-fullscreen x5-video-ignore-metadata preload autoplay muted loop src='http://img.yangrq.com/qnsfbgvd2'></video>
    <div class='mask'>
      <div class='box'>
        <form>
          <fieldset>
            <legend>黔南司法后台管理系统</legend>
            <div class='item'>
              <input type='text' v-model='username'>
              <div class='label'>用户名</div>
            </div>
            <div class='item'>
              <input type='password' v-model='password'>
              <div class='label'>密码</div>
            </div>
            <div class='item code'>
              <input type='text' @keydown.enter='submit' v-model='code'>
              <div class='label'>验证码</div>
              <VerificationCode ref='code'></VerificationCode>
            </div>
            <div class=''>
              <el-button type='text' class='btn' :loading='loading' @click='submit'>登录</el-button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import VerificationCode from '../components/VerificationCode'
export default {
  name: 'Login',
  components: {VerificationCode},
  data () {
    return {
      loading: false,
      username: '',
      password: '',
      code: ''
    }
  },
  created () {
  },
  methods: {
    submit () {
      if (!this.username) {
        this.$message.warning('请输入用户名')
        return false
      }
      if (!this.password) {
        this.$message.warning('请输入密码')
        return false
      }
      if (!this.code) {
        this.$message.warning('请输入验证码')
        return false
      }
      if (this.code.toLowerCase() !== this.$refs.code.identifyCode.toLowerCase()) {
        this.$message.warning('验证码错误')
        this.$refs.code.changeCode()
        return false
      }
      const params = {
        username: this.username,
        password: this.password,
        grant_type: 'password',
        scope: 'all',
        client_id: 'miniapp',
        client_secret: 'miniapp'
      }
      this.loading = true
      this.$http.axios.post(this.$url.login, qs.stringify(params)).then(res => {
        if (res) {
          this.getPermission(res.data.userId)
          this.getUser(res.data.userId)
          localStorage.setItem('userInfo', JSON.stringify(res.data))
          localStorage.setItem('token', res.data.token_type + res.data.access_token)
          this.$store.state.userInfo = res.data
        } else {
          this.$message.error('用户名或密码错误')
        }
      }).finally(res => {
        this.loading = false
      })
    },
    getPermission (uid) {
      this.$http.get(this.$url.Permission_By_User, {uid}).then(res => {
        if (res.code === 200) {
          const permissions = ['']
          for (let i = 0; i < res.data.length; i++) {
            permissions.push(res.data[i].name)
          }
          localStorage.setItem('permission', JSON.stringify(permissions))
          this.$store.state.permission = permissions
        } else {
          localStorage.setItem('permission', JSON.stringify(['']))
        }
      })
    },
    getUser (uid) {
      this.$http.get(this.$url.User_One, {id: uid}).then(res => {
        if (res.code === 200) {
          localStorage.setItem('user', JSON.stringify(res.data))
          this.$store.state.user = res.data
          this.$router.push('home')
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  $mcolor = rgba(255,255,255,0.8)
  $mcolor2 = rgba(100,200,255,0.8)
  .container
    position absolute
    height 100%
    width 100%
    top: 0
    left 0
  .image
    position absolute
    height 100%
    width 100%
  .video
    position absolute
    object-fit cover
    height 100%
    width 100%
  .mask
    overflow hidden
    position absolute
    height 100%
    width 100%
    top: 0
    left 0
    background-color: rgba(0,0,0,.2)
    z-index 100
  .box
    position absolute
    z-index 100
    top 50%
    left: 50%;
    transform translate(-50%, -50%)
    color $mcolor
    animation fall 1s
  @keyframes fall
    0%
      top:0
      opacity 0
    100%
      top: 50%
      opacity 1
  fieldset
    border $mcolor 2px solid
    padding 30px 30px
    legend
      padding 0 20px
      font-size 20px
    .item
      width 400px
      height 40px
      position relative
      display flex
      align-items flex-end
      overflow hidden
      @media screen and (max-width: 500px){
        width 250px
      }
      &+.item
        margin-top 10px
      .label
        position absolute
        bottom 5px
        left 0
        transition all .2s
      input
        font-size 16px
        color $mcolor
        width 100%
        outline none
        background-color:  transparent
        border-color transparent transparent $mcolor transparent
        border-width 1px
        transition all .5s
        padding-left 70px
        box-sizing border-box
        &:focus
          border-bottom-color: $mcolor2
          padding-left 0px
          color $mcolor2
          &+.label
            bottom 25px
            color $mcolor2
    .code
      input
        flex 1
        margin-right 10px
  .btn
    width 100%
    border $mcolor 1px solid
    text-align center
    height 40px
    margin-top 40px
    cursor pointer
    background-color: transparent;
    color $mcolor
    transition all .5s
    &:hover
      border $mcolor2 1px solid
      color $mcolor2
</style>
