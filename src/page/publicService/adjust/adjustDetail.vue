<template>
  <div class="adjust_detail" >
   
    <!-- <p class="lawTitle" @click="reset">reset</p> -->
    <!-- 申请信息 -->
    <div class="add_row1">
      <div class="add_row1_item">
        <span class="add_key">预约号:</span>
        <span class="add_value">{{orderNum}}</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">调解方式:</span>
        <span class="add_value">{{isUp?'线上调解':"线下调解"}}</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">审批状态:</span>
        <span class="add_value" style="color:red;">{{status|dealStatusShow}}</span>
      </div>
    </div>
    <div class="add_row1">
      <div class="add_row1_item">
        <span class="add_key">纠纷类型:</span>
        <span class="add_value">{{issueType}}</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">申请时间:</span>
        <span class="add_value">{{adjustTime}}</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">申请地点:</span>
        <span class="add_value">{{applyAddr}}</span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 申请人信息 -->
    <div class="add_row2">
      <div>
        <span class="add_key">预约人:</span>
        <span class="add_value">{{applyManName}}</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">{{applyManPhone}}</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">{{applyManId}}</span>
      </div>
      <div class="lookMore"   v-if="applyMan.length > 1"    @click="show1 = true">点击查看更多</div>
      <div class="lookMore"   v-if="applyMan.length <= 1"  style="color:rgba(190,190,190,0)">点击查看更多</div>
    </div>

    <div class="add_row2">
      <div>
        <span class="add_key">对方信息:</span>
        <span class="add_value">{{oppositeManName}}</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">{{oppositeManPhone}}</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">{{oppositeManId}}</span>
      </div>
      <div class="lookMore"  v-if="oppositeMan.length > 1"  @click="show2 = true">点击查看更多</div>
      <div class="lookMore"   v-if="oppositeMan.length <= 1" style="color:rgba(190,190,190,0)">点击查看更多</div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 调节内容 -->
    <p style="font-size:15px;font-weight:bold;">调节内容概述:</p>
    <div
      style="text-indent:32px;line-height:28px;"
    >{{adjustContent}}</div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 相关证明材料 -->
    <div class="add_row2"  v-if="url.length != 0" >
      <span class="add_key">相关证明材料:</span>
      <!-- <el-button type="primary" size="small" icon="el-icon-download" @click="downZip">下载材料</el-button> -->
      <a :href="zipUrl" class="expWord1"  style="top:15px;right:10px;">下载材料</a>
    </div>

    <div class="add_row3"  v-if="url.length != 0" >
      <div v-for="(item,index) in url" :key="index">
        <el-image
          v-if="item.type == 'img'"
          style="width: 100px; height: 100px;margin:20px;"
          :src="item.name"
          :preview-src-list="srcList"
        ></el-image>
        <div v-else class="add_row3_file">
          <img src="../../../../static/img/file.png" alt />
          <div>item.name</div>
        </div>
      </div>
    </div>

    <!-- 查看更多申请人弹框 -->
    <el-dialog title="申请人名单" :visible.sync="show1" width="665px">
       <el-table
        :data="applyMan"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0)','color':'#666666'}"
        border
      >
        <el-table-column prop="yyrName" label="申请人姓名" align="center"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="yyrPhone" label="手机号" align="center"></el-table-column>
      </el-table>
    </el-dialog>

     <!-- 查看更多对方信息弹框 -->
    <el-dialog title="对方名单" :visible.sync="show2" width="665px">
      <el-table
        :data="oppositeMan"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0)','color':'#666666'}"
        border
      >
        <el-table-column prop="byyrName" label="对方姓名" align="center"></el-table-column>
        <el-table-column prop="idCardNo" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="byyrPhone" label="手机号" align="center"></el-table-column>
      </el-table>
    </el-dialog>


    <!-- 待审批状态 -->
    <waitAppr :upDown = 'isUp'  
              :status="status" 
              :role = "role"
              :rejReason = 'rejReasonStatus1'
              :obj = "obj"
              v-if = "status == 0 || status == 1"  
              @res="getRes"></waitAppr>
    
    <!-- 调解中 -->
    <adjusting 
         :upDown = 'isUp'  
         :status = "status" 
         :upBaseObj = "obj"
         :lowBaseObj = "obj"
         :obj = "obj"
          v-if = "status==2" @res="getRes"></adjusting>
    
    <!-- 文件签署 -->
    <signFile :upDown = 'isUp'  
              :status="status"  
              v-if = "status == 3"
              :upBaseObj = "obj"
              :lowBaseObj = "obj"
              :obj = "obj" 
              :signProgress = "signProgress" 
              :previewUrl = "previewUrl"
              :agreeUrl = "agreeUrl"
              @res="getRes"></signFile>

    <!-- 调解结果 -->
    <adjustRes :upDown = 'isUp'  
               :status="status"  
               :upBaseObj = "obj"
               :lowBaseObj = "obj"
               :obj = "obj" 
               :previewUrl = "previewUrl"
               :agreeUrl = "agreeUrl" 
               :rejReason = 'rejReasonStatus5'
               :completeTime = 'completeTime'
               v-if = "status == 4 || status == 5"  
                ></adjustRes>
  </div>
