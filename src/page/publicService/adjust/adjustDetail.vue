<template>
  <div class="adjust_detail">
    <!-- 申请信息 -->
    <div class="add_row1">
      <div class="add_row1_item">
        <span class="add_key">预约号:</span>
        <span class="add_value">12354897465</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">调解方式:</span>
        <span class="add_value">线上调节</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">审批状态:</span>
        <span class="add_value" style="color:red;">待审批</span>
      </div>
    </div>
    <div class="add_row1">
      <div class="add_row1_item">
        <span class="add_key">纠纷类型:</span>
        <span class="add_value">财务纠纷</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">调解时间:</span>
        <span class="add_value">2020-06-05 11:00:00</span>
      </div>
      <div class="add_row1_item">
        <span class="add_key">申请地点:</span>
        <span class="add_value">贵州省贵阳市南明区贵惠路246号天豪精品酒店</span>
      </div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 申请人信息 -->
    <div class="add_row2">
      <div>
        <span class="add_key">申请人姓名:</span>
        <span class="add_value">张三</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">13595026341</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">522422199409111617</span>
      </div>
      <div class="lookMore" @click="show1 = true">点击查看更多</div>
    </div>

    <div class="add_row2">
      <div>
        <span class="add_key">对方姓名:</span>
        <span class="add_value">李四</span>
      </div>
      <div>
        <span class="add_key">手机号:</span>
        <span class="add_value">13595026341</span>
      </div>
      <div>
        <span class="add_key">身份证号:</span>
        <span class="add_value">522422199409111617</span>
      </div>
      <div class="lookMore"  @click="show2 = true">点击查看更多</div>
    </div>

    <!-- 分割线 -->
    <el-divider></el-divider>

    <!-- 调节内容 -->
    <p style="font-size:15px;font-weight:bold;">调节内容概述:</p>
    <div
      style="text-indent:32px;line-height:28px;"
    >按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给按实际爱干净的换个时间噶给水管道很骄傲深V多久啊数据的噶金华市供电局哈市供电局哈撒给</div>

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
        :data="tableData"
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
        :data="tableData"
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
    <waitAppr :upDown = 'isUp' v-if = "step == 1"></waitAppr>
    
    <!-- 调解中 -->
    <adjusting :upDown = 'isUp' v-if = "step == 2"></adjusting>
    
    <!-- 文件签署 -->
    <signFile :upDown = 'isUp' v-if = "step == 3"></signFile>

    <!-- 调解结果 -->
    <adjustRes :upDown = 'isUp' v-if = "step == 4"  :obj="{a:1,b:2}" ></adjustRes>
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
      status:'调解中',   //审批状态
      isUp:true,    //线上线下
      role:"",   //用户角色
      step:4,   //1待审批  2调解中   3签署协议  4完成
      show1: false,
      show2: false,
      applyList:['','','','','','',''],
      tableData: [
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
      url: [
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
        "",
        "",
        ""
      ],
      srcList: [
        "https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg",
        "https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg"
      ]
    };
  },

  created() {
    console.log("adjustDetail");
  },
  mounted() {},
  methods: {}
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
