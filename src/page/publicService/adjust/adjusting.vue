<template>
<!-- 调解中 -->
    <div class="adjusting" >
         <!----------------------------------------- 线上调节中 -------------------------------------->
         <div class="adjusting_up" v-if="isUp === true">
              <!-- 点击未达成调解显示内容 -->
            <div class="step0_up_no"  >
               <div class="step0_up_yes">
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
               <p class="add_key" v-if="upPass === false">未达成原因</p>
               <el-input  v-model="upReason"    style="margin:10px 0 30px;"  type="textarea" :rows="5" v-if="upPass === false"></el-input>
               <div class="step0_up_button"  v-if="upPass === false" >
                   <el-button type="danger" size="small"  :loading="btnLoading"  @click="applyRes('5')">提交</el-button>
                   <el-button type="primary" size="small"  @click="upPass = ''">返回上一步</el-button>
               </div>
            </div>
              <div class="step0_up_button" v-if="upPass === '' && isTime == true && role == 1">
                <el-button type="danger" size="small"  @click="upPass = false">未达成调解</el-button>
                <el-button type="primary" size="small" :loading="btnLoading1"  @click="dialogVisible = true">推送调解协议书</el-button>
              </div>
         </div>

         <!---------------------------------------------------- 线下调解中 -------------------------------------------->
         <div class="adjusting_up" v-if="isUp === false">
              <!-- 点击未达成调解显示内容 -->
            <div class="step0_up_no"  >
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

               <p class="add_key" v-if="lowPass === false">未达成原因</p>
               <el-input  v-if="lowPass === false"   v-model="lowReason"   style="margin:10px 0 30px;"  type="textarea" :rows="5"></el-input>
               <div class="step0_up_button"  v-if="lowPass === false" >
                   <el-button type="danger" size="small"   :loading="btnLoading"   @click="applyRes('5')">提交</el-button>
                   <el-button type="primary" size="small"  @click="lowPass = ''">返回上一步</el-button>
               </div>
            </div>

              <div class="step0_up_button" v-if="lowPass === '' && role == 1">
                   <el-button type="danger" size="small" @click="lowPass = false">未达成调解</el-button>
                   <el-button type="primary" size="small" @click="dialogVisible = true">推送调解协议书</el-button>
             </div>
         </div>

        <!-- <iframe :src='previewUrl' width='100%' height='500px' frameborder='1'></iframe> -->
      <el-dialog
        :visible="dialogVisible"
      >
        <div style="padding: 20px">
          <el-form>
            <el-form-item label="经调解，自愿达成如下协议:" required>
              <el-input type="textarea" v-model="comeToAnAgreement"></el-input>
            </el-form-item>
            <el-form-item label="履行协议方式、地点、期限：" required>
              <el-input type="textarea" v-model="fulfilWayAddressTime"></el-input>
            </el-form-item>
          </el-form>
          <div style="text-align: right">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="submit" :loading="loading">提交</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    props: ['upDown',"upBaseObj","lowBaseObj",'obj','role'],
    data() {
        return {
           isUp:true,
           btnLoading:false,
           btnLoading1:false,
           loading:false,
           //线上审批
           isTime:false,
           upPass:'',//线上审批通过   线上审批拒绝
           upReason:'',//线上审批拒绝原因
           upPeople:'',//线上审批通过  分配调解员
           upRoom:'',//线上审批通过  分配调解室
           upTime:'',//线上审批通过  分配调解时间

           //线下审批
           lowPass:'',//线上审批通过   线上审批拒绝
           lowReason:'', //线下审批拒绝原因
           lowTime:'',//线下调节时间
           lowAddr:'', //线下调解地点

          comeToAnAgreement: '',
          fulfilWayAddressTime: '',
          dialogVisible: false
        };
    },
    watch:{
      upDown(v){
          this.isUp = v
       }
    },
    created() {
      this.init()
      console.log(this.obj)
    },
    mounted() {

    },
    methods: {
       init(){
           const that = this
           that.isUp = that.upDown
           that.upBaseObj.reconcileTime =  moment(that.upBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') // that.$util.timeFormat(that.upBaseObj.reconcileTime)
           that.lowBaseObj.reconcileTime = moment(that.lowBaseObj.reconcileTime).format('YYYY-MM-DD HH:mm:ss') //that.$util.timeFormat(that.lowBaseObj.reconcileTime)

           if(that.isUp == true && new Date() >= new Date(that.obj.reconcileTime.replace(/-/g, '/'))){
                  //到线上开始调解的时候，才显示  达成调解或者未达成调解按钮
                  that.isTime = true
           }
            console.log(that.isTime)   
           
          //  console.log(this.isUp)
       },
      submit () {
         if (!this.comeToAnAgreement) {
           this.$message.warning('达成协议不能为空')
           return false
         }
          if (!this.fulfilWayAddressTime) {
            this.$message.warning('履行协议方式、地点、期限不能为空')
            return false
          }
        this.applyRes('3')
      },
        applyRes(res){
          const that = this
          if(that.isUp == true && res == '5' && that.upReason == ''){
              that.$message.error('请填写未达成原因');
              return false
          }

           if(that.isUp == false && res == '5' && that.lowReason == ''){
              that.$message.error('请填写未达成原因');
              return false
          }

          that.resSubHttp(res)
       },
       resSubHttp(res){
         const that = this
         let param = {}
         if(res == 3){
              that.btnLoading1 = true
         }else{
             that.btnLoading = true
         }

         if(that.isUp == true && res == '3'){
              param = {
                  reservationNumber: that.obj.reservationNumber,
                  comeToAnAgreement: that.comeToAnAgreement,
                  fulfilWayAddressTime: that.fulfilWayAddressTime,
                  id:that.obj.id,
                  applyForStatus:3,
                  protocolPushTime: that.$util.getDateTime()
              }
          }else if(that.isUp == true && res == '5'){
              param = {
                  reservationNumber: that.obj.reservationNumber,
                  id:that.obj.id,
                  applyForStatus:5,
                  notReach:that.upReason,
                  endTime:that.$util.getDateTime()
              }
          }else if(that.isUp == false && res == '3'){
              param = {
                  reservationNumber: that.obj.reservationNumber,
                  comeToAnAgreement: that.comeToAnAgreement,
                  fulfilWayAddressTime: that.fulfilWayAddressTime,
                  id:that.obj.id,
                  applyForStatus:3,
                  protocolPushTime: that.$util.getDateTime()
              }
          }else if(that.isUp == false && res == '5'){
               param = {
                  reservationNumber: that.obj.reservationNumber,
                  id:that.obj.id,
                  applyForStatus:5,
                  notReach:that.lowReason,
                  endTime:that.$util.getDateTime()
              }
          }

        that.$http
        .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: param
        })
        .then(function(res) {
          // console.log("更新人民调解信息(调解中)", res);
          that.btnLoading = false
          that.btnLoading1 = false
          if (res.data.code == 200) {
                that.$emit('res',res)
          }
        })
       },

    },
};
</script>

<style scoped>
  .adjusting{
    width: 100%;
    margin-top: 40px;
  }
 .step0_up_button{
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
 }

 /deep/.step0_up_button .el-button:nth-child(1){
    margin-right: 40px;
 }

  /* 线上 */
  .adjusting_up{
      width: 100%;
  }

  .step0_up_no{
    width: 100%;
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
/deep/ .el-dialog__header {
  background: #fff;
  color: white !important;
}
</style>