</template>

<script>
import moment from 'moment'
import waitAppr from './waitAppr'
import adjusting from './adjusting'
import signFile from './signFile'
import adjustRes from './adjustRes'

export default {
  components: {waitAppr,adjusting,signFile,adjustRes},
  data() {
    return {
      loading:false,
      obj:{},
      orderNum:"38338",  //预约号
      isUp:false,    //false 线下调解   true 线上调解
      status:'0',   //审批状态
      issueType:'医患纠纷',  //纠纷类型
      adjustTime:'2020-06-22 10:00:00',  //调解时间
      applyAddr:'北京',    //申请地址
      adjustContent:'殴打医生',  //调解内容
      rejReasonStatus1:'线上审批拒绝',//审批拒绝原因
      rejReasonStatus5:'线上调解拒绝',//调解拒绝原因
      signProgress:[  //项目进度
        { name: "调解员", isSign: true },
        { name: "申请人", isSign: true },
        { name: "对方", isSign: true }
      ],
      zipUrl:'',
      previewUrl:'../../../../static/img/bb.pdf',
      agreeUrl:'',
      completeTime:'2020-06-30 10:00:00',
      //调解中
      upBaseObj:{
        name:'李飞幺',
        roomId:'337',
        time:'2020-06-22 14:00:00'
      },
      //调解中
      lowBaseObj:{
        name:'小明',
        time:'2020-06-22 15:00:00',
        addr:'李家屯'
      },
      role:"",   //用户角色
      show1: false,   //隐藏显示更多申请人弹框
      show2: false,   //隐藏显示对方信息弹框
      applyManName:'',
      applyManId:'',
      applyManPhone:'',
      oppositeManName:'',
      oppositeManId:'',
      oppositeManPhone:'',
      applyMan: [],
      oppositeMan:[],
      url: [],// 证明材料
      srcList: []  //证明材料预览图片
    };
  },
  filters:{
    dealStatusShow(e){
       if(e === 0){
           return '待审批'
       }else if(e == 1){
           return '已拒绝'
       }else if(e == 2){
           return '已审批'
       }else if(e == 3){
           return '调解中'
       }else if(e == 4){
           return '已完成'
       }else if(e == 5){
           return '未达成调解'
       }
    },
  },
  created() {
    this.orderNum = sessionStorage.getItem('adjustObj')
    this.role = sessionStorage.getItem('userType')
    this.getDetail()
  },
  mounted() {},
  methods: {
    getDetail(){
       const that = this;
      that.$http.axios({
          method: "post",
          url: that.$url.adjust.getDetail,
          params: {
            yyNumber:that.orderNum,
          }
        })
        .then(function(res) {
           console.log('人民调解申请详情',res)
           if(res.data.code == 200){
                 let r = res.data.data
                 that.obj = res.data.data
                 that.orderNum = r.reservationNumber  //预约号
                 that.zipUrl = `${that.$url.adjust.downZip}?yyNumber=${that.orderNum}`
                 that.isUp = r.reconcileWay == '线上调解'?true:false    //false 线下调解   true 线上调解
                 that.status = r.applyForStatus  //审批状态
                 that.issueType = r.disputeType  //纠纷类型
                 that.adjustTime =  moment(r.applyForTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(r.applyForTime)     //申请时间
                 that.applyAddr = r.applyForAddress    //申请地址
                 that.adjustContent = r.reconcileContent  //调解内容
                 that.previewUrl =  r.reconcileProtocolb?`${that.$url.adjust.imgUrl}${r.reconcileProtocolb.split('.')[0]}.pdf`:''
                 that.agreeUrl =  r.reconcileProtocolb?`${that.$url.adjust.imgUrl}${r.reconcileProtocolb.split('.')[0]}.doc`:''
                //  that.agreeUrl = r.reconcileProtocolb?`${that.$url.adjust.imgUrl   }${r.reconcileProtocolb}`:''
                 that.applyManId = r.yyrSfzhm
                 that.applyManName = r.yyrName
                 that.applyManPhone =  r.yyrPhone
                 that.oppositeManId =  r.byyrSfzhm
                 that.oppositeManName =  r.byyrName
                 that.oppositeManPhone =  r.byyrPhone
                //  相关证明材料数据处理
                if(r.testifyMaterials){
                    let tym =  r.testifyMaterials.split(',')
                console.log(tym)
                that.url = []
                that.srcList = []
                tym.forEach(val=>{
                    let s = val.split('.').pop()
                   if(['jpg','JPG','png','PNG','JPEG','jpeg'].includes(s)){
                           that.url.push({
                             type:'img',
                             name: `${that.$url.adjust.imgUrl}/${val}`,
                           })
                           that.srcList.push(`${that.$url.adjust.imgUrl}/${val}`)
                   }else{
                          that.url.push({
                             type:'text',
                             name:val,
                           })
                   }
                   
                })
                }
                
                //查询预约和被预约人列表
                that.lookMorePeople()
                console.log(that.isUp)
           }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    lookMorePeople(){
      const that = this
      that.$http.axios({
          method: "post",
          url: that.$url.adjust.lookMorePeople,
          params: {
            yyNumber: that.orderNum
          }
        })
        .then(function(res) {
           console.log('预约人被预约人列表',res)
            that.applyMan = []
            that.oppositeMan = []
           if(res.data.code == 200){
               that.applyMan = res.data.data.moreYyr
               that.oppositeMan = res.data.data.moreByyr
           }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getRes(e){
      // this.status = e
      this.getDetail()
      // this.$forceUpdate()
    },
    reset(){
      const that = this
      that.$http
        .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: {
            reservationNumber: that.obj.reservationNumber,
            id:that.obj.id,
            reconcileWay:'线上调解',
            applyForStatus:0,
          }
        })
        .then(function(res) {
          console.log("重置人民调解信息", res);
          if (res.data.code == 200) {
                that.getDetail()
          }
        })
        .catch(function(error) {
          
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.adjust_detail {
  width: 95%;
  min-width: 1100px;
  padding: 20px 2.5% 150px;
}

.add_row1,
.add_row2 {
  width: 100%;
  min-height: 50px;
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  flex-wrap: wrap;
}

.add_row1_item {
  margin-right: 120px;
  margin-top: 15px;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 3px;
}

/* 申请人样式 */
.add_row2 {
  justify-content: space-between;
}

.lookMore {
  color: #007aff;
  cursor: pointer;
}

/* 材料 */
.add_row3 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid rgba(150, 150, 150, 0.5);
}

.add_row3_file {
  min-width: 100px;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
}

.add_row3_file div {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add_row3_file img {
  width: 75px;
}

/deep/ .el-dialog__header {
    background: #007AFF;
    color: white !important;
}


/deep/ .el-dialog__title {
    color: white;
}

/deep/ .el-dialog__headerbtn .el-dialog__close {
    color: white;
}

/deep/ .el-dialog__body {
    padding: 0;
    
}

.expWord1{
    color: white;
    background: #409EFF;
    padding: 5px 10px;
    font-size: 14px;
    
}

.lawTitle {
  font-size: 15px;
  font-weight: bold;
  padding: 20px  0;
  width: 100%;
  height: 37px;
  box-sizing: border-box;
}
</style>
