<template>
      <div class="sffw-box">
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
</template>

<script>
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'sffw',
    components: {
      ICountUp
    },
    data () {
      return {
        sffw: {
          a: 1231,
          b: 554,
          c: 3453,
          d: 678,
          e: 5467,
          f: 856,
          g: 23423,
          h: 5464
        }
      }
    },
    computed: {
      sffwlist () {
        return [
          {img: require('../../../assets/image/dv/sffw/rmtj.png'), name: '人民调解委员会数量', number: this.sffw.a},
          {img: require('../../../assets/image/dv/sffw/flyz.png'), name: '法律援助服务中心数量', number: this.sffw.b},
          {img: require('../../../assets/image/dv/sffw/ydfp.png'), name: '异地扶贫搬迁数量', number: this.sffw.c},
          {img: require('../../../assets/image/dv/sffw/flfw.png'), name: '公共法律服务中心数量', number: this.sffw.d},
          {img: require('../../../assets/image/dv/sffw/lvsuo.png'), name: '律所数量', number: this.sffw.e},
          {img: require('../../../assets/image/dv/sffw/lvshi.png'), name: '律师数量', number: this.sffw.f},
          {img: require('../../../assets/image/dv/sffw/gzc.png'), name: '公证处数量', number: this.sffw.g},
          {img: require('../../../assets/image/dv/sffw/jds.png'), name: '鉴定所数量', number: this.sffw.h}
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
  .sffw-box
    height 100%
    width 100%
    position relative
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
</style>
