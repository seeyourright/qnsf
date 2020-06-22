<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—房间管理</div>
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
        label="ID"
      ></el-table-column>
      <el-table-column
        align="center"
        :show-overflow-tooltip="true"
        prop="a"
        label="名称"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="账号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="房间号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="状态"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
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
      width="700px"
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="县/市" prop="a">
          <el-select v-model="form.a">
            <el-option v-for="area in areas" :label="area" :value="area" :key="area"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视讯房间号" prop="b">
          <el-select v-model="form.b">
            <el-option v-for="area in areas" :label="area" :value="area" :key="area"></el-option>
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
        d: '',
        e: '1',
        f: ''
      },
      rules: {
        a: [
          {required: true, message: '县/市不能为空', trigger: 'blur'}
        ],
        b: [
          {required: true, message: '房间号不能为空', trigger: 'blur'}
        ]
      },
      areas: ['都匀市', '福泉市', '三都县']
    }
  },
  created () {
  },
  methods: {
    getData (page) {
    },
    detailHandler (row) {
      this.$router.push('roomEdit?id=' + row.id)
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
      console.log('add')
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
