<template>
  <div class="sjry-box">
    <div ref="pie" class="sjry-pie"></div>
    <div class="sjry-type">
      <div v-for="(type, i) in types" @click="typeClick(type, i)" :class="{'sjry-ti': true, active: typeIndex === i}">
        <div class="sjry-ti-name">{{type.name}}</div>
        <div class="sjry-ti-number">占比:{{type.number}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'sjry',
  data () {
    return {
      pie: null,
      types: [
        {name: '年龄分布', number: '18%'},
        {name: '犯罪类型', number: '24%'}
      ],
      typeIndex: 0
    }
  },
  props: {

  },
  mounted () {
    this.pie = echarts.init(this.$refs.pie)
    let option = {
      title:{
        text:"社矫人员数量",
        left:"center",
        top:"40%",
        textStyle:{
          color:"#27D9C8",
          fontSize:20,
          align:"center",
          fontFamily: 'baotuculangti'
        }
      },
      graphic:{
        type:"text",
        left:"center",
        top:"52%",
        style:{
          text:"121321",
          textAlign:"center",
          fill:"#27D9C8",
          fontSize: 30,
          fontFamily: 'baotuculangti'
        }
      },
      series: [
        {
          name: '社矫人员',
          type: 'pie',
          radius: ['70%', '85%'],
          avoidLabelOverlap: false,
          data: [
            {value: 2344, name: 'asd',itemStyle: {color: '#DC5200'}},
          ],
          label: {
            show: false
          },
          animation: false,
        },
        {
          name: '社矫人员',
          type: 'pie',
          radius: ['70%', '85%'],
          avoidLabelOverlap: false,
          data: [
            {value: 335, name: 'asd',itemStyle: {color: '#0CFF84', opacity: 0}},
            {value: 2344, name: 'asd',itemStyle: {color: '#FAD400'}},
          ],
          label: {
            show: false
          },
          itemStyle: {

          }
        },

      ]
    }
    this.pie.setOption(option)
  },
  methods: {
    typeClick (type, i) {
      this.typeIndex = i
    }
  }
}
</script>

<style lang='stylus' scoped>
  .sjry-box
    height 100%
    width 100%
    display flex
    .sjry-pie
      width 50%
      height 100%
    .sjry-type
      display flex
      flex-direction column
      justify-content center
      align-items center
      .sjry-ti
        height 66px
        width 212px
        background url("../../../assets/image/dv/sjry/sjlxbg.png")
        background-size 100% 100%
        position relative
        cursor pointer
        .sjry-ti-name
          color #70A4E9
          font-size 18px
          position absolute
          top 12px
          left 12px
        .sjry-ti-number
          color #70A4E9
          font-size 18px
          position absolute
          bottom 6px
          right 17px
        +.sjry-ti
          margin-top 35px
        &.active
          background url("../../../assets/image/dv/sjry/sjlxbg1.png")
          background-size 100% 100%
          .sjry-ti-name
            color #DB5200
          .sjry-ti-number
            color #00FCF9
</style>
