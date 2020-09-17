<template>
    <div ref="dv" class="father">
      <div class="header">
        <div class="header-left">
<!--          <div>-->
<!--            <div>-->
<!--              开始时间-->
<!--              <el-date-picker></el-date-picker>-->
<!--            </div>-->
<!--          </div>-->
        </div>
        <div class="header-center">
          <div class="header-title">法治黔南.智慧司法大数据平台</div>
          <div class="header-title-en">
            RULE OF LAW QIANNAN. SMART JUDICIAL BIG DATA PLATFORM
          </div>
        </div>
        <div class="header-right">
          <div>
            <div class="header-date">
              <img :src="require('../../assets/image/dv/date.png')" alt="">
              <span>{{date|timefilter}}</span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <div class="box1">
        <div class="box1-item" v-for="item in list">
          <img :src="item.img" alt="">
          <div>
            <div class="box1-item-name">{{item.name}}</div>
            <i-count-up class="box1-item-number" :endVal="item.number"></i-count-up>
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="box2-item1">
          <div class="sffw container">
            <ctitle title="司法服务机构"></ctitle>
            <div class="sffw-items">
              <sffw></sffw>
            </div>
          </div>
          <div class="sjry container">
            <ctitle title="社区矫正对象"></ctitle>
            <div class="sjry-items">
              <sjry></sjry>
            </div>
          </div>
        </div>
        <div class="box2-item2">
          <div class="map container">
            <Amap></Amap>
          </div>
        </div>
        <div class="box2-item3">
          <div class="box2-item3-3">
            <div class="yhzx container">
              <ctitle title="用户及咨询数量"></ctitle>
              <div class="yhzx-items">
                <yhzx></yhzx>
              </div>
            </div>
            <div class="flyz container">
              <ctitle title="法律援助数量"></ctitle>
              <div class="flyz-items">
                <flyz></flyz>
              </div>
            </div>
          </div>
          <div class="sfbl container">
            <ctitle title="司法办理数据统计"></ctitle>
            <div class="sfbl-items">
              <sfbl></sfbl>
            </div>
          </div>
          <div class="rmtj container">
            <ctitle title="人民调解数量"></ctitle>
            <div class="rmtj-items">
              <rmtj></rmtj>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import Ctitle from './dvmain/Ctitle'
import sffw from './dvmain/sffw'
import sjry from './dvmain/sjry'
import yhzx from './dvmain/yhzx'
import flyz from './dvmain/flyz'
import sfbl from './dvmain/sfbl'
import rmtj from './dvmain/rmtj'
import Amap from './dvmain/amap'
import ICountUp from 'vue-countup-v2';
export default {
  name: 'DVmain',
  components: {
    Ctitle,
    sffw,
    sjry,
    yhzx,
    flyz,
    sfbl,
    rmtj,
    Amap,
    ICountUp
  },
  mounted () {
    // this.getWeather()
    setInterval(() => { this.date = new Date()}, 1000)
    this.$refs.dv.style.transform = `scale(${window.innerWidth / 1920}, ${window.innerHeight / 1080})`
    window.addEventListener('resize', this.dvResize())
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.dvResize())
  },
  data () {
    return {
      date: new Date(),
      background: require('../../assets/image/dv/background.png'),
      list: [
        {name: '司法局', number: 233, img: require('../../assets/image/dv/tongji/sfj.png')},
        {name: '司法所', number: 4533, img: require('../../assets/image/dv/tongji/sfs.png')},
        {name: '调解人员', number: 34534, img: require('../../assets/image/dv/tongji/tjy.png')},
        {name: '人民调解案件', number: 232413, img: require('../../assets/image/dv/tongji/rmtj.png')},
        {name: '法律援助', number: 23213, img: require('../../assets/image/dv/tongji/flyz.png')}
      ]
    }
  },
  methods: {
    dvResize () {
      let timer
      return () => {
        if(timer) clearTimeout(timer);
        timer = setTimeout(() => {
          if (this.$refs.dv) {
            this.$refs.dv.style.transform = `scale(${window.innerWidth / 1920}, ${window.innerHeight / 1080})`
          }
        },500)
      }
    },
    getWeather () {
      this.$http.get(this.$url.Get_Weather, {appsecret: 'J1uFgDRP', city: '都匀'}).then(res => {

      })
    }
  },
  filters: {
    timefilter (date) {
      let a = ''
      const hours = date.getHours()
      const minutes = date.getMinutes()
      const seconds = date.getSeconds()
      const day = date.getDay()
      if (hours < 12) {
        a += 'AM'
      } else {
        a += 'PM'
      }
      function pluszero (n)  {
        if ( n < 10) return '0' + n;
        return n
      }
      a += ` ${pluszero(hours)}:${pluszero(minutes)}:${pluszero(seconds)} `
      switch (day) {
        case 0: a += '星期日'; break
        case 1: a += '星期一'; break
        case 2: a += '星期二'; break
        case 3: a += '星期三'; break
        case 4: a += '星期四'; break
        case 5: a += '星期五'; break
        case 6: a += '星期六'; break
      }
      return a
    },
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
    z-index 2000
    background-size 100% 100%
    transform scale(.8, .8)
    transform-origin 0 0
    .container
      position relative
      display flex
      flex-direction column
      >*
        z-index 1
        flex-shrink 0
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
      display flex
      .header-left
        flex 1
      .header-center
        flex 1
        .header-title
          text-align center
          font-size 30px
          color #7EFDFE
          background linear-gradient(0deg, rgba(255, 255, 255, 0.65) 0%, rgba(126, 253, 254, 1) 100%)
          -webkit-background-clip text
          -webkit-text-fill-color transparent
          font-family "Source Han Sans CN"
          font-weight 600
        .header-title-en
          text-align center
          font-size 13px
          color #6EB7F1
          font-family "Roboto Light"
          margin-top 21px
      .header-right
        flex 1
        box-sizing border-box
        .header-date
          color #07EDF2
          display flex
          align-items center
          font-family baotuculangti
          height 42px
          margin-left 200px
          img
            margin-right 10px
    .box1
      height 120px
      width 96%
      margin 0 auto
      background rgba(0, 0, 88, 0.42)
      border 1px solid rgba(20, 51, 145, 0.42)
      display flex
      align-items center
      justify-content space-between
      .box1-item
        padding 0 20px
        display flex
        align-items center
        justify-content center
        img
          margin-right 20px
        .box1-item-name
          color white
          font-size 20px
          font-family "Source Han Sans CN"
          margin-bottom 25px
        .box1-item-number
          font-size 32px
          font-family "baotuculangti"
          color #80E4E8
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
    flex 1
  .sjry-items
    flex 1
  .yhzx-items
    flex 1
  .flyz-items
    flex 1
  .sfbl-items
    flex 1
  .rmtj-items
    flex 1
</style>
