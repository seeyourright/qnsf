<template>
     <!-- 待审批状态 -->
     <div class="step0">
         <!--------------------------------------- 线上调解 ------------------------------------------------->
         <div class="step0_up">
             <!-- 审批拒绝显示内容 -->
            <div class="step0_up_no" v-if="upPass === false || (status == 1 && isUp === true)"  >
               <p class="add_key">拒绝原因</p>
               <el-input  :disabled="status == 1" style="margin:10px 0 30px;"  v-model = 'upReason' type="textarea" :rows="5"></el-input>
            </div>
             <div class="step0_up_button"   v-if="upPass === false && status == 0">
                   <el-button type="danger" size="small" @click="applyRes('1')">提交</el-button>
                   <el-button type="primary" size="small"  @click="upPass = ''">返回上一步</el-button>
             </div>
            <!-- 审批通过显示内容 -->
            <div class="step0_up_yes" v-if="upPass === true && status == 0">
                 <div class="step0_up_yes_item">
                     <span class="add_key">选择调解员:</span>
                      <el-select v-model="upPeople"  placeholder="请选择" size="small" @change="upChange1">
                            <el-option :value="item.id"  v-for="(item,index) in upPeopleList" :key='index'>{{item.name}}</el-option>
                      </el-select>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">选择调解室:</span>
                      <el-select v-model="upRoom"  placeholder="请选择" size="small"  @change="upChange2">
                            <el-option :value="item.id"  v-for="(item,index) in upRoomList" :key='index'>{{item.name}}</el-option>
                      </el-select>
                 </div>
                  <div class="step0_up_yes_item">
                     <span class="add_key">调解时间:</span>
                       <el-date-picker
                           size="small"
                           v-model="upTime"
                           type="datetime"
                           placeholder="选择调解时间">
                        </el-date-picker>
                 </div>
            </div>
           <div class="step0_up_button" v-if="upPass === true && status == 0" >
                   <el-button type="danger" size="small" @click="applyRes('2')" >提交</el-button>
                   <el-button type="primary" size="small"  @click="upPass = ''">返回上一步</el-button>
            </div>
            
            <!-- 线上审批按钮 -->
            <div class="step0_up_button"  v-if="upPass === '' && isUp === true &&  status == 0" >
                   <el-button type="danger" size="small" @click="upPass = false" >拒绝</el-button>
                   <el-button type="primary" size="small" @click="upPass = true">通过</el-button>
            </div>
         </div>
         


         <!--------------------------------------------- 线下调解 ----------------------------------------------->
         <div class="step0_low">
            <!-- 线下审批拒绝显示内容 -->
            <div class="step0_up_no" v-if="lowPass === false ||  (status == 1 && isUp === false)"  >
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
               <p class="add_key">拒绝原因</p>
               <el-input  :disabled="status == 1"  style="margin:10px 0 30px;"  v-model = 'lowReason' type="textarea" :rows="5"></el-input>
               
            </div>
            <div class="step0_up_button" v-if="lowPass === false && status == 0" >
                   <el-button type="danger" size="small" @click="applyRes('1')">提交</el-button>
                   <el-button type="primary" size="small"  @click="lowPass = ''">返回上一步</el-button>
               </div>

             <!-- 线下审批通过显示内容 -->
            <div class="step0_up_no" v-if="lowPass === true  && status == 0 "  >
                <div class="step0_low_item">
                      <span class="add_key">调解员:</span>
                      <span class="add_value">张三</span>
                </div>
                 <div class="step0_low_item">
                      <span class="add_key">调解时间:</span>
                      <el-date-picker
                           size="small"
                           v-model="lowTime"
                           type="datetime"
                           placeholder="选择调解时间">
                      </el-date-picker>
                </div>
                <div class="step0_low_item">
                      <span class="add_key" style="width:72px;">调解地点:</span>
                      <span class="add_value"  style="white-space:nowrap;margin-right:10px;">自动生成的地址</span>
                      <div  style="width:50%;">
                          <el-input v-model="lowAddr" placeholder="输入详细地点" size="small"></el-input>
                      </div>
                </div>
                <div class="step0_up_button"  >
                         <el-button type="danger" size="small" @click="applyRes('2')">提交</el-button>
                         <el-button type="primary" size="small"  @click="lowPass = ''">返回上一步</el-button>
                     </div>
               </div>


            <!-- 线下审批按钮 -->
            <div class="step0_up_button"  v-if="lowPass === '' && isUp === false && status == 0" >
                   <el-button type="danger" size="small" @click="lowPass = false" >拒绝</el-button>
                   <el-button type="primary" size="small" @click="lowPass = true">通过</el-button>
            </div>
         </div>
     </div>
</template>

<script>
export default {
    props: ['upDown','status','rejReason'],
    data() {
        return {
           isUp:true,  //true线上审批  false 线下审批
           //线上审批
           upPass:'',//线上审批通过   线上审批拒绝
           upReason:'',//线上审批拒绝原因  
           upPeople:'',//线上审批通过  分配调解员
           upPeopleId:'',//线上审批通过  分配调解员
           upPeopleList:[{name:'牛大壮',id:'001'},{name:'陈二毛',id:'002'},{name:'李飞幺',id:'003'}],  //调解员列表
           upRoom:'',//线上审批通过  分配调解室
           upRoomId:'',//线上审批通过  分配调解室
           upRoomList:[{name:'调解室1',id:'001'},{name:'调解室2',id:'002'},{name:'调解室3',id:'003'}],
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
    methods: {
       init(){
           this.isUp = this.upDown
           if(this.status == 1){
                this.upReason = this.rejReason
                this.lowReason = this.rejReason
           }
       },
       applyRes(res){
          const that = this
          that.$emit('res',res)   

       },
       upChange1(e){
           console.log(e)
         const that = this
          that.upPeopleList.forEach(val=>{
             if(val.id == e){
                  that.upPeople = val.name
                   that.upPeopleId = val.id
             }
         })
       },
       upChange2(e){
         const that = this
        //  that.upPeople = that.upPeopleList.filter(val=>{
        //      return val.id == e.detail.value
        //  })
         that.upRoomList.forEach(val=>{
              if(val.id == e){
                   that.upRoom = val.name
                   that.upRoomId = val.id
             }
         })
       },
    },
};
</script>

<style scoped>
/* 待审批状态 */
.step0{
    width: 100%;
    margin-top: 40px;
}

.step0_up{
    width: 100%;
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


/* 线下调解 */
.step0_low{
    width: 100%;
}

.step0_low_item{
    /* width: 50%; */
    height: 50px;
    display: flex;
    align-items: center;
}


</style>
