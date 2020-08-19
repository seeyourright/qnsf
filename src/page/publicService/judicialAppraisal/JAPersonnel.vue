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
        prop="nickname"
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
        <el-form-item label="图片" prop="imgUrl">
          <el-upload
            action="#"
            type="file"
            :before-upload="beforeUpload"
            :show-file-list="false"
            accept="image/*"
          >
            <div style="text-align: left">
              <el-button>选择图片</el-button>
            </div>
          </el-upload>
          <div v-if="imgUrl" style="margin-top: 10px">
            <el-image class="img" :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
          </div>
        </el-form-item>
        <el-form-item label="姓名" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group  v-model="form.status">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
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
    name: 'JAPersonal',
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
          nickname: '',
          phone: '',
          status: 1
        },
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          nickname: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
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
        this.$http.get(this.$url.Appraisal_Person_List, {page, limit: this.size, ...this.condition}).then(res => {
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
          nickname: '',
          phone: '',
          status: 1
        },
        this.file = null
        this.key = ''
        this.imgUrl = ''
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
          this.$http.post(this.$url.Delete_Appraisal_Person, {ids: ids.join(',')}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('imgUrl')
          })
        }
        return Promise.reject(new Error())
      },
      imgValidator (rule, value, callback) {
        if (!this.imgUrl) {
          callback(new Error('图片不能为空'))
          return false
        }
        callback()
      },
      async uploadFile (file, key) {
        return await this.$ObsClient.putObject({
          Bucket: 'zhsf',
          Key: key,
          SourceFile: file,
        })
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
        params.appraisalOfficeId = this.$parent.id
        if (this.file) {
          this.key = 'appraisal'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_Appraisal_Person, params).then(res => {
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
          this.key = 'appraisal'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_Appraisal_Person, params).then(res => {
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
