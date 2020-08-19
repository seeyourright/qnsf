<template>
    <div>
      <div class="hhh">
        <div>欢迎您，{{$store.state.userInfo.username}}</div>
        <div style="margin-left: 100px">当前时间：{{time}}</div>
      </div>
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
</style>
