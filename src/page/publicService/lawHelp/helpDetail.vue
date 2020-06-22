<template>
  <div class="helpDetail">
    <p>
      <span class="add_key">公共服务——法律援助——详情</span>
    </p>

    <!-- 分割线 -->
    <el-divider></el-divider>

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
    <div class="add_row2">
      <span class="add_key">相关证明材料:</span>
      <el-button type="primary" size="small" icon="el-icon-download">下载材料</el-button>
    </div>

    <div class="add_row3">
      <div v-for="(item,index) in url" :key="index">
        <el-image
          v-if="item.startsWith('http')"
          style="width: 100px; height: 100px;margin:20px;"
          :src="item"
          :preview-src-list="srcList"
        ></el-image>
        <div v-else class="add_row3_file">
          <img src="../../../../static/img/file.png" alt />
          <div>xxxx.docx</div>
        </div>
      </div>
    </div>

    <!-- 审批 -->
    
      <p class="add_key" style="margin-top:40px;" v-if="isPass === false || status == 2">拒绝原因</p>
      <el-input v-if="isPass === false || status == 2"  :disabled="status == 2" style="margin:10px 0 30px;" v-model="rejReason" type="textarea" :rows="5"></el-input>
      <div class="step0_up_button" v-if="isPass === false">
        <el-button type="danger" size="small" @click="noPass">提交</el-button>
        <el-button type="primary" size="small" @click="isPass = ''">返回上一步</el-button>
      </div>

    <div class="step0_up_button" v-if="isPass === ''">
      <el-button type="danger" size="small" @click="isPass = false">拒绝</el-button>
      <el-button type="primary" size="small" @click="pass">通过</el-button>
    </div>

    <!-- 完成时间 -->
    <div class="step0_low_item"  style="margin-top:40px;" v-if="status != 0">
      <span class="add_key">{{status == 1?'通过':'拒绝'}}时间:</span>
      <span class="add_value">2020-05-06</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      isPass: "",
      status:"0",  //0待审核  1审核通过  2审核拒绝
      rejReason:'',//拒绝原因
      url: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "",
        "",
        ""
      ],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ],
      applyInfo: {
        baseInfo: [
          { name: "预约号", value: "0025897" },
          { name: "申请时间", value: "13595026341" },
          { name: "申请地点", value: "男" },
          { name: "状态", value: "待审批" }
        ],
        people1: [
          { name: "姓名", value: "李辉" },
          { name: "联系电话", value: "13595026341" },
          { name: "性别", value: "男" },
          { name: "民族", value: "汉族" },
          { name: "身份证号码", value: "522422199409111617" },
          { name: "出生日期", value: "1944-09-11" },
          { name: "工作单位", value: "代码科技有限公司" },
          { name: "邮编", value: "550001" },
          { name: "现居住地址", value: "贵州省贵阳市难民区" }
        ],
        proxy: [
          { name: "代理人", value: "法定代理人" },
          { name: "姓名", value: "刘洋" },
          { name: "身份证号", value: "522422199409111617" },
          {
            name: "案件及申请理由概述",
            value:
              "都是对的是多少级可视电话可接受的汇顶科技很多事客户端会计师对话框季度书法家看电视剧的"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
      pass(){
          this.isPass = true
          this.status = 1
      },
      noPass(){
          this.isPass = true
          this.status = 2
      }
  }
};
</script>

<style scoped>
.helpDetail {
  width: 95%;
  min-width: 1100px;
  padding: 20px 2.5% 150px;
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
</style>
