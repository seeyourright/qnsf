<template>
  <div class="mm">
    <div class="condition">
      <div>政府服务—群众来信</div>
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
        prop="userId"
        label="用户名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="联系方式"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="replyContent"
        label="内容"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="县/市"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="留言时间"
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
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'Ml',
    data () {
      return {
        page: 1,
        size: 10,
        total: 100,
        condition: {
        },
        tableData: [],
      }
    },
    created () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.condition.cityNumber = this.$store.state.user.unitId
      }
      this.getData(1)
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.PeopleMsg_List, {page, limit: this.size, ...this.condition}).then(res => {
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
        this.$router.push('mlDetail?id=' + row.id)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .condition
    display flex
    align-items center
    justify-content space-between
    >div
      margin-bottom 18px
</style>
