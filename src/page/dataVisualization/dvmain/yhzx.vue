<template>
  <div class="yhzx-box">
    <div ref="zcl" class="yhzx-item"></div>
    <div ref="zxl" class="yhzx-item"></div>
    <div ref="lyl" class="yhzx-item"></div>
  </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts-liquidfill'
export default {
  name: 'yhzx',
  data () {
    return {
      zclliquid: null,
      zxlliquid: null,
      lylliquid: null,
      zcl: 75665,
      zxl: 564,
      lyl: 45654
    }
  },
  mounted () {
    this.zclInit()
    this.zxlInit()
    this.lylInit()
  },
  methods: {
    zclInit () {
      this.zclliquid = echarts.init(this.$refs.zcl)
      let option = {
        title: {
          text: '注册量',
          top: '80%',
          left: 'center',
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 14,
            fontFamily: "Source Han Sans CN"
          },
        },
        series: [{
          type: 'liquidFill',
          top: '10',
          data: [{
            value: 0.8,
            direction: 'left',
            itemStyle: {
              color: '#9C6C09'
            }
          }, {
            value: 0.8,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#FFB924' // 0% 处的颜色
                }, {
                  offset: 1, color: '#9C6C09' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }],
          label: {
            fontSize: 18,
            color: '#ffffff',
            formatter: this.zcl.toString(),
            fontFamily: 'baotuculangti'
          },
          amplitude: '5%',
          waveLength: '100%',
          radius: '80%',
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0, color: 'transparent'
              }, {
                offset: 1, color: 'rgba(255,255,255,.3)'
              }],
              global: false
            }
          },
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              color: 'none',
              borderColor: 'rgba(255, 252, 32, .1)',
              borderWidth: 15
            }
          },
        }]
      }
      this.zclliquid.setOption(option)
    },
    zxlInit () {
      this.zxlliquid = echarts.init(this.$refs.zxl)
      let option = {
        title: {
          text: '咨询量',
          top: '80%',
          left: 'center',
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 14,
            fontFamily: "Source Han Sans CN"
          },
        },
        series: [{
          type: 'liquidFill',
          data: [{
            value: 0.3,
            direction: 'left',
            itemStyle: {
              color: '#40D0FD'
            }
          }, {
            value: 0.3,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#13F6BE' // 0% 处的颜色
                }, {
                  offset: 1, color: '#40D0FD' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }],
          label: {
            fontSize: 18,
            color: '#ffffff',
            formatter:  this.zxl.toString(),
            fontFamily: 'baotuculangti'
          },
          amplitude: '5%',
          waveLength: '100%',
          radius: '80%',
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0, color: 'transparent'
              }, {
                offset: 1, color: 'rgba(255,255,255,.3)'
              }],
              global: false
            }
          },
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              color: 'none',
              borderColor: 'rgba(64, 208, 253, .1)',
              borderWidth: 15
            }
          },
        }]
      }
      this.zxlliquid.setOption(option)
    },
    lylInit () {
      this.lylliquid = echarts.init(this.$refs.lyl)
      let option = {
        title: {
          text: '留言量',
          top: '80%',
          left: 'center',
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 14,
            fontFamily: "Source Han Sans CN"
          },
        },
        series: [{
          type: 'liquidFill',
          data: [{
            value: 0.3,
            direction: 'left',
            itemStyle: {
              color: '#40D0FD'
            }
          }, {
            value: 0.3,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#13F6BE' // 0% 处的颜色
                }, {
                  offset: 1, color: '#40D0FD' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          }],
          label: {
            fontSize: 18,
            color: '#ffffff',
            formatter:  this.lyl.toString(),
            fontFamily: 'baotuculangti'
          },
          amplitude: '5%',
          waveLength: '100%',
          radius: '80%',
          backgroundStyle: {
            color: {
              type: 'radial',
              x: 0.5,
              y: 0.5,
              r: 0.5,
              colorStops: [{
                offset: 0, color: 'transparent'
              }, {
                offset: 1, color: 'rgba(255,255,255,.3)'
              }],
              global: false
            }
          },
          outline: {
            show: true,
            borderDistance: 0,
            itemStyle: {
              color: 'none',
              borderColor: 'rgba(64, 208, 253, .1)',
              borderWidth: 15
            }
          },
        }]
      }
      this.lylliquid.setOption(option)
    }
  },
}
</script>

<style lang='stylus' scoped>
  .yhzx-box
    height 100%
    width 100%
    display flex
    .yhzx-item
      flex 1
</style>
