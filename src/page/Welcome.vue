<template>
    <div>
      <div class="hhh">
        <div>欢迎您，{{$store.state.userInfo.username}}</div>
        <div style="margin-left: 100px">当前时间：{{time}}</div>
      </div>
<!--      <div>-->
<!--        <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 444.25 575.45">-->
<!--          <path ref="path1" class="cls-1" d="M125,171c214,234,105-92,11,24s-174,3-6,57S341,429,265,451-15,400,70,350s277-107,306-25,126,252,56,276-314,32-310,26,145-94,145-94,89,159,92,159,201-104,74-176-42,94-51,105-110.31,12-128.15-15S79,668,107,692s88,67,151,46" transform="translate(-31.72 -168.66)"/>-->
<!--        </svg>-->
<!--      </div>-->
    </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      time: ''
    }
  },
  mounted () {
    this.getTime()
    this.getUserInfo()
    setInterval(this.getTime, 1000)
    console.log(this.$refs.path1.getTotalLength())
  },
  methods: {
    getTime () {
      this.time = this.$util.dateFormat(new Date())
    },
    getUserInfo(){
      const that = this
      that.$http.axios({
          method: "post",
          url: that.$url.getUserInfo,
          params: {
            id: that.$store.state.userInfo.userId
          }
        })
        .then(function(res) {
           console.log('用户信息',res)
           if(res.data.code == 200){
               sessionStorage.setItem('userType',res.data.data.userType)
               sessionStorage.setItem('userId',res.data.data.id)
               sessionStorage.setItem('userPhone',res.data.data.phone)
               sessionStorage.setItem('unitId',res.data.data.unitId)
           }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
  .hhh
    display flex
    padding 20px
    margin 20px 20px
    background-color: #f7f6f5
    font-size 14px
  svg
    width 200px
  .cls-1
    fill transparent
    stroke black
    stroke-dasharray 3369
    stroke-dashoffset 3369
    animation gogo 3s infinite linear
  @keyframes gogo
    0%
      stroke-dashoffset 3369
    100%
      stroke-dashoffset 0
</style>
