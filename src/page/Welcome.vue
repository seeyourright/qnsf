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
<!--      <dv></dv>-->
    </div>
</template>

<script>
import dv from '../page/dataVisualization/DVmain'
export default {
  name: 'Welcome',
  components: {
    dv
  },
  data () {
    return {
      time: '',
      dis: '',
      center: {lng: 107.528328, lat: 26.266253},
      zoom: 13,
      map: null,
      BMap: null,
    }
  },
  mounted () {
    this.getTime()
    setInterval(this.getTime, 1000)
  },
  methods: {
    mapReady ({BMap, map}) {
      this.map = map
      this.BMap = BMap
    },
    mapClick () {

    },
    etBoundary (BMap, map, district) {
      var bdary = new BMap.Boundary();
      bdary.get(district, function(rs){
        console.log(rs)
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
        dngashjdb: 1,
        pengbing: '大傻逼'
      }
      this.$http.post('http://192.168.0.145:8080/api/community/test/test/entity/add', params).then(res => {
        console.log(res)
      })
    },
    getW () {
      const params = {
        fence_ids: 2,
      }
      this.$http.get('http://192.168.0.145:8080/api/community/test/test/fence/list', params).then(res => {
        for (let i = 0; i < res.fences.length; i++) {
          this.etBoundary (this.BMap, this.map, res.fences[i].district)

        }
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
