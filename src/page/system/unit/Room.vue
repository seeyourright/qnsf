<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—单位管理—房间管理</div>
      <el-form size="small" inline>
        <el-form-item v-permission="'role_add'">
          <el-button type="primary" @click="addHandler">添加房间</el-button>
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
        prop="roomNumber"
        label="房间号"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="roomType"
        label="房间类型"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="institutionalName"
        label="所属机构"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'role_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
      :show-close="false"
      :visible="dialogVisible"
      width="300px"
    >
      <div style="text-align: center">
        <el-select v-model="selectRoom">
          <el-option v-for="room in rooms" :label="room.roomNumber" :value="room.id" :key="room.id"></el-option>
        </el-select>
        <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'room',
  data () {
    return {
      id: null,
      type: null,
      name: null,
      dialogVisible: false,
      page: 1,
      size: 10,
      total: 100,
      condition: {},
      tableData: [],
      rooms: [],
      selectRoom: ''
    }
  },
  created () {
    this.id = this.$route.query.id
    this.type = this.$route.query.type
    this.name = this.$route.query.name
    this.getData(1)
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('role_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$util.tableLoading()
      this.$http.get(this.$url.Room_List, {page, limit: this.size, institutionalCode: this.id, roomType: this.type}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      }).finally(res => {
        this.$util.tableLoaded()
      })
    },
    roominit () {
      this.$http.get(this.$url.Room_List, {page: 0, limit: 0, institutionalCode: 0}).then(res => {
        if (res.code === 200) {
          this.rooms = res.data
        }
      })
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        const params = {
          id: row.id,
          institutionalCode: 0,
          institutionalName: '',
          roomType: ''
        }
        this.$http.post(this.$url.Update_Room, params).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData(this.page)
          }
        })
      }, () => {})
    },
    addHandler () {
      this.roominit()
      this.dialogVisible = true
    },
    submit () {
      if (!this.selectRoom) {
        this.$message.warning('请选择房间')
      }
      const params = {
        id: this.selectRoom,
        institutionalCode: this.id,
        institutionalName: this.name,
        roomType: this.type
      }
      this.$http.post(this.$url.Distribution_Room, params).then(res => {
        if (res.code === 200) {
          this.$message.success('分配成功')
          this.getData(1)
          this.dialogVisible = false
        } else {
          this.roominit()
          this.selectRoom = ''
        }
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
