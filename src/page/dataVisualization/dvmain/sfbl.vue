<template>
  <div class="sfbl-box">
    <div class="sfbl-h">
      <div class="sfbl-index">序号</div>
      <div class="sfbl-name">名称</div>
      <div class="sfbl-number">办理量</div>
    </div>
    <div>
      <div class="sfbl-row" v-for="(item, i) in list">
        <div class="sfbl-index">{{i+1}}</div>
        <div class="sfbl-name">{{item.name}}</div>
        <div class="sfbl-number">{{item.number}}</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'sfbl',
    data () {
      return {
        list: [
          {name: '律师事务所', number: '21321'},
          {name: '鉴定所', number: '21321'},
          {name: '公证处', number: '21321'}
        ]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .sfbl-box
    height 100%
    width 100%
    box-sizing border-box
    padding 9px 37px
    .sfbl-h
      background rgba(8, 91, 255, 0.5)
      display flex
      color #7FCFFF
      font-size 16px
      height 40px
      border-radius 6px
      align-items center
    .sfbl-row
      display flex
      color #7FCFFF
      font-size 16px
      height 40px
      align-items center
      &+.sfbl-row
        border-top rgba(4, 46, 172, .8) 1px solid
    .sfbl-index
      flex 1
      text-align center
    .sfbl-name
      flex 5
      text-align center
    .sfbl-number
      flex 2
      text-align center
</style>
