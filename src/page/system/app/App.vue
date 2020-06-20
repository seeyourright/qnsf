<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—APP管理</div>
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
        prop="a"
        label="版本名称"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="a"
        label="更新内容"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="强制更新"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="下载地址"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="上传时间"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
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
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="版本名称" prop="a">
          <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label="更新内容" prop="a">
          <el-input v-model="form.b" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上传文件" prop="a">
          <el-upload type="file">
            <el-button>选择文件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="强制更新" prop="a">
          <el-switch
            v-model="form.d"
            active-text="是"
            inactive-text="否"
          ></el-switch>
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
  name: 'App',
  data () {
    return {
      page: 1,
      size: 10,
      total: 100,
      tableData: [
        {a: 1, id: 1},
        {a: 1, id: 1},
        {a: 1, id: 1},
        {a: 1, id: 1},
        {a: 1, id: 1}
      ],
      dialogVisible: false,
      form: {
        a: '',
        b: '',
        c: '',
        d: ''
      },
      rules: {
        a: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
  },
  methods: {
    getData (page) {
    },
    deleteHandler (row) {
      this.$confirm('确定删除吗').then(() => {
        this.$message.success('删掉啦，开玩笑的ο(=•ω＜=)ρ⌒☆')
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
