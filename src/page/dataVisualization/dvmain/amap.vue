<template>
  <div class="map-box">
    <div class="map" ref="map"></div>
    <y-select
      style="position: absolute; top: 50px;right: 30px;width: 200px"
      :data = maplist
      v-model="city"
      datalabel="name"
      datavalue="name"
      @change="setMap"
    ></y-select>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import YSelect from '../components/Select'
  export default {
    name: 'amap',
    components:{
      YSelect
    },
    data () {
      return {
        city: '黔南布依族苗族自治州',
        mapChart: null,
        maplist: [
          {name: '黔南布依族苗族自治州', adcode: '522700', map: require('../../../../static/map/522700')},
          {name: '都匀市', adcode: '522701', map: require('../../../../static/map/522700/522701')},
          {name: '福泉市', adcode: '522702', map: require('../../../../static/map/522700/522702')},
          {name: '荔波县', adcode: '522722', map: require('../../../../static/map/522700/522722')},
          {name: '贵定县', adcode: '522723', map: require('../../../../static/map/522700/522723')},
          {name: '瓮安县', adcode: '522725', map: require('../../../../static/map/522700/522725')},
          {name: '独山县', adcode: '522726', map: require('../../../../static/map/522700/522726')},
          {name: '平塘县', adcode: '522727', map: require('../../../../static/map/522700/522727')},
          {name: '罗甸县', adcode: '522728', map: require('../../../../static/map/522700/522728')},
          {name: '长顺县', adcode: '522729', map: require('../../../../static/map/522700/522729')},
          {name: '龙里县', adcode: '522730', map: require('../../../../static/map/522700/522730')},
          {name: '惠水县', adcode: '522731', map: require('../../../../static/map/522700/522731')},
          {name: '三都县', adcode: '522732', map: require('../../../../static/map/522700/522732')},
        ]
      }
    },
    mounted () {
      this.mapChart = echarts.init(this.$refs.map)
      this.bindEvent()
      this.setMap('黔南布依族苗族自治州')
    },
    methods: {
      setMap (name) {
        for (let i = 0; i < this.maplist.length; i++) {
          if (name === this.maplist[i].name) {
            this.city = name
            this.mapInit(this.maplist[i])
            break
          }
        }
      },
      bindEvent () {
        this.mapChart.on('click', (e) => {
          this.setMap(e.name)
        })
      },
      mapInit (obj) {
        echarts.registerMap(obj.name, obj.map)
        const option = {
          geo: {
            map: obj.name,
            roam: false,
            itemStyle: {
              normal: {
                areaColor: '#064ECA',
                shadowColor: '#064ECA',
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                shadowBlur: 5,
                borderColor: '#33fCFf',
                borderWidth: 3,
              }
            },
            animation:true
          },
          series: [{
            type: 'map',
            roam: false,
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              },
              emphasis: {
                textStyle: {
                  color: '#fff'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#7D8AF6',
                borderWidth: 1,
                areaColor: '#0618A2'
              },
              emphasis: {
                areaColor: '#2AB8FF',
                borderWidth: 0,
                color: 'green'
              }
            },
            geoIndex: 1,
            map: obj.name
          }]
        }
        this.mapChart.setOption(option)
      },
    }
  }
</script>

<style lang='stylus' scoped>
  .map-box
    position relative
    height 100%
    width 100%
    .map
      position absolute
      height 100%
      width 100%
</style>
