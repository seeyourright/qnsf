<template>
<!-- 调解结果 -->
    <div class="signFile">
        <!-- 线上 -->
        <div class="step0_up_yes" v-if="isUp === true">
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
        <!-- 线下 -->
          <div v-if="isUp === false" style="width:100%;">
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
          </div>


          <!--  线上、线下调解成功（文件签署）-->
          <div class="sf_file"   v-if="isPass == true" >
             <div>
                  <span class="add_key">双方签署调解协议:</span>
                  <img src="../../../../static/img/file.png" alt="">
             </div>

             <div  style="height:30px;">
                 <el-button type="primary" size="small" style="margin-right:20px;">预览</el-button>
                 <el-button type="primary" size="small">下载</el-button>
             </div>
          </div>

           <!-- 线上、线下调解失败（失败原因） -->
            <p class="add_key" v-if="isPass == false">拒绝原因</p>
            <el-input v-if="isPass == false"  :disabled="true" style="margin:10px 0 30px;"  v-model = 'lowReason' type="textarea" :rows="5"></el-input>



          <p  style="margin:30px 0;">
              <span class="add_key">完成时间:</span>
              <span class="add_value">2020-02-02 10:00:00</span>
          </p>
             
    </div>
</template>

<script>
export default {
    props: ['upDown','obj'],
    data() {
        return {
          isUp:true,  //true线上审批  false 线下审批
          isPass:false,  //true完成调解  false调解失败
          fileProgress:[{name:'调解员',isSign:true},{name:'申请人',isSign:false},{name:'对方',isSign:false}],
        };
    },
    created() {
        this.init()
        console.log(this.obj)
    },
    computed:{
        isSign(){
            let arr = []
            arr =  this.fileProgress.filter(val=>{
                return val.isSign == false
            })

            if(arr.length == 0){
                return true
            }else{
                return false
            }
        }
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
</style>
