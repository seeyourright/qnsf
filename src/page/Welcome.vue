<template>
    <div>
      <div class="hhh">
        <div>欢迎您，{{$store.state.userInfo.username}}</div>
        <div style="margin-left: 100px">当前时间：{{time}}</div>
      </div>
<!--      <div>-->
<!--        <input type="text" v-model="dis">-->
<!--        <button @click="createW">新增电子围栏</button>-->
<!--        <button @click="getW">获取电子围栏</button>-->
<!--      </div>-->
<!--      <baidu-map :center="center" :zoom="zoom" @ready="mapReady" style="height:1080px" @click="mapClick" :scroll-wheel-zoom='true'>-->
<!--      </baidu-map>-->
    </div>
</template>

<script>
import baiduMap from '../api/baiduMap'
export default {
  name: 'Welcome',
  data () {
    return {
      time: '',
      dis: '',
      center: {lng: 107.528328, lat: 26.266253},
      zoom: 13
    }
  },
  mounted () {
    this.getTime()
    setInterval(this.getTime, 1000)
  },
  methods: {
    mapReady ({BMap, map}) {
      console.log(BMap, map)
      this.etBoundary(BMap, map)
    },
    mapClick () {

    },
    etBoundary (BMap, map) {
      var bdary = new BMap.Boundary();
      bdary.get("黔南布依族苗族自治州", function(rs){
        map.clearOverlays()
        let count = rs.boundaries.length
        if (count === 0) {
          alert('未能获取当前输入行政区域');
          return ;
        }
        let pointArray = [];
        for (var i = 0; i < count; i++) {
          let ply = new BMap.Polygon(rs.boundaries[i], {strokeWeight: 2, strokeColor: "#ff0000", fillOpacity: "0"})
          map.addOverlay(ply)
          pointArray = pointArray.concat(ply.getPath());
        }
         map.setViewport(pointArray);
      });
    },
    createW () {
      const params = {
        keyword: this.dis,
        dngashjdb: 1
      }
      this.$http.post('http://192.168.0.145:8080/api/community/test/test', params).then(res => {
        console.log(res)
      })
    },
    getW () {
      const params = {
        fenceIds: '7'
      }
      this.$http.get('http://192.168.0.145:8080/api/community/test/test1', params).then(res => {
        console.log(res)
      })
    },
    getTime () {
      this.time = this.$util.dateFormat(new Date())
    }
  }
}
</script>

<style lang="stylus" scoped>
  .hhh
    display flex
    padding 20px
    margin 20px 20px
    background-color: #f7f6f5
    font-size 14px
</style>
