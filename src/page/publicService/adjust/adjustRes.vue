<template>
<!-- 调解结果 -->
    <div class="signFile">
        <!-- 线上 -->
        <div class="step0_up_yes" v-if="isUp === true">
                 <div class="step0_up_yes_item">
                     <span class="add_key">调解员:</span>
                     <span >{{upBaseObj.reconcileMan}}</span>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">调解室:</span>
                     <span >{{upBaseObj.reconcileRoom}}</span>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">调解时间:</span>
                     <span >{{upBaseObj.reconcileTime}}</span>
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
                      <span class="add_value"  style="white-space:nowrap;margin-right:10px;">{{lowBaseObj.reconcileAddress}}</span>
                </div>
          </div>


          <!--  线上、线下调解成功（文件签署）-->
          <div class="sf_file"  style="margin-top:20px;"   v-if="status == 4" >
             <div>
                  <span class="add_key">双方签署调解协议:</span>
                  <img src="../../../../static/img/file.png" alt="" @click="showPDF = true">
             </div>

             <div  style="height:30px;">
                 <el-button type="primary" size="small" style="margin-right:20px;" @click="showPDF = true">预览</el-button>
                 <!-- <a target='_black' :href='previewUrl'>在线预览</a> -->
                  <a :href="agreeUrl" class="expWord1"  style="top:15px;right:10px;">下载</a>
                 <!-- <el-button type="primary" size="small">下载</el-button> -->
             </div>
          </div>

           <!-- 线上、线下调解失败（失败原因） -->
            <p class="add_key" v-if="status == 5"   style="margin-top:20px;">未达成原因</p>
            <el-input v-if="status == 5"  :disabled="true" style="margin:10px 0 30px;"  v-model = 'obj.notReach' type="textarea" :rows="5"></el-input>



          <p style="margin:30px 0;">
              <span class="add_key">{{obj.applyForStatus == 5?'拒绝时间:':'完成时间:'}}</span>
              <span class="add_value">{{obj.endTime}}</span>
          </p>

           <!-- 协议预览 -->
    <el-dialog title="协议预览" :visible.sync="showPDF" width="1000px">
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
export default {
     components: {
      pdf
    },
    props: ['upDown','status',"upBaseObj","lowBaseObj","previewUrl","agreeUrl",'completeTime',"rejReason",'obj'],
    data() {
        return {
          isUp:true,  //true线上审批  false 线下审批
          isPass:false,  //true完成调解  false调解失败
          showPDF: false,
          pdfPage:1,
          pdfTotals:10
        };
    },
    created() {
        this.init()
        // console.log(this.agreeUrl)
    },
    mounted() {

    },
    methods: {
        init(){
           const that = this
           that.isUp = that.upDown
           that.upBaseObj.reconcileTime = moment(that.obj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.upBaseObj.reconcileTime)
           that.lowBaseObj.reconcileTime = moment(that.obj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.lowBaseObj.reconcileTime)
           that.obj.endTime = moment(that.obj.endTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.obj.endTime)
            // console.log(this.isUp)
       },
        //点击分页触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      
    }
    },
};
</script>

<style scoped>
   .signFile{
       width: 100%;
       margin-top: 40px;
   }

    .step0_up_yes{
    width: 100%;
    height: 50px;
    display: flex;
    /* justify-content: space-around; */
    align-items: center;
     margin-top: 40px;
     margin-bottom:30px;
}

.step0_up_yes_item{
    width: 30%;
}

 .add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 3px;
}

.step0_low_item{
    /* width: 50%; */
    height: 50px;
    display: flex;
    align-items: center;
}

.sf_file{
    width: 100%;
    display: flex;
    justify-content: space-between;
}

.sf_file>div{
    display: flex;
    justify-content: space-between;
}

.sf_file img{
    width: 100px;
    height: 100px;
}

.step0_up_button{
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
