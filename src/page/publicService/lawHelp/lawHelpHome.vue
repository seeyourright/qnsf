<template>
  <!-- 人民调解申请列表 -->
  <div class="adjust">
    <p class="lawTitle">法律援助</p>
    <!-- 操作栏 -->
    <div class="ad_row1">
      <span class="marginRight">县/市</span>
      <div class="marginRight" style="width:15%;">
        <el-select v-model="city" placeholder="请选择" size="small" @change="selectChange">
             <el-option
                    :label="item.name"
                    :value="item.name"
                    v-for="(item,index) in cityList"
                    :key="index"
                  ></el-option>
        </el-select>
      </div>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add">新增</el-button>
      <el-popconfirm title="确定删除吗？" @onConfirm="delMore" style="margin-left:20px;">
        <el-button type="danger" size="small" slot="reference">批量删除</el-button>
      </el-popconfirm>
    </div>

    <!-- 表格 -->
    <div class="ad_row2">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="city" label="县/市" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="roomNumber" label="房间号" align="center"></el-table-column>
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
        layout="total, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      city:'',
      loading:false,
      cityList:[],
      currentPage: 1, //当前页
      size: 5, //每页展示条数
      totals: 50, //总条数
      multipleSelection: [], //批量选择列表
      tableData: [
        {
          id: "",
          city: "",
          phone: "",
          status: ""
        }

      ]
    };
  },
  created() {
      this.getCity()
  },
  mounted() {},
  methods: {
      add(){
        sessionStorage.setItem('lawHelpHome', JSON.stringify({mode:'add'}))
        this.$router.push('lawHelpAdd')
      },
      getCity(){
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.getCity,
          params: {
          }
        })
        .then(function(res) {
          console.log("获取行政单位", res);
          that.cityList = []
          if (res.data.code == 200) {
              res.data.data.forEach(val=>{
                   that.cityList.push({
                     name:val.institutionalName,
                     value:val.id
                   })
              })

              that.city = that.cityList[0].name
              that.getApplyList()
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    //查询人民调解申请列表
    getApplyList() {
      const that = this;
      that.loading = true
      that.$http.axios({
          method: "post",
          url: that.$url.lawHelp.getList1,
          params: {
            // status: that.status,
            city: that.city,
            page:that.currentPage,
            limit:that.size
          }
        })
        .then(function(res) {
          console.log('法律援助列表Home',res);
          that.loading = false
          that.tableData = []
          if(res.data.code == 200){
              that.totals = res.data.totals
              res.data.data.forEach(val => {
                   that.tableData.push({
                         id: val.id,
                         city: val.city,
                         phone: val.phone,
                         status: val.status == 0?'未启用':'启用',
                         roomNumber: val.roomNumber
                   })
              });
          }
        })
        .catch(function(error) {
          that.loading = false
          console.log(error);
        });
    },
    //下拉框change事件
    selectChange(e) {
        console.log(e)
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
          url: that.$url.lawHelp.delMore1,
          params: {
            ids:arr.join(',')
          }
        })
        .then(function(res) {
          console.log('批量删除',res);
          if(res.data.code == 200){
              that.getApplyList()
               that.$message.success('删除成功！');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查看详情
    lookDetail(val) {
      console.log(val);
      sessionStorage.setItem('lawHelpHome', JSON.stringify({mode:'update',id:val.id}))
      this.$router.push('lawHelpAdd')
    //   this.$router.push({ name: "adjustDetail", params: { id: val.id } });
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
