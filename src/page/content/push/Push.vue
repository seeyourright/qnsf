<template>
  <div class="mm">
    <div class="condition">
      <div>内容管理—系统推送</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-button type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteAllHandler">批量删除</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
      border
    >
      <el-table-column
        align="center"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="a"
        label="推送标题"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="推送用户"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="状态"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="推送时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
          <el-button type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="y-page"
      @current-change="getData"
      :current-page.sync="page"
      :page-size="size"
      layout="prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {
      page: 1,
      size: 10,
      total: 100,
      tableData: [
        {a: 1, id: 1, img: 'http://demo.qfpffmp.cn/cssthemes6/cob_1_kiaalap/img/student/3.jpg'},
        {a: 1, id: 1},
        {a: 1, id: 1},
        {a: 1, id: 1},
        {a: 1, id: 1}
      ]
    }
  },
  created () {
  },
  methods: {
    getData (page) {
    },
    detailHandler (row) {
      this.$router.push('bannerAdd?id=' + row.id)
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$message.success('删掉啦，开玩笑的ο(=•ω＜=)ρ⌒☆')
      }, () => {})
    },
    deleteAllHandler () {
      if (this.$refs.table.selection.length === 0) {
        this.$message.warning('至少选择一条数据')
        return false
      }
      this.$confirm('确定删除吗').then(() => {
        this.$message.success('删掉啦，开玩笑的ο(=•ω＜=)ρ⌒☆')
      }, () => {})
    },
    addHandler () {
      this.$router.push('pushAdd')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .condition
    display flex
    align-items center
    justify-content space-between
</style>
