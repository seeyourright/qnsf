<template>
  <div class="mm">
    <div class="condition">
      <div>政府服务—行政复议</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-select v-model="condition.cityNumber">
            <el-option label="全部地区" :value="null"></el-option>
            <el-option v-for="area in areas" :label="area.institutionalName" :value="area.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(1)">查询</el-button>
        </el-form-item>
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
        prop="city"
        label="县/市"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="department"
        label="科室"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="roomNumber"
        label="房间号"
      ></el-table-column>
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
    name: 'Ar',
    data () {
      return {
        page: 1,
        size: 10,
        total: 100,
        condition: {
          cityNumber: null
        },
        tableData: [],
        areas: []
      }
    },
    created () {
      this.getData(1)
      this.areaInit()
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Administrative_Reconsideration_List, {page, limit: this.size, ...this.condition}).then(res => {
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
      areaInit () {
        this.$http.get(this.$url.Area_Tree).then(res => {
          if (res.code === 200) {
            const area = []
            for (let i = 0; i < res.data.length; i++) {
              area.push(res.data[i])
              for (let j = 0; j < res.data[i].children.length; j++) {
                area.push(res.data[i].children[j])
              }
            }
            this.areas = area
          }
        })
      },
      detailHandler (row) {
        this.$router.push('arAdd?id=' + row.id)
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
          this.$http.post(this.$url.Delete_Administrative_Reconsideration, {ids: ids.join(',')}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      addHandler () {
        this.$router.push('arAdd')
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
