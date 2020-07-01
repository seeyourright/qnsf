<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—角色管理</div>
      <el-form size="small" inline>
        <el-form-item v-permission="'role_add'">
          <el-button type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
<!--        <el-form-item>-->
<!--          <el-button type="danger" @click="deleteAllHandler">批量删除</el-button>-->
<!--        </el-form-item>-->
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
        prop="rid"
        label="ID"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="rname"
        label="角色名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createDate"
        label="创建时间"
      >
        <template slot-scope="scope">{{$util.dateFormat(scope.row.createDate)}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remarks"
        label="备注"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <div v-if="scope.row.rid.length > 3">
            <el-button v-permission="'role_update'" type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
            <el-button v-permission="'role_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
          </div>
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
  name: 'Role',
  data () {
    return {
      page: 1,
      size: 10,
      total: 100,
      condition: {},
      tableData: []
    }
  },
  created () {
    this.getData(1)
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('role_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$util.tableLoading()
      this.$http.get(this.$url.Role_List, {page, limit: this.size, ...this.condition}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      }).finally(res => {
        this.$util.tableLoaded()
      })
    },
    detailHandler (row) {
      this.$router.push('roleAdd?id=' + row.rid)
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$http.post(this.$url.Delete_Role, {rid: row.rid}).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData(this.page)
          }
        })
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
      this.$router.push('roleAdd')
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
