<template>
  <!-- 人民调解申请列表 -->
  <div class="adjust">
    <p class="lawTitle">人民调解</p>
    <!-- 操作栏 -->
    <div class="ad_row1">
      <span class="marginRight">状态</span>
      <div class="marginRight" style="width:15%;">
        <el-select v-model="status" placeholder="请选择" size="small" @change="selectChange">
          <el-option value=''  label="全部"></el-option>
          <el-option value="0" label="待审批"></el-option>
          <el-option value="2" label="已审批"></el-option>
          <el-option value="3" label="调解中"></el-option>
          <el-option value="1" label="已拒绝"></el-option>
          <el-option value="4" label="已完成"></el-option>
          <el-option value="5" label="未达成调解"></el-option>
        </el-select>
      </div>
      <div class="marginRight" style="width:15%;">
        <el-input v-model="condition" placeholder="输入预约号/申请人" size="small"></el-input>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" @click="getApplyList">查询</el-button>
      <el-popconfirm title="确定删除吗？" @onConfirm="delMore" style="margin-left:20px;">
        <el-button type="danger" size="small" slot="reference">批量删除</el-button>
      </el-popconfirm>
    </div>

    <!-- 表格 -->
    <div class="ad_row2">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="reservationNumber" label="预约号" align="center"></el-table-column>
        <el-table-column prop="applyForAddress" label="申请地点" align="center"></el-table-column>
        <el-table-column prop="yyrName" label="申请人" align="center"></el-table-column>
        <el-table-column prop="applyForTime" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="applyForStatus" label="状态" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="ad_row3">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
const qs = require('qs');
export default {
  props: {},
  data() {
    return {
      status: "", //状态
      loading:false,
      condition: null, //模糊查询字段
      currentPage: 1, //当前页
      size: 5, //每页展示条数
      totals: 1, //总条数
      multipleSelection: [], //批量选择列表
      tableData: []
    };
  },
  created() {
    this.getApplyList()
    // console.log(this.$store.state.userInfo)
  },
  mounted() {},
  methods: {
    //查询人民调解申请列表
    getApplyList() {
      const that = this;
      that.loading = true
      let reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
　　  let isHz = reg.test(that.condition)  //判断输入框输入是不是汉字   是汉字按预约人筛选查询   不是则按预约号筛选查询
      that.$http.axios({
          method: "post",
          url: that.$url.adjust.getList,
          params: {
            applyForStatus: that.status === ''?null:that.status,
            yyrName:isHz?that.condition:null,
            reservationNumber:isHz?null:that.condition,
            recordAffiliation:sessionStorage.getItem('userType') == 2?sessionStorage.getItem('unitId'):null,  //管理员按归属单位查找  超级管理员可查看所有
            reconcileId: sessionStorage.getItem('userType') == 1?sessionStorage.getItem('userId'):null,  //调解员按id查找
            reconcileWay: sessionStorage.getItem('userType') != 1 && that.status === '0'?'线上调解':null,  //查询审批状态的数据时   调解员只能获取线下调解的  管理员和超级管理员只能获取线上
            page:that.currentPage,
            limit:that.size
          }
        })
        .then(function(res) {
          //  console.log('人民调解列表',res)
           that.tableData = []
           if(res.data.code == 200){
               that.loading = false
               that.totals = res.data.totals
               that.tableData = res.data.data.map(val=>{
                     val.applyForTime = moment(val.applyForTime).format('YYYY-MM-DD HH:mm:ss')// that.$util.timeFormat()
                     val.applyForStatus = that.dealStatusShow(val.applyForStatus)
                     return val
               })

           }
        })
    },
    dealStatusShow(e){
       if(e === 0){
           return '待审批'
       }else if(e == 1){
           return '已拒绝'
       }else if(e == 2){
           return '已审批'
       }else if(e == 3){
           return '调解中'
       }else if(e == 4){
           return '已完成'
       }else if(e == 5){
           return '未达成调解'
       }
    },
    //下拉框change事件
    selectChange(e) {
        this.currentPage = 1
        this.getApplyList()
    },
    //批量删除
    delMore() {
     const that = this;

      if(that.multipleSelection.length == 0){
            that.$message.warning('请选择需要删除的记录！');
            return false
      }

      that.loading = true
      let arr = []
      let yyNumber = []
      that.multipleSelection.forEach(val=>{
        arr.push(val.id)
        yyNumber.push(val.reservationNumber)
      })

      that.$http.axios({
          method: "post",
          url: that.$url.adjust.delMore,
          params: {
            ids:arr,
            yyNumber
          },
          paramsSerializer: function(params) {
               return qs.stringify(params, {arrayFormat: 'repeat'})
          }
        })
        .then(function(res) {
          // console.log('批量删除',res);
          if(res.data.code == 200){
              that.getApplyList()
               that.$message.success('删除成功！');
          }
        })
    },
    //查看详情
    lookDetail(val) {
      sessionStorage.setItem('adjustObj',val.reservationNumber)
      this.$router.push("adjustDetail");
    },
    //点击表格多选框触发函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击分页触发函数
    handleCurrentChange(val) {
      this.getApplyList()
    }
  }
};
</script>

<style scoped>
.adjust {
  width: 100%;
  min-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lawTitle {
  font-size: 15px;
  font-weight: bold;
  padding: 20px 2.5% 0;
  width: 100%;
  height: 37px;
  box-sizing: border-box;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
}

.marginRight {
  margin-right: 20px;
}

.ad_row1 {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2.5%;
}

.ad_row2 {
  width: 95%;
}

.ad_row3 {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/deep/ .el-checkbox__inner {
  border: 1px solid rgba(190, 190, 190);
}
</style>
