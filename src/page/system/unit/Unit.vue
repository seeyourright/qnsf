<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—单位管理</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-select style="width: 220px" v-model="condition.departmentType" @change="getData(1)">
            <el-option label="全部类型" :value="null"></el-option>
            <el-option v-for="item in unitType" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-permission="'unit_add'">
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
        prop="departmentName"
        label="名称"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="phone"
        label="电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="departmentType"
        label="类型"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="principal"
        label="负责人"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'unit_update'" type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
          <el-button v-permission="'unit_update'" type="text" size="small" @click="roomHandler(scope.row)">房间管理</el-button>
          <el-button v-permission="'unit_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
    <el-dialog
      width="800px"
      :visible.sync="dialogVisible"
    >
      <Room ref="room" :id="room.id" :type="room.type" :name="room.name"></Room>
    </el-dialog>
  </div>
</template>

<script>
import Room from './Room'
export default {
  name: 'unit',
  components: {
    Room
  },
  data () {
    return {
      dialogVisible: false,
      page: 1,
      size: 10,
      total: 100,
      condition: {
        departmentType: null
      },
      room: {
        id: 0,
        type: '',
        name: ''
      },
      tableData: [],
      unitType: [
        '人民调解',
        '法律援助',
        '法律咨询'
      ]
    }
  },
  created () {
    if (this.$store.state.user.userType === '2') {
      this.condition.area = this.$store.state.user.unitId
    }
    this.getData(1)
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('unit_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$util.tableLoading()
      this.$http.get(this.$url.Unit_List, {page, limit: this.size, ...this.condition}).then(res => {
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
      this.$router.push('unitEdit?id=' + row.institutionalCode)
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$http.post(this.$url.Delete_Unit, {institutionalCode: row.institutionalCode}).then(res => {
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
      this.$router.push('unitEdit')
    },
    roomHandler (row) {
      // this.$router.push('unitRoom?id=' + row.institutionalCode + '&type=' + row.departmentType + '&name=' + row.departmentName)
      this.room.id = row.institutionalCode
      this.room.type = row.departmentType
      this.room.name = row.departmentName
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.room.getData(1)
      })
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
