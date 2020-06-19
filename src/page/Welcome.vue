<template>
    <div>
      <div class="hhh">
        <div>欢迎您，{{username}}</div>
        <div style="margin-left: 100px">当前时间：{{time}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'Welcome',
  data () {
    return {
      username: localStorage.getItem('username'),
      time: ''
    }
  },
  created () {
    this.getTime()
    setInterval(this.getTime, 1000)
  },
  methods: {
    getTime () {
      this.time = this.$util.dateFormat(new Date())
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
