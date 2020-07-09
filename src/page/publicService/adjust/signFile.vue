<template>
  <!-- 签署文件 -->
  <div class="signFile">
    <!-- 线上 -->
    <div class="step0_up_yes" v-if="isUp === true">
      <div class="step0_up_yes_item">
        <span class="add_key">调解员:</span>
        <span>{{upBaseObj.reconcileMan}}</span>
      </div>
      <div class="step0_up_yes_item">
        <span class="add_key">调解室:</span>
        <span>{{upBaseObj.reconcileRoom}}</span>
      </div>
      <div class="step0_up_yes_item">
        <span class="add_key">调解时间:</span>
        <span>{{upBaseObj.reconcileTime}}</span>
      </div>
    </div>
    <!-- 线下 -->
    <div v-if="isUp === false" style="width:100%;">
      <div class="step0_low_item">
        <span class="add_key">调解员:</span>
        <span class="add_value">{{lowBaseObj.reconcileMan}}</span>
      </div>
      <div class="step0_low_item">
        <span class="add_key">调解时间:</span>
        <span class="add_value">{{lowBaseObj.reconcileTime}}</span>
      </div>
      <div class="step0_low_item">
        <span class="add_key" style="width:72px;">调解地点:</span>
        <span class="add_value" style="white-space:nowrap;margin-right:10px;">{{lowBaseObj.reconcileAddress}}</span>
      </div>
    </div>

    <!-- 文件签署 -->
    <div class="sf_file">
      <div>
        <span class="add_key">双方签署调解协议:</span>
        <img src="../../../../static/img/file.png" alt />
      </div>

      <!-- <div style="height:30px;">
        <el-button type="primary" size="small" style="margin-right:20px;" @click="showPDF = true">预览</el-button>
        <a :href="agreeUrl" class="expWord1"  style="top:15px;right:10px;">下载</a>
      </div> -->
    </div>

    <div style="width:100%;margin:40px 0;">
      <span class="add_key">协议签署进度:</span>
      <span class="add_value" >
        调解员
        <span style="color:green;" v-if="obj.peacemakerSignature ">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>

      <span class="add_value" >
        预约人
        <span style="color:green;" v-if="obj.proposerSignature">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>

      <span class="add_value" >
        被预约人
        <span style="color:green;" v-if="obj.recipientSignature">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>
    </div>
    <div style="width:100%;margin:40px 0;" v-if="!obj.peacemakerSignature && obj.proposerSignature && obj.recipientSignature && $store.state.user.userType === '1'">
      <span class="add_key">调解员签字:</span>
      <writingBoard ref="writingBoard"></writingBoard>
      <div style="margin-top: 10px;text-align: center">
        <el-button @click="$refs.writingBoard.clear()">清空</el-button>
        <el-button type="primary" @click="submitSign">提交签名</el-button>
      </div>
    </div>
    <p class="add_key" v-if="showLowRej" >未达成原因</p>
    <el-input v-if="showLowRej"  v-model="lowReason"    style="margin:10px 0 30px;"  type="textarea" :rows="5" ></el-input>
    <div class="step0_up_button" v-if="showLowRej">
        <el-button type="danger" size="small" :loading="btnLoading" @click="applyRes1('5')">提交</el-button>
        <el-button type="primary" size="small"  @click="showLowRej = false">返回上一步</el-button>
    </div>

    <div class="step0_up_button" v-if="obj.peacemakerSignature  && obj.proposerSignature && obj.recipientSignature && showLowRej == false && $store.state.user.userType === '1'">
      <!-- <el-button type="danger" size="small"  v-if="obj.reconcileWay == '线下调解'"  @click="showLowRej = true" >未达成调解</el-button> -->
      <el-button type="primary" size="small"  :loading="btnLoading1"  @click="applyRes('4')">完成调解</el-button>
    </div>

    <!-- 协议预览 -->
    <el-dialog title="协议预览" :visible.sync="showPDF" width="665px">
      <pdf :src="previewUrl" :page="pdfPage"></pdf>
      <div class="ad_row3">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pdfPage"
            layout="prev, pager, next"
            :page-size="1"
            :total="pdfTotals"
          ></el-pagination>

      </div>
        <!-- <iframe :src='previewUrl' width='100%' height='500px' frameborder='1'></iframe> -->
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import pdf from "vue-pdf";
import writingBoard from "../../../components/writingBoard";

