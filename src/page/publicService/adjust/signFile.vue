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
        <img @click="showPDF = true" src="../../../../static/img/file.png" alt />
      </div>

      <div style="height:30px;">
        <el-button type="primary" size="small" style="margin-right:20px;" @click="showPDF = true">预览</el-button>
        <el-button type="primary" size="small">下载</el-button>
      </div>
    </div>

    <div style="width:100%;margin:40px 0;">
      <span class="add_key">协议签署进度:</span>
      <span class="add_value" >
        调解员
        <span style="color:green;" v-if="obj.peacemakerSignature == true">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>

      <span class="add_value" >
        预约人
        <span style="color:green;" v-if="obj.proposerSignature == true">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>

      <span class="add_value" >
        被预约人
        <span style="color:green;" v-if="obj.recipientSignature == true">（已签署）、</span>
        <span style="color:red;" v-else>（未签署）、</span>
      </span>
    </div>

    <div class="step0_up_button" v-if="isSign == true">
      <el-button type="primary"  @click="applyRes('4')">完成调解</el-button>
    </div>

    <!-- 协议预览 -->
    <el-dialog title="协议预览" :visible.sync="showPDF" width="665px">
      <!-- <pdf :src="previewUrl" :page="pdfPage"></pdf>
      <div class="ad_row3">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="pdfPage"
            layout="prev, pager, next"
            :page-size="1"
            :total="pdfTotals"
          ></el-pagination> 
          
      </div>-->
        <iframe :src='previewUrl' width='100%' height='500px' frameborder='1'></iframe>
    </el-dialog>
  </div>
</template>

<script>
import moment from 'moment'
import pdf from "vue-pdf";

export default {
  props: ["upDown","upBaseObj","lowBaseObj","signProgress","previewUrl","agreeUrl","obj"],
  components: {
    pdf
  },
  data() {
    return {
      isUp: true, //true线上审批  false 线下审批
      showPDF: false,
      pdfPage:1,
      pdfTotals:32,
    };
  },
  watch:{
    upDown(v){
          this.isUp = v
       },
    obj(val){
      console.log(val)
    }
  },
  created() {
    this.init();
  },
  computed: {
    isSign() {
      // if(this.obj.peacemakerSignature == true && this.obj.proposerSignature == true && this.obj.recipientSignature == true){
      //     return true
      // }else{
      //    return false
      // }
      return true
    }
  },
  mounted() {},
  methods: {
    init() {
      let that = this
      that.isUp = that.upDown;
      that.upBaseObj.reconcileTime = moment(that.upBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.upBaseObj.reconcileTime)
      that.lowBaseObj.reconcileTime = moment(that.lowBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.lowBaseObj.reconcileTime)
      console.log(that.isUp);
    },
     applyRes(res){
          const that = this
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
          console.log("更新人民调解信息(调解中)", res);
          if (res.data.code == 200) {
                that.$emit('res',res) 
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
          that.$emit('res',res)   

       },
    preview(row) {
      //createLoadingTask方法，参数为pdf的文件地址，此方法可返回pdf文件的一些参数，例如页码总数，等；会返回一个promise对象；
      this.pdfUrl = pdf.createLoadingTask(this.fileUrl + row.magazinePdfPath);

      this.pdfUrl
        .then(pdf => {
          //拿到pdf的总页码数
          console.log(pdf)
          this.pdfTotals = pdf.numPages;
        })
        .catch(err => {
          console.log(err);
        });
      this.showPDF = true; //弹框开关
    },
     //点击分页触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      
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
</style>
