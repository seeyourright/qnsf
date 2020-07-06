<template>
  <div class="helpDetail">
    <p>
      <span class="add_key">公共服务——法律援助——详情</span>
    </p>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- <el-button type="primary" size="small"  style="position:absolute;right:50px;top:80px;" @click="expWord" >导出申请表</el-button> -->
    <a :href="wordUrl" class="expWord">导出申请表</a>
    <!-- 申请基础信息 -->
    <div class="step0_low_item" v-for="(item,index) in applyInfo.baseInfo" :key="index">
      <span class="add_key">{{item.name}}:</span>
      <span class="add_value" :style="{'color':item.name == '状态'?'red':''}">{{item.value}}</span>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <div class="hd_box">
      <div class="hd_box_item" v-for="(item,index) in applyInfo.people1" :key="index">
        <span class="add_key">{{item.name}}:</span>
        <span class="add_value">{{item.value}}</span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <div class="step0_low_item" v-for="(item,index) in applyInfo.proxy" :key="index">
      <span class="add_key">{{item.name}}:</span>
      <span class="add_value">{{item.value}}</span>
    </div>

    <!-- 相关证明材料 -->
    <div class="add_row2" style="position:relative;" v-if="url.length != 0"   >
      <span class="add_key">相关证明材料:</span>
      <a :href="zipUrl" class="expWord"  style="top:15px;right:10px;">下载材料</a>
      <!-- <el-button type="primary" size="small" icon="el-icon-download">下载材料</el-button> -->
    </div>

    <div class="add_row3" v-if="url.length != 0">
      <div v-for="(item,index) in url" :key="index">
        <el-image
          v-if="item.type == 'img'"
          style="width: 100px; height: 100px;margin:20px;"
          :src="item.name"
          :preview-src-list="srcList"
        ></el-image>
        <div v-else class="add_row3_file">
          <img src="../../../../static/img/file.png" alt />
          <div>{{item.name}}</div>
        </div>
      </div>
    </div>

    <!-- 审批 -->

    <p class="add_key" style="margin-top:40px;" v-if="isPass === false || status == 2">拒绝原因</p>
    <el-input
      v-if="isPass === false || status == 2"
      :disabled="status == 2"
      style="margin:10px 0 30px;"
      v-model="rejReason"
      type="textarea"
      :rows="5"
    ></el-input>
    <div class="step0_up_button" v-if="isPass === false">
      <el-button type="danger" size="small" @click="noPass">提交</el-button>
      <el-button type="primary" size="small" @click="isPass = ''">返回上一步</el-button>
    </div>

    <div class="step0_up_button" v-if="isPass === '' && status == 0">
      <el-button type="danger" size="small" @click="isPass = false">拒绝</el-button>
      <el-button type="primary" size="small" @click="pass">通过</el-button>
    </div>

    <!-- 完成时间 -->
    <div class="step0_low_item" style="margin-top:40px;" v-if="status != 0">
      <span class="add_key">{{status == 1?'通过':'拒绝'}}时间:</span>
      <span class="add_value">{{completeTime}}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  props: {},
  data() {
    return {
      id:'',
      isPass: "",
      status: "0", //0待审核  1审核通过  2审核拒绝
      rejReason: "", //拒绝原因
      completeTime: "2020-06-22 10:00:00",
      wordUrl:'',
      zipUrl:'',
      url: [],
      srcList: [],
      applyInfo: {
        baseInfo: [
          { name: "预约号", value: "" },
          { name: "申请时间", value: "" },
          { name: "申请地点", value: "" },
          { name: "状态", value: "" }
        ],
        people1: [
          { name: "姓名", value: "" },
          { name: "联系电话", value: "" },
          { name: "性别", value: "" },
          { name: "民族", value: "" },
          { name: "身份证号码", value: "" },
          { name: "出生日期", value: "" },
          { name: "工作单位", value: "" },
          { name: "邮编", value: "" },
          { name: "现居住地址", value: "" }
        ],
        proxy: [
          { name: "代理人", value: "" },
          { name: "姓名", value: "" },
          { name: "身份证号", value: "" },
          {
            name: "案件及申请理由概述",
            value:
              ""
          }
        ]
      }
    };
  },
  created() {
    // console.log()
    this.id = sessionStorage.getItem('lawHelpId')    //this.$route.params.id
    this.wordUrl = `${this.$url.lawHelp.expWord}?id=${this.id}`
    this.zipUrl = `${this.$url.lawHelp.downFile}?id=${this.id}`
    this.searchDetail();
    this.netFileAddr()
  },
  mounted() {},
  methods: {
    searchDetail() {
      const that = this;

      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.getDetail,
          params: {
            id: that.id
          }
        })
        .then(function(res) {
          // console.log("法律援助详情", res);

          if (res.data.code == 200) {
            let obj = res.data.data.lawAidApplyPerson;
            that.completeTime = res.data.data.examineTime
            that.status = res.data.data.status
            that.rejReason = res.data.data.remarks
            that.applyInfo = {
              baseInfo: [
                { name: "预约号", value: res.data.data.reservationNumber },
                { name: "申请时间", value: moment(res.data.data.createTime).format('YYYY-MM-DD HH:mm:ss') },
                { name: "申请地点", value: res.data.data.applicationSite},
                { name: "状态", value:  that.dealStatusShow(res.data.data.status)}
              ],
              people1: [
                { name: "姓名", value: obj.applyPerson },
                { name: "联系电话", value: obj.phone },
                { name: "性别", value: obj.sex == 0?'男':'女' },
                { name: "民族", value: obj.nation },
                { name: "身份证号码", value: obj.idCard},
                { name: "出生日期", value: obj.birthday },
                { name: "工作单位", value: obj.workUnit },
                { name: "邮编", value: obj.postalCode },
                { name: "现居住地址", value: obj.address }
              ],
              proxy: [
                { name: "代理人", value: obj.agentType == 0?'法定代理人':'委托代理人' },
                { name: "姓名", value: obj.agentName},
                { name: "身份证号", value: obj.agentIdCard },
                {
                  name: "案件及申请理由概述",
                  value: obj.caseIntroduce }
              ]
            };
          }
        })
    },
     dealStatusShow(e){
       if(e == 0){
           return '待审批'
       }else if(e == 1){
           return '已通过'
       }else if(e == 2){
           return '已拒绝'
       }
    },
    netFileAddr(){
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.netFileAddr,
          params: {
            applyPersonId: that.id
          }
        })
        .then(function(res) {
          // console.log("相关证明材料", res);
                that.url = []
                that.srcList = []
          if (res.data.code == 200) {
               res.data.data.forEach(val => {
                   let s = val.fileUrl.split('\\').pop()
                   let ss = s.split('.').pop()
                   if(['jpg','JPG','png','PNG','JPEG','jpeg'].includes(ss)){
                           that.url.push({
                             type:'img',
                             name: `${that.$url.imgUrl}${s}`,
                           })
                           that.srcList.push(`${that.$url.imgUrl}${s}`)
                   }else{
                          that.url.push({
                             type:'text',
                             name:s,
                           })
                   }

               });
          }
        })
    },
    pass() {
      this.isPass = true;
      this.status = 1;
      this.subRes()
    },
    noPass() {
      if(!this.rejReason){
         this.$message.warning('请填写拒绝理由！');
         return false
      }
      
      this.isPass = true;
      this.status = 2;
      this.subRes()
    },
    subRes(){
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.subRes,
          params: {
            id: that.id,
            status: that.status,
            remarks: that.status == 2?that.rejReason:''
          }
        })
        .then(function(res) {
          // console.log("审批结果", res);
          if (res.data.code == 200) {
               that.searchDetail()
          }
        })
    },
    expWord(){
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.expWord,
          headers: {
            'Content-Type': 'application/msword'
          },
          params: {
            id: that.id
          }
        })
        .then(function(res) {
          // console.log("导出word结果", res);
          if (res.data.code == 200) {

          }
        })
    }
  }
};
</script>

<style scoped>
.helpDetail {
  width: 95%;
  min-width: 1100px;
  padding: 20px 2.5% 150px;
  position: relative;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
}

.step0_low_item {
  /* width: 50%; */
  height: 50px;
  display: flex;
  /* align-items: center; */
}

.hd_box {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.hd_box_item {
  width: 35%;
  display: flex;
  /* align-items: center; */
  min-height: 50px;
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

.add_row2 {
  width: 100%;
  min-height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

/*  */
.step0_up_button {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0;
}

/deep/.step0_up_button .el-button:nth-child(1) {
  margin-right: 40px;
}

.expWord{
    color: white;
    background: #409EFF;
    padding: 5px 10px;
    font-size: 14px;
    position: absolute;
    right: 50px;
    top: 85px;
}
</style>
