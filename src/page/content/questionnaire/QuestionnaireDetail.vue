<template>
  <div class="mm">
    <div class="condition">
      <div>内容管理—普法问卷—详情</div>
    </div>
    <div class="tabbar">
      <div v-for="(item, i) in arr" :key="item.name" :class="{'tabbar-item': true, 'active': i === active}" @click="tabChange(item, i)">{{item.name}}</div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'QuestionnaireDetail',
    data () {
      return {
        id:null,
        arr: [
          {name: '问卷类型', path: ['/home/questionnaireDetail/questionnaireBase']},
          {name: '填写统计', path: ['/home/questionnaireDetail/questionnaireStatistics']},
        ],
        active: 0,
        questionnaire: {}
      }
    },
    created () {
      this.id = this.$route.query.id
      for (let i = 0; i < this.arr.length; i++) {
        if (this.arr[i].path.indexOf(this.$route.path) > -1) {
          this.active = i
        }
      }
    },
    methods: {
      tabChange (item, i) {
        this.active = i
        this.$router.replace({path: item.path[0],query: {id: this.id}})
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