export default {
  props: ["upDown","upBaseObj","lowBaseObj","signProgress","previewUrl","agreeUrl","obj"],
  components: {
    pdf,writingBoard
  },
  data() {
    return {
      btnLoading:false,
      btnLoading1:false,
      showLowRej:false,
      lowReason:'',
      isUp: true, //true线上审批  false 线下审批
      showPDF: false,
      pdfPage:1,
      pdfTotals:10,
    };
  },
  watch:{
    upDown(v){
          this.isUp = v
       },
    obj(val){
      // console.log(val)
    }
  },
  created() {
    this.init();
    // console.log(this.previewUrl)
    // console.log(this.agreeUrl)
  },
  computed: {
    isSign() {
      if(this.obj.peacemakerSignature != null  && this.obj.proposerSignature  != null  && this.obj.recipientSignature  != null ){
          return true
      }else{
         return false
      }
      // return true
    }
  },
  mounted() {},
  methods: {
    init() {
      let that = this
      that.isUp = that.upDown;
      that.upBaseObj.reconcileTime = moment(that.upBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.upBaseObj.reconcileTime)
      that.lowBaseObj.reconcileTime = moment(that.lowBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.lowBaseObj.reconcileTime)
      let diffDays = that.$util.datedifference(that.obj.protocolPushTime)
      // console.log('与推送协议相差天数',diffDays)
      if( !that.obj.peacemakerSignature && !that.obj.proposerSignature && !that.obj.recipientSignature  && diffDays >7){
              that.autoRej()    //7天内未签署完成   自动改为未达成调解状态
      }

    },
     applyRes(res){
          const that = this
           that.btnLoading1 = true
          that.$http
          .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: {
             reservationNumber: that.obj.reservationNumber,
             id:that.obj.id,
             applyForStatus:4,
             endTime:that.$util.getDateTime()
          }
        })
        .then(function(res) {
          // console.log("更新人民调解信息(调解中)", res);
           that.btnLoading1 = false
          if (res.data.code == 200) {
                that.$emit('res',res)
          }
        })


       },
       applyRes1(){
          const that = this
          that.btnLoading = true
          that.$http
          .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: {
             reservationNumber: that.obj.reservationNumber,
             id:that.obj.id,
             applyForStatus:5,
             notReach:that.lowReason,
             endTime:that.$util.getDateTime()
          }
        })
        .then(function(res) {
          that.btnLoading = false
          if (res.data.code == 200) {
                that.$emit('res',res)
          }
        })
       },
    autoRej(){
        const that = this
          that.$http
          .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: {
             reservationNumber: that.obj.reservationNumber,
             id:that.obj.id,
             applyForStatus:5,
             notReach:`协议推送后${7}天内未完成签署，系统自动归为未达成调解`,
             endTime:that.$util.getDateTime()
          }
        })
        .then(function(res) {
          // console.log("系统自动归为未调节状态", res);
          if (res.data.code == 200) {
                that.$emit('res',res)
          }
        })

    },
    preview(row) {
      //createLoadingTask方法，参数为pdf的文件地址，此方法可返回pdf文件的一些参数，例如页码总数，等；会返回一个promise对象；
      this.pdfUrl = pdf.createLoadingTask(this.fileUrl + row.magazinePdfPath);

      this.pdfUrl
        .then(pdf => {
          //拿到pdf的总页码数
          // console.log(pdf)
          this.pdfTotals = pdf.numPages;
        })
      this.showPDF = true; //弹框开关
    },
     //点击分页触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);

    },
    submitSign () {
      const peacemakerSignature = this.$refs.writingBoard.getImg()
      const formdata = new FormData()
      formdata.append('sign', peacemakerSignature)
      formdata.append('signMan', 'peacemakerSignature')
      formdata.append('id', this.obj.id)
      this.$http.axios.post(this.$url.adjust.signatureUpload, formdata).then(res => {
        if (res.data.code === 200) {
          this.$message.success('提交成功')
          this.obj.peacemakerSignature = true
        }
      })
    }
  }
};
</script>

<style scoped>
.signFile {
  width: 100%;
  margin-top: 40px;
}

.step0_up_yes {
  width: 100%;
  height: 50px;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
}

.step0_up_yes_item {
  width: 30%;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 3px;
}

.step0_low_item {
  /* width: 50%; */
  height: 50px;
  display: flex;
  align-items: center;
}

.sf_file {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.sf_file > div {
  display: flex;
  justify-content: space-between;
}

.sf_file img {
  width: 100px;
  height: 100px;
}

.step0_up_button {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

.ad_row3 {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.expWord1{
    color: white;
    background: #409EFF;
    padding: 5px 10px;
    font-size: 13px;
    display: flex;
    align-items: center;

}
</style>
