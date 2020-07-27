<template>
  <div class="mm">
    <div class="condition">
      <div>政府服务—行政执法</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-select v-model="condition.did">
            <el-option label="全部地区" :value="null"></el-option>
            <el-option v-for="area in areas" :label="area.institutionalName" :value="area.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入司法所名称" v-model="condition.zfsname"></el-input>
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
        prop="zfsname"
        label="执法单位"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="region"
        label="县/市"
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
        prop="zfscreate"
        label="创建时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">基础信息</el-button>
          <el-button type="text" size="small" @click="officer(scope.row)">执法人员</el-button>
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
        page: 1,
        size: 10,
        total: 100,
        condition: {
          did: null,
          zfsname: ''
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
        this.$http.get(this.$url.Law_Enforcement_Agencies_List, {page, limit: this.size, ...this.condition}).then(res => {
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
        this.$router.push('aleAdd?id=' + row.id)
      },
      officer (row) {
        this.$router.push('leo?id=' + row.id)
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
          this.$http.post(this.$url.Delete_Law_Enforcement_Agencies, {idList: ids}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      addHandler () {
        this.$router.push('aleAdd')
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
