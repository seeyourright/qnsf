<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—房间管理</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-select v-model="condition.roomType"  placeholder="请选择房间类型">
            <el-option label="全部类型" :value="null"></el-option>
            <el-option v-for="item in unitType" :label="item" :value="item" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="condition.roomStatus">
            <el-option label="全部状态" :value="null"></el-option>
            <el-option label="空闲" :value="0"></el-option>
            <el-option label="忙碌" :value="1"></el-option>
            <el-option label="不可用" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData(1)">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-permission="'room_add'" type="primary" @click="addHandler">新增</el-button>
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
        :show-overflow-tooltip="true"
        prop="roomNumber"
        label="房间号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="roomType"
        label="房间类型"
      >
        <template slot-scope="scope">
          {{scope.row.roomType || '无'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="institutionalName"
        label="所属机构"
      >
        <template slot-scope="scope">
          {{scope.row.institutionalName || '无'}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="roomStatus"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.roomStatus === 0">空闲</span>
          <span v-if="scope.row.roomStatus === 1">忙碌</span>
          <span v-if="scope.row.roomStatus === 2">不可用</span>
          <span></span>
          <span></span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-if="scope.row.roomStatus === 2" v-permission="'room_update'" type="text" size="small" @click="statusHandler(scope.row)">启用</el-button>
          <el-button v-if="scope.row.roomStatus === 0" v-permission="'room_update'" type="text" size="small" @click="statusHandler(scope.row)">禁用</el-button>
          <el-button v-permission="'room_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
    <el-dialog
      :visible="dialogVisible"
      :show-close="false"
      width="300px"
    >
      <div>
        <el-input v-model="roomNumber" placeholder="请输入新的房间号"></el-input>
        <el-select style="width: 100%;margin-top: 20px" v-model="roomType"  placeholder="请选择房间类型">
          <el-option v-for="item in unitType" :label="item" :value="item" :key="item"></el-option>
        </el-select>
        <div style="text-align: center;margin-top: 20px">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      page: 1,
      size: 10,
      total: 100,
      condition: {
        roomStatus: null,
        roomType: null
      },
      tableData: [],
      dialogVisible: false,
      roomNumber: '',
      roomType: '',
      areas: [],
      unitType: [
        '人民调解',
        '法律援助',
        '法律咨询',
        '法考服务',
        '行政执法'
      ]
    }
  },
  created () {
    this.getData(1)
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('room_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$http.get(this.$url.Room_List, {page: page, limit: this.size, ...this.condition}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      })
    },
    statusHandler (row) {
      let status = 0
      if (row.roomStatus === 2) {
        status = 0
      } else if (row.roomStatus === 0) {
        status = 2
      } else {
        return false
      }
      this.$http.post(this.$url.Update_Room, {id: row.id, roomStatus: status}).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.getData(this.page)
        }
      })
    },
    deleteHandler (row) {
      this.$http.post(this.$url.Delete_Room, {id: row.id}).then(res => {
        if (res.code === 200) {
          this.$message.success('删除成功')
          this.getData(this.page)
        }
      })
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
      this.roomNumber = ''
      this.dialogVisible = true
    },
    submit () {
      if (!this.roomNumber) {
        this.$message.warning('请输入房间号')
        return false
      }
      if (!this.roomType) {
        this.$message.warning('请选择房间类型')
        return false
      }
      this.$http.post(this.$url.Add_Room, {roomNumber: this.roomNumber, roomType: this.roomType}).then(res => {
        if (res.code === 200) {
          this.$message.success('新增成功')
          this.getData(1)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    padding 0 20px
  .condition
    display flex
    align-items center
    justify-content space-between
</style>
