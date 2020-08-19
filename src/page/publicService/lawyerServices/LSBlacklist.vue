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
        prop="nickName"
        label="用户名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="联系电话"
      >
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
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog
      :visible="dialogVisible"
      :show-close="false"
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="用户名" prop="nickName">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <div style="text-align: right">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'LSLawyer',
    data () {
      return {
        loading: false,
        dialogVisible: false,
        page: 1,
        size: 10,
        total: 100,
        tableData: [],
        condition: {

        },
        form: {
          nickName: '',
          phone: ''
        },
        rules: {
          nickName: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
          ]
        },
        areas: [],
      }
    },
    mounted () {
      this.getData(1)
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Law_Blacklist_List, {page, limit: this.size, ...this.condition}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.page = page
            this.total = res.totals
          } else if(res.code === 203) {
            this.tableData = []
            this.page = 1
            this.total = 0
          }
        }).finally(res => {
          this.$util.tableLoaded()
        })
      },
      addHandler () {
        this.form = {
          nickName: '',
          phone: '',
        }
        this.dialogVisible = true
      },
      detailHandler (row) {
        this.form = {...row}
        this.dialogVisible = true
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
          this.$http.post(this.$url.Delete_Law_Blacklist, {ids: ids.join(',')}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id) {
              this.edit()
            } else {
              this.add()
            }
          }
        })
      },
      async add () {
        this.loading = true
        const params = {...this.form}
        params.lawyerServerId = this.$parent.id
        this.$http.post(this.$url.Add_Law_Blacklist, params).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.getData(1)
            this.dialogVisible = false
          }
        }).finally(res => {
          this.loading = false
        })
      },
      async edit () {
        this.loading = true
        const params = {...this.form}
        delete params.createTime
        if (this.file) {
          this.key = 'laywer'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_Law_Blacklist, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.getData(1)
            this.dialogVisible = false
          }
        }).finally(res => {
          this.loading = false
        })
      }
    },
  }
</script>

<style lang='stylus' scoped>
  .condition
    display flex
    align-items center
    justify-content space-between
  .form
    padding 0 20px
</style>
