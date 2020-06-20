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
                     <span >xxx</span>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">调解室:</span>
                     <span >30562</span>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">调解时间:</span>
                     <span >2020-06-02 16:00:00</span>
                 </div>
            </div>
               <p class="add_key" v-if="upPass === false">未达成原因</p>
               <el-input  style="margin:10px 0 30px;"  type="textarea" :rows="5" v-if="upPass === false"></el-input>
               <div class="step0_up_button"  v-if="upPass === false" >
                   <el-button type="danger" size="small">提交</el-button>
                   <el-button type="primary" size="small"  @click="upPass = ''">返回上一步</el-button>
               </div>
            </div>
            
              <div class="step0_up_button" v-if="upPass === ''">
                   <el-button type="danger" size="small"  @click="upPass = false">未达成调解</el-button>
                   <el-button type="primary" size="small">达成调解推送调解员</el-button>
             </div>
         </div>

         <!---------------------------------------------------- 线下调解中 -------------------------------------------->
         <div class="adjusting_up" v-if="isUp === false">
              <!-- 点击未达成调解显示内容 -->
            <div class="step0_up_no"  >
               <div class="step0_low_item">
                      <span class="add_key">调解员:</span>
                      <span class="add_value">张三</span>
                </div>
                 <div class="step0_low_item">
                      <span class="add_key">调解时间:</span>
                      <span class="add_value">无</span>
                </div>
                <div class="step0_low_item"> 
                      <span class="add_key" style="width:72px;">调解地点:</span>
                      <span class="add_value"  style="white-space:nowrap;margin-right:10px;">无</span>
                </div>

               <p class="add_key" v-if="lowPass === false">未达成原因</p>
               <el-input  v-if="lowPass === false"  style="margin:10px 0 30px;"  type="textarea" :rows="5"></el-input>
               <div class="step0_up_button"  v-if="lowPass === false" >
                   <el-button type="danger" size="small">提交</el-button>
                   <el-button type="primary" size="small"  @click="lowPass = ''">返回上一步</el-button>
               </div>
            </div>
            
              <div class="step0_up_button" v-if="lowPass === ''">
                   <el-button type="danger" size="small" @click="lowPass = false">未达成调解</el-button>
                   <el-button type="primary" size="small">达成调解推送调解员</el-button>
             </div>
         </div>
    </div>
</template>

<script>
export default {
    props: ['upDown'],
    data() {
        return {
           isUp:true,

           //线上审批
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
        };
    },
    created() {
      this.init()
    },
    mounted() {

    },
    methods: {
       init(){
           this.isUp = this.upDown
           console.log(this.isUp)
       }
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
</style>
