<template>
    <div>
      <div style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);text-align: center;color: #aaa">
        <div style="font-size: 200px">404</div>
        <div style="margin: 10px;font-size: 30px">您访问的地址不存在</div>
        <router-link to="/home" style="font-size: 20px;color: #2e38ff">返回首页</router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: '404'
}
</script>

<style lang='stylus' scoped>

</style>
