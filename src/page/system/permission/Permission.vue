<template>
    <div class="mm">
      <el-button style="margin-bottom: 10px" @click="addHandler({id: '0'})">增加顶级权限</el-button>
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: true}">
      >
        <el-table-column
          prop="id"
          label="id"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="name"
          width="180">
        </el-table-column>
        <el-table-column
          prop="descritpion"
          label="descritpion"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="a"
          label="操作"
        >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="addHandler(scope.row)">增加下级</el-button>
            <el-button type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
            <el-button type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :show-close="false"
        :visible="dialogVisible"
      >
        <div>
          <el-form label-width="150px">
            <el-form-item label="name">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="descritpion">
              <el-input v-model="form.descritpion"></el-input>
            </el-form-item>
            <el-form-item label="url">
              <el-input v-model="form.url"></el-input>
            </el-form-item>
            <div style="text-align: right">
              <el-button @click="dialogVisible=false">取消</el-button>
              <el-button type="primary" @click="submit">保存</el-button>
            </div>
          </el-form>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'permission',
  data () {
    return {
      dialogVisible: false,
      tableData: [],
      form: {
        pid: '',
        name: '',
        descritpion: '',
        url: ''
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$http.get(this.$url.Permission_List).then(res => {
        if (res.code === 200) {
          this.tableData = res.data
        }
      })
    },
    addHandler (row) {
      this.form = {
        pid: row.id,
        name: '',
        descritpion: '',
        url: ''
      }
      this.dialogVisible = true
    },
    editHandler (row) {
      this.form = row
      this.dialogVisible = true
    },
    deleteHandler (row) {
      this.$http.post(this.$url.Delete_Permission, {pid: row.id}).then(res => {
        if (res.code === 200) {
          this.init()
        }
      })
    },
    submit () {
      if (this.form.id) {
        this.edit()
      } else {
        this.add()
      }
    },
    add () {
      this.$http.post(this.$url.Add_Permission, this.form).then(res => {
        if (res.code === 200) {
          this.init()
          this.dialogVisible = false
        }
      })
    },
    edit () {
      this.$http.post(this.$url.Update_Permission, this.form).then(res => {
        if (res.code === 200) {
          this.init()
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>

</style>
