<template>
  <!-- 法律援助申请列表 -->
  <div class="adjust">
    <p class="lawTitle">法律援助</p>
    <!-- 操作栏 -->
    <div class="ad_row1">
      <span class="marginRight">状态</span>
      <div class="marginRight" style="width:15%;">
        <el-select v-model="status" placeholder="请选择" size="small" @change="selectChange">
          <el-option value=""  label="全部"></el-option>
          <el-option value="0" label="待审批"></el-option>
          <el-option value="1" label="已通过"></el-option>
          <el-option value="2" label="未通过"></el-option>
        </el-select>
      </div>
      <div class="marginRight" style="width:15%;">
        <el-input  :clearable="true" v-model="condition" placeholder="输入预约号/申请人" size="small"></el-input>
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
        v-loading="loading"
        element-loading-spinner="el-icon-loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="num" label="预约号" align="center"></el-table-column>
        <el-table-column prop="addr" label="申请地点" align="center"></el-table-column>
        <el-table-column prop="people" label="申请人" align="center"></el-table-column>
        <el-table-column prop="time" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center"></el-table-column>
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
export default {
  props: {},
  data() {
    return {
      loading:false,
      status: "0", //状态
      condition: null, //模糊查询字段
      currentPage: 1, //当前页
      size: 5, //每页展示条数
      totals: -1, //总条数
      multipleSelection: [], //批量选择列表
      tableData: []
    };
  },
  created() {
    this.getApplyList()
  },
  mounted() {},
  methods: {
    //查询人民调解申请列表
    getApplyList() {
      const that = this;
      that.loading = true
      that.$http.axios({
          method: "post",
          url: that.$url.lawHelp.getList,
          params: {
            addressNumber:sessionStorage.getItem('userType') == 2?sessionStorage.getItem('unitId'):null,
            status: that.status,
            applyName: that.condition?that.condition:null,
            page:that.currentPage,
            limit:that.size
          }
        })
        .then(function(res) {
          // console.log('法律援助列表',res);
          that.loading = false
          that.tableData = []
          if(res.data.code == 200){
              that.totals = res.data.totals
              res.data.data.forEach(val => {
                   that.tableData.push({
                        id: val.id,
                        num: val.reservationNumber,
                        addr: val.applicationSite,
                        people: val.applyName,
                        time: moment(val.createTime).format('YYYY-MM-DD HH:mm:ss'),// that.$util.timeFormat(val.createTime),
                        status: that.dealStatusShow(val.status)  
                   })
              });
          }
        })
    },
    dealStatusShow(e){
       if(e == 0){
           return '待审批'
       }else if(e == 1){
           return '已通过'
       }else if(e == 2){
           return '未通过'
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
      that.multipleSelection.forEach(val=>{
            arr.push(val.id)
      })

      that.$http.axios({
          method: "post",
          url: that.$url.lawHelp.delMore,
          params: {
            ids:arr.join(',')
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
      // console.log(val);
      sessionStorage.setItem('lawHelpId',val.id)
      this.$router.push({ name: "helpDetail", params: { id: val.id } });
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
