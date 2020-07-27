<template>
  <div class="mm">
    <div class="condition">
      <div>政府服务—行政执法—执法人员</div>
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
        prop="ryname"
        label="执法人员"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="sex"
        label="性别"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.sex === 1">男</span>
          <span v-if="scope.row.sex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">停用</span>
          <span v-if="scope.row.status === 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="rynumber"
        label="证件号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
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
    name: 'Ale',
    data () {
      return {
        id: null,
        page: 1,
        size: 10,
        total: 100,
        tableData: [],
        areas: []
      }
    },
    created () {
      this.id = this.$route.query.id
      if (this.id) {
        this.getData(1)
      }
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Law_Enforcement_Officer_List, {page, limit: this.size, did: this.id}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.page = page
            this.total = res.totals
          } else if (res.code === 203) {
            this.tableData = []
            this.page = 1
            this.total = 0
          }
        }).finally(res => {
          this.$util.tableLoaded()
        })
      },
      detailHandler (row) {
        this.$router.push('leoAdd?id=' + row.id + '&did=' + this.id)
      },
      deleteAllHandler () {
        const selection = this.$refs.table.selection
        if (selection.length === 0) {
          this.$message.warning('至少选择一条数据')
          return false
        }
        const ids = []
        for (let i = 0; i < selection.length; i++) {
          ids.push(selection[i].id)
        }
        this.$confirm('确定删除吗').then(() => {
          this.$http.post(this.$url.Delete_Law_Enforcement_Officer, {idList: ids}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      addHandler () {
        this.$router.push('leoAdd?did='+this.id)
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
