<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—管理员列表</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-input placeholder="输入名称" v-model="condition.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-permission="'admin_add'" type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
        <el-form-item v-permission="'admin_delete'">
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
        label="ID"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="nickname"
        label="名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userType"
        label="角色"
      >
        <template slot-scope="scope">
          管理员
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 1">启用</span>
          <span v-if="scope.row.status === 0">停用</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="创建时间"
      >
        <template slot-scope="scope">{{$util.dateFormat(scope.row.createTime)}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'admin_update'" type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
          <el-button v-permission="'admin_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
          <el-button v-permission="'admin_update'" type="text" size="small" @click="openDialog(scope.row)">分配角色</el-button>
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
      width="400px"
    >
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-select v-model="roleid">
          <el-option v-for="role in roles" :label="role.rname" :value="role.rid" :key="role.rid"></el-option>
        </el-select>
        <div style="margin-top: 60px">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="roleChange">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Administrator',
  data () {
    return {
      page: 1,
      size: 10,
      total: 0,
      dialogVisible: false,
      condition: {
        userType: '2'
      },
      tableData: [],
      uid: '',
      roleid: '',
      roles: []
    }
  },
  mounted () {
    this.getData(1)
    this.roleInit()
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('admin_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$util.tableLoading()
      this.$http.get(this.$url.User_List, {page, limit: this.size, ...this.condition}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      }).finally(res => {
        this.$util.tableLoaded()
      })
    },
    roleInit () {
      this.$http.get(this.$url.Role_List).then(res => {
        if (res.code === 200) {
          this.roles = res.data
        }
      })
    },
    detailHandler (row) {
      this.$router.push('administratorEdit?id=' + row.id)
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$http.post(this.$url.Delete_User, {uid: row.id}).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData(this.page)
          }
        })
      }, () => {})
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
        this.$http.post(this.$url.Delete_User_Batch, {ids}).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData(this.page)
          }
        })
      }, () => {})
    },
    addHandler () {
      this.$router.push('administratorAdd')
    },
    openDialog (row) {
      this.uid = row.id
      this.roleid = ''
      this.$http.get(this.$url.Role_By_User, {uid: row.id}).then(res => {
        if (res.code === 200 && res.data.length > 0) {
          this.roleid = res.data[0].rid
        }
      })
      this.dialogVisible = true
    },
    roleChange () {
      this.$http.post(this.$url.Give_User_Role, {uid: this.uid, roleid: this.roleid}).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.dialogVisible = false
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
