<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—APP管理</div>
      <el-form size="small" inline>
        <el-form-item v-permission="'app_add'">
          <el-button type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
        <el-form-item v-permission="'app_delete'">
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
        prop="versionName"
        label="版本号"
      ></el-table-column>
      <el-table-column
        style="white-space: pre-wrap"
        align="center"
        prop="modifyContent"
        label="更新内容"
      >
        <template slot-scope="scope">
          <div style="white-space: pre-wrap">{{scope.row.modifyContent}}</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="updateStatus"
        label="强制更新"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.updateStatus === 1">是</span>
          <span v-else>否</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="id"
        label="下载地址"
      >
        <template slot-scope="scope">
          <a :href="scope.row.downloadUrl">{{scope.row.downloadUrl}}</a>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="uploadTime"
        label="上传时间"
      >
        <template slot-scope="scope">
          <span>{{$util.dateFormat(scope.row.uploadTime)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button v-permission="'app_delete'" type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
      title="新增"
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="版本号" prop="versionName">
          <el-input-number style="width: 50px" step-strictly :controls="false" v-model="versionName[0]"></el-input-number>
          <span>.</span>
          <el-input-number style="width: 50px" step-strictly :controls="false" v-model="versionName[1]"></el-input-number>
          <span>.</span>
          <el-input-number style="width: 50px" step-strictly :controls="false" v-model="versionName[2]"></el-input-number>
        </el-form-item>
        <el-form-item label="更新内容" prop="modifyContent">
          <el-input v-model="form.modifyContent" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="up_file">
          <el-upload
            action="#"
            type="file"
            :before-upload="beforeUpload"
          >
            <el-button>选择文件</el-button>
            <span>{{form.up_file ? form.up_file.name : ''}}</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="强制更新" prop="a">
          <el-switch
            v-model="form.updateStatus"
            active-value="1"
            inactive-value="2"
            active-text="是"
            inactive-text="否"
          ></el-switch>
        </el-form-item>
        <div style="text-align: right">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit" :loading="loading">{{loading? percent+'%':'保存'}}</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      loading: false,
      percent: 0,
      page: 1,
      size: 10,
      total: 100,
      tableData: [],
      dialogVisible: false,
      form: {
        versionName: '',
        modifyContent: '',
        'up_file': null,
        updateStatus: '1'
      },
      versionName: ['', '', ''],
      rules: {
        versionName: [
          {validator: this.nameValidator, trigger: 'blur'}
        ],
        modifyContent: [
          {required: true, message: '更新内容不能为空', trigger: 'blur'}
        ],
        'up_file': [
          {required: true, message: '文件不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  mounted () {
    this.getData(1)
  },
  methods: {
    getData (page) {
      if (this.$store.state.permission.indexOf('app_select') === -1) {
        this.$message.warning('没有权限')
        return false
      }
      this.$util.tableLoading()
      this.$http.get(this.$url.App_List, {page, limit: this.size}).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
          this.page = page
          this.total = res.totals
        }
      }).finally(res => {
        this.$util.tableLoaded()
      })
    },
    nameValidator (rule, value, callback) {
      for (let i = 0; i < this.versionName.length; i++) {
        if (this.versionName[i] === undefined) {
          callback(new Error('版本号不能为空'))
          return false
        }
      }
      callback()
    },
    beforeUpload (file) {
      this.form.up_file = file
      return false
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$http.post(this.$url.Delete_App, {ids: [row.versionCode]}).then(res => {
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
        ids.push(selection[i].versionCode)
      }
      this.$confirm('确定删除吗').then(() => {
        this.$http.post(this.$url.Delete_App, {ids: ids}).then(res => {
          if (res.code === 200) {
            this.$message.success('删除成功')
            this.getData(this.page)
          }
        })
      }, () => {})
    },
    addHandler () {
      this.form = {
        appVersion: '',
        updateContent: '',
        'up_file': null,
        updateStatus: '1'
      }
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
      const formdata = new FormData()
      this.form.versionName = this.versionName.join('.')
      for (let key in this.form) {
        formdata.append(key, this.form[key])
      }
      this.loading = true
      this.$http.axios.post(this.$url.Add_App, formdata, {
        onUploadProgress: (progressEvent) => {
          this.percent = Math.floor(progressEvent.loaded / progressEvent.total * 100)
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('新增成功')
          this.getData(1)
          this.dialogVisible = false
        }
      }).finally(res => {
        this.loading = false
        this.percent = 0
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
  .form
    padding 0 20px
    /deep/ textarea
      height 150px
</style>
