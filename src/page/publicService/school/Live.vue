<template>
  <div style="margin-top: 20px">
    <div class="condition">
      <div></div>
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
        prop="id"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="zlogo"
        label="图片"
      >
        <template slot-scope="scope">
          <div style="line-height: 0">
            <el-image :src="scope.row.zlogo" :preview-src-list="[scope.row.zlogo]"></el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="zname"
        label="标题"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="zstatus"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.zstatus === 0">停用</span>
          <span v-if="scope.row.zstatus === 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="zcreate"
        label="创建时间"
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
    name: 'Live',
    data () {
      return {
        page: 1,
        size: 10,
        total: 100,
        condition: {},
        tableData: [],
      }
    },
    created () {
      this.getData(1)
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.School_Live_List, {page, limit: this.size, ...this.condition}).then(res => {
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
        this.$router.push('LiveAdd?id=' + row.id)
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
          this.$http.post(this.$url.Delete_School_Live, {idList: ids.join(',')}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      addHandler () {
        this.$router.push('LiveAdd')
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
