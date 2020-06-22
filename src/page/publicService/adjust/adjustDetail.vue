<template>
  <div class="adjust_detail">
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
        <span class="add_value" style="color:red;">{{status}}</span>
      </div>
    </div>
    <div class="add_row1">
      <div class="add_row1_item">
        <span class="add_key">纠纷类型:</span>
        <span class="add_value">{{issueType}}</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">调解时间:</span>
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
        <span class="add_key">申请人姓名:</span>
        <span class="add_value">{{applyMan[0].name}}</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">{{applyMan[0].phone}}</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">{{applyMan[0].id}}</span>
      </div>
      <div class="lookMore"   v-if="applyMan.length > 1"    @click="show1 = true">点击查看更多</div>
    </div>

    <div class="add_row2">
      <div>
        <span class="add_key">对方姓名:</span>
        <span class="add_value">{{oppositeMan[0].name}}</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">{{oppositeMan[0].phone}}</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">{{oppositeMan[0].id}}</span>
      </div>
      <div class="lookMore"  v-if="oppositeMan.length > 1"  @click="show2 = true">点击查看更多</div>
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

    <!-- 查看更多申请人弹框 -->
    <el-dialog title="申请人名单" :visible.sync="show1" width="665px">
       <el-table
        :data="applyMan"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0)','color':'#666666'}"
        border
      >
        <el-table-column prop="name" label="申请人姓名" align="center"></el-table-column>
        <el-table-column prop="id" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
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
        <el-table-column prop="name" label="对方姓名" align="center"></el-table-column>
        <el-table-column prop="id" label="身份证号" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
      </el-table>
    </el-dialog>


    <!-- 待审批状态 -->
    <waitAppr :upDown = 'isUp'  
              :status="status" 
              :rejReason = 'rejReasonStatus1'
              v-if = "status == 0 || status == 1"  
              @res="getRes"></waitAppr>
    
    <!-- 调解中 -->
    <adjusting 
         :upDown = 'isUp'  
         :status = "status" 
         :upBaseObj = "upBaseObj"
         :lowBaseObj = "lowBaseObj"
          v-if = "status==2" @res="getRes"></adjusting>
    
    <!-- 文件签署 -->
    <signFile :upDown = 'isUp'  
              :status="status"  
              v-if = "status == 3"
              :upBaseObj = "upBaseObj"
              :lowBaseObj = "lowBaseObj" 
              :signProgress = "signProgress" 
              :previewUrl = "previewUrl"
              :agreeUrl = "agreeUrl"
              @res="getRes"></signFile>

    <!-- 调解结果 -->
    <adjustRes :upDown = 'isUp'  
               :status="status"  
               :upBaseObj = "upBaseObj"
               :lowBaseObj = "lowBaseObj"
               :previewUrl = "previewUrl"
               :agreeUrl = "agreeUrl" 
               :rejReason = 'rejReasonStatus5'
               :completeTime = 'completeTime'
               v-if = "status == 4 || status == 5"  
               :obj="{a:1,b:2}" ></adjustRes>
  </div>
</template>

<script>
import waitAppr from './waitAppr'
import adjusting from './adjusting'
import signFile from './signFile'
import adjustRes from './adjustRes'

export default {
  components: {waitAppr,adjusting,signFile,adjustRes},
  data() {
    return {
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
      applyMan: [   //申请人名单
        {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
      ],
      oppositeMan:[    //对方名单
        {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
         {
          id: "522422199409111617",
          name: "王小虎",
          phone: "13595026341"
        },
      ],
      url: [   // 证明材料
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "",
        "",
        ""
      ],
      srcList: [   //证明材料预览图片
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ]
    };
  },

  created() {
    console.log("adjustDetail");
  },
  mounted() {},
  methods: {
    getRes(e){
      this.status = e
      this.$forceUpdate()
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
</style>
