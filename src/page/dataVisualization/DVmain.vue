<template>
    <div class="father">
      <div class="header">
        <div></div>
      </div>
      <div class="box1"></div>
      <div class="box2">
        <div class="box2-item1">
          <div class="sffw container">
            <ctitle title="司法服务数据统计"></ctitle>
            <div class="sffw-items">
              <div class="sffw-line1"></div>
              <div class="sffw-line2"></div>
              <div class="sffw-line3"></div>
              <div class="sffw-item" v-for="item in sffwlist">
                <img :src="item.img"/>
                <div>
                  <div class="sffw-item-name">{{item.name}}</div>
                  <ICountUp
                    class="sffw-item-number"
                    :endVal="item.number"
                  >{{item.number}}</ICountUp>
                </div>
              </div>
            </div>
          </div>
          <div class="sjry container">
            <ctitle title="社矫人员数据统计"></ctitle>
            <div class="sjry-items">
              <sjry></sjry>
            </div>
          </div>
        </div>
        <div class="box2-item2">
          <div class="map container"></div>
        </div>
        <div class="box2-item3">
          <div class="box2-item3-3">
            <div class="yhzx container">
              <ctitle title="用户及咨询数量统计"></ctitle>
              <div class="yhzx-items">
                <yhzx></yhzx>
              </div>
            </div>
            <div class="flyz container">
              <ctitle title="法律援助数量统计"></ctitle>
            </div>
          </div>
          <div class="sfbl container">
            <ctitle title="司法办理数据统计"></ctitle>
          </div>
          <div class="rmtj container">
            <ctitle title="人民调解数量统计"></ctitle>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import Ctitle from './dvmain/Ctitle'
import sjry from './dvmain/sjry'
import yhzx from './dvmain/yhzx'
import ICountUp from 'vue-countup-v2';
export default {
  name: 'DVmain',
  components: {
    Ctitle,
    sjry,
    yhzx,
    ICountUp
  },
  data () {
    return {
      background: require('../../assets/image/dv/background.png'),
      sffw: {
        a: 1231,
        b: 123,
        c: 123,
        d: 123,
        e: 123,
        f: 123,
        g: 123,
        h: 123
      }
    }
  },
  computed: {
    sffwlist () {
      return [
        {img: require('../../assets/image/dv/sffw/rmtj.png'), name: '人民调解委员会数量', number: this.sffw.a},
        {img: require('../../assets/image/dv/sffw/flyz.png'), name: '法律援助服务中心数量', number: this.sffw.b},
        {img: require('../../assets/image/dv/sffw/ydfp.png'), name: '异地扶贫搬迁数量', number: this.sffw.c},
        {img: require('../../assets/image/dv/sffw/flfw.png'), name: '公共法律服务中心数量', number: this.sffw.d},
        {img: require('../../assets/image/dv/sffw/lvsuo.png'), name: '律所数量', number: this.sffw.e},
        {img: require('../../assets/image/dv/sffw/lvshi.png'), name: '律师数量', number: this.sffw.f},
        {img: require('../../assets/image/dv/sffw/gzc.png'), name: '公证处数量', number: this.sffw.g},
        {img: require('../../assets/image/dv/sffw/jds.png'), name: '鉴定所数量', number: this.sffw.h}
      ]
    }
  },
  mounted () {
    setInterval(() => {
      this.sffw.a++
    },1000)
  }
}
</script>

<style lang='stylus' scoped>
  @font-face
    font-family baotuculangti
    src url("../../../static/font/baotuculangti.ttf")
  .father
    position fixed
    top 0
    left 0
    width 1920px
    height 1080px
    background url('../../assets/image/dv/background.png')
    z-index 9999
    background-size 100% 100%
    transform scale(.8, .8)
    transform-origin 0 0
    .container
      position relative
      display flex
      flex-direction column
      >*
        z-index 1
      &:before
        content ''
        display block
        position absolute
        top 0
        left 0
        height 100%
        width 100%
        box-shadow rgba(255, 255, 255, 0.3) 0 0 20px 0 inset
        clip-path polygon(1% 0, 0 1%, 0 99%, 1% 100%, 99% 100%, 100% 99%, 100% 1%, 99% 0)
        z-index 0
    .header
      margin-top 32px
      width 100%
      height 84px
      background url('../../assets/image/dv/header.png')
      background-repeat: no-repeat;
      background-size 100% auto
      position relative
    .box1
      height 120px
      width 96%
      margin 0 auto
      background rgba(0, 0, 88, 0.42)
      border 1px solid rgba(20, 51, 145, 0.42)
    .box2
      height 800px
      width 96%
      margin 25px auto
      display flex
      .box2-item1
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        .sffw
          background url('../../assets/image/dv/bg/sffw.png')
          height 430px
          background-size 100% 100%
        .sjry
          background url('../../assets/image/dv/bg/sjry.png')
          height 350px
          background-size 100% 100%
      .box2-item2
        flex 1.2
        margin 0 1%
        .map
          background url('../../assets/image/dv/bg/dt.png')
          height 100%
          width 100%
          background-size 100% 100%
      .box2-item3
        flex 1
        display flex
        flex-direction column
        justify-content space-between
        .box2-item3-3
          display flex
          height 200px
          .yhzx
            flex: 1.7
            margin-right 2%
            background url('../../assets/image/dv/bg/yhzx.png')
            background-size 100% 100%
          .flyz
            flex: 1.2
            background url('../../assets/image/dv/bg/flyz.png')
            background-size 100% 100%
        .sfbl
          height 220px
          background url('../../assets/image/dv/bg/sjry.png')
          background-size 100% 100%
        .rmtj
          height 350px
          background url('../../assets/image/dv/bg/rmtj.png')
          background-size 100% 100%
  .sffw-items
    position relative
    flex 1
    .sffw-item
      display flex
      align-items center
      width 50%
      height 25%
      float left
      padding 0 5%
      box-sizing border-box
      img
        margin-right 10px
      .sffw-item-name
        color white
        font-size 15px
        font-family baotuculangti
        margin-bottom 5px
      .sffw-item-number
        color rgba(71, 227, 255, 1)
        font-size 32px
        font-family baotuculangti
    .sffw-line1
      width 450px
      height 2px
      background linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(71, 227, 255, 0.98) 50%, rgba(255, 255, 255, 0) 100%)
      opacity 0.4
      position absolute
      top 25%
      right 0
    .sffw-line2
      width 450px
      height 2px
      background linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, rgba(71, 227, 255, 0.98) 50%, rgba(255, 255, 255, 0) 100%)
      opacity 0.4
      position absolute
      top 75%
      right 0
    .sffw-line3
      width 2px
      height 100%;
      background: linear-gradient(0deg, rgba(255, 255, 255, 0) 0%, rgba(71, 227, 255, 0.98) 25%, rgba(255, 255, 255, 0) 50%, rgba(71, 227, 255, 0.98) 75%, rgba(255, 255, 255, 0) 100%)
      opacity 0.4
      position absolute
      left 50%
      top 0
  .sjry-items
    flex 1
  .yhzx-items
    flex 1
</style>
