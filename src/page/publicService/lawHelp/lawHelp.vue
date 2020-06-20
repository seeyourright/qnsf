<template>
<!-- 人民调解申请列表 -->
  <div class="adjust">
    <!-- 操作栏 -->
    <div class="ad_row1">
      <span class="marginRight">状态</span>
      <div class="marginRight" style="width:15%;">
        <el-select v-model="status" placeholder="请选择" size="small"  @change = "getApplyList"   >
          <el-option value="全部">全部</el-option>
          <el-option value="待审批">待审批</el-option>
          <el-option value="审批通过">审批通过</el-option>
          <el-option value="审批拒绝">审批拒绝</el-option>
          <el-option value="达成调解">达成调解</el-option>
          <el-option value="未达成调解">未达成调解</el-option>
        </el-select>
      </div>
      <div class="marginRight" style="width:15%;">
        <el-input v-model="condition" placeholder="输入预约号/申请人" size="small"></el-input>
      </div>
      <el-button type="primary" size="small" icon="el-icon-search" @click="getApplyList" >搜索</el-button>
      <el-popconfirm title="确定删除吗？"  @onConfirm = "delMore"  style="margin-left:20px;">
        <el-button type="danger" size="small" slot="reference" >批量删除</el-button>
      </el-popconfirm>
    </div>

    <!-- 表格 -->
    <div class="ad_row2">
      <el-table
        ref="multipleTable"
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
export default {
  props: {},
  data() {
    return {
      status: "全部", //状态
      condition: null, //模糊查询字段
      currentPage: 1,
      size:10,
      totals:50,
      multipleSelection: [], //批量选择列表
      tableData: [
        {
          id: "0",
          num: "001",
          addr: "贵州省贵阳市观山湖区会展城55号a组团1栋3单元附2号",
          people: "王小虎",
          time: "2020-03-04",
          status: "待审批"
        },
        {
          id: "1",
          num: "001",
          addr: "贵州省贵阳市",
          people: "王小虎",
          time: "2020-03-04",
          status: "待审批"
        },
        {
          id: "2",
          num: "001",
          addr: "贵州省贵阳市",
          people: "王小虎",
          time: "2020-03-04",
          status: "待审批"
        },
        {
          id: "3",
          num: "001",
          addr: "贵州省贵阳市",
          people: "王小虎",
          time: "2020-03-04",
          status: "待审批"
        },
        {
          id: "4",
          num: "001",
          addr: "贵州省贵阳市",
          people: "王小虎",
          time: "2020-03-04",
          status: "待审批"
        }
      ]
    };
  },
  created() {},
  mounted() {},
  methods: {
    //查询人民调解申请列表
    getApplyList(){

    },
    //下拉框change事件
    selectChange(){

    },
    //批量删除
    delMore() {
        console.log('159')
    },
    //编辑
    lookDetail(val) {
      console.log(val);
      this.$router.push({name:"adjustDetail",params:{id:val.id}})
    },
    //点击表格多选框触发函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击分页触发函数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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

</style>
