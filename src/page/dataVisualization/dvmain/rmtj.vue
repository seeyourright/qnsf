<template>
  <div class="rmtj-box">
    <div class="reach">
      <div class="reach-item" v-for="item in list">
        <img :src="item.img" alt="">
        <div class="reach-text">
          <div class="reach-name">{{item.name}}</div>
          <ICountUp :endVal="item.number" class="reach-number"></ICountUp>
        </div>
      </div>
    </div>
    <div>
      <div class="rmtj-title">案件类型比例</div>
      <div ref="outerbox" class="rmtj-types">
        <div ref="movebox" style="position: relative">
          <div class="rmtj-type" v-for="item in types">
            <div class="rmtj-type-name">{{item.name}}</div>
            <div class="rmtj-type-progress">
              <Progress
                text-inside
                :stroke-width="14"
                :percentage="item.number / typeTotal * 100"
                :format="format(item.number)"
              ></Progress>
            </div>
            <div class="rmtj-type-percent">{{(item.number / typeTotal * 100).toFixed(1)}}%</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ICountUp from 'vue-countup-v2';
  import { Progress } from 'element-ui';
  export default {
    name: 'rmtj',
    components: {
      ICountUp , Progress
    },
    data () {
      return {
        list: [
          {name: '人民条件总量', number: 43234, img: require('../../../assets/image/dv/rmtj/total.png')},
          {name: '达成', number: 32234, img: require('../../../assets/image/dv/rmtj/reach.png')},
          {name: '未达成', number: 3213, img: require('../../../assets/image/dv/rmtj/notreach.png')}
        ],
        types: [
          {name: '婚姻纠纷', number: 2113},
          {name: '婚姻纠纷1', number: 213},
          {name: '婚姻纠纷2', number: 213},
          {name: '婚姻纠纷3', number: 213},
          {name: '婚姻纠纷4', number: 213},
          {name: '婚姻纠纷5', number: 213},
          {name: '婚姻纠纷6', number: 213},
          {name: '婚姻纠纷7', number: 213}
        ]
      }
    },
    computed: {
      typeTotal () {
        let a = 0
        for (let i = 0; i < this.types.length; i++) {
          a += this.types[i].number
        }
        return a
      },
    },
    mounted () {
      this.scrollInit()
    },
    methods: {
      format (number) {
        return (p) => {return number}
      },
      scrollInit () {
        const outer = this.$refs.outerbox
        const move = this.$refs.movebox
        let l = move.children.length
        if (l < 6) {
          return false
        }
        let itemHeight = move.children[0].offsetHeight
        let top = 0
        function handler() {
          if (top < itemHeight ) {
            top+=0.5
            move.style.transform = 'translateY(-'+ top +'px)'
          } else {
            move.appendChild(move.children[0])
            top = 0
            move.style.transform = 'translateY(0)'
          }
          requestAnimationFrame(handler)
        }
        requestAnimationFrame(handler)
      },
    }
  }
</script>

<style lang='stylus' scoped>
  /deep/ .el-progress-bar__inner
    background linear-gradient(90deg, #08B8D0, #0678D0)
  /deep/ .el-progress-bar__outer
    background-color: #1A2132
  .rmtj-box
    height 100%
    width 100%
    box-sizing border-box
    padding 24px 34px
    .reach
      width 100%
      display flex
      justify-content space-between
      .reach-item
        width 157px
        height 58px
        background-color rgba(154, 204, 255, 0.13)
        border rgba(154, 204, 255, 0.2) 1px solid
        display flex
        align-items center
        padding 0 10px
        box-sizing border-box
        .reach-text
          .reach-name
            color #B8BCCC
            font-family "Source Han Sans CN"
            font-size 11px
            margin-bottom 5px
          .reach-number
            color #fff
            font-size 21px
            font-family "Source Han Sans CN"
    .rmtj-title
      height 50px
      line-height 50px
      color #EAE1E1
      font-family "Source Han Sans CN"
    .rmtj-types
      font-family "Source Han Sans CN"
      height 180px
      overflow hidden
      font-weight 100
      .rmtj-type
        height 36px
        display flex
        align-items center
        justify-content space-between
        color #EAF0F2
        font-size 14px
        >*
          flex-shrink 0
        .rmtj-type-name
          font-size 14px
          width 80px
          color #EAF0F2
          line-height 20px
        .rmtj-type-progress
          flex 1
          padding-right 15px
        .rmtj-type-percent
          width 100px
          color #0DFCFC
          font-size 14px
</style>
