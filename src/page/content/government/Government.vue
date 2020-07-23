<template>
  <div class="mm">
    <div class="condition">
      <div>内容管理—法制政府</div>
    </div>
    <div class="tabbar">
      <div v-for="(item, i) in arr" :key="item.name" :class="{'tabbar-item': true, 'active': i === active}" @click="tabChange(item, i)">{{item.name}}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Government',
  data () {
    return {
      arr: [
        {name: '资讯管理', path: '/home/government/information'},
        {name: '民意测评', path: '/home/government/evaluation'}
      ],
      active: 0
    }
  },
  created () {
    for (let i = 0; i < this.arr.length; i++) {
      if (this.$route.fullPath === this.arr[i].path) {
        this.active = i
      }
    }
  },
  methods: {
    tabChange (item, i) {
      this.active = i
      this.$router.push(item.path)
    }
  },
  watch: {
  }
}
</script>

<style lang='stylus' scoped>
  .condition
    border-bottom 1px #aaa solid
    padding-bottom 10px
  .tabbar
    border-bottom 1px #aaa solid
    padding 10px 0
    &:after
      content ''
      display block
      clear both
    .tabbar-item
      width 150px
      height 40px
      line-height 40px
      text-align center
      box-shadow 0 0 3px 0 #444
      font-size 13px
      float left
      cursor pointer
      +.tabbar-item
        margin-left 10px
      &.active
        background-color: rgba(0,150,250,1);
        box-shadow 0 0 3px 0 rgba(0,150,250,1)
        color white
</style>
