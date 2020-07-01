<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—用户管理</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-input placeholder="输入姓名" v-model="condition.nickname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(1)">查询</el-button>
        </el-form-item>
        <el-form-item v-permission="'user_add'">
          <el-button type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
        <el-form-item v-permission="'user_delete'">
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
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="联系电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="createTime"
        label="注册时间"
      >
        <template slot-scope="scope">
          {{$util.dateFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="用户角色"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.userType === '0'">普通用户</span>
          <span v-if="scope.row.userType === '1'">调解员</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'user_update'" type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
          <el-button v-permission="'user_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
      :visible="dialogVisible"
      :show-close="false"
      title="新增"
      width="700px"
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="idCardNo">
          <el-input v-model="form.idCardNo"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="选择角色">
          <el-radio-group v-model="form.userType">
            <el-radio label="0">普通用户</el-radio>
            <el-radio label="1">调解员</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.userType==='1'" label="所属地区" prop="unitId">
          <el-select v-model="form.unitId">
            <el-option v-for="area in areas" :label="area.institutionalName" :value="area.id" :key="area.id"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align: right">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </el-form>
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
        nickname: null
      },
      tableData: [],
      dialogVisible: false,
      form: {
        nickname: '',
        phone: '',
        idCardNo: '',
        password: '',
        userType: '1',
        unitId: ''
      },
      rules: {
        nickname: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'},
          {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
        ],
        idCardNo: [
          {validator: this.validateIdNumber}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
        unitId: [
          {required: true, message: '县/市不能为空', trigger: 'blur'}
        ]
      },
      areas: []
    }
  },
  mounted () {
    this.areaInit()
    this.getData(1)
  },
  methods: {
    getData (page) {
      this.$util.tableLoading()
      this.$http.get(this.$url.User_List_No_Admin, {page, limit: this.size, ...this.condition}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      }).finally(res => {
        this.$util.tableLoaded()
      })
    },
    areaInit () {
      this.$http.get(this.$url.Area_All).then(res => {
        if (res.code === 200) {
          const area = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].pid === 0) {
              area.push(res.data[i])
            }
            if (area.length > 0 && area[0].id === res.data[i].pid.toString()) {
              area.push(res.data[i])
            }
          }
          this.areas = area
        }
      })
    },
    validateIdNumber (rule, value, callback) {
      if (this.$util.idCheck(value)) {
        callback()
      } else {
        callback(new Error('身份证格式错误'))
      }
    },
    detailHandler (row) {
      this.$router.push('userEdit?id=' + row.id)
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
      this.dialogVisible = true
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.add()
        }
      })
    },
    add () {
      if (this.form.userType === '0') {
        delete this.form.unitId
      }
      this.form.username = this.form.phone
      this.$http.post(this.$url.Add_User, this.form).then(res => {
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
