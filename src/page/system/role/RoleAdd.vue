<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-form-item label="角色名称" prop="rname">
          <el-input v-model="form.rname"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
            ref="tree"
            style="margin-top: 7px"
            :data="permissions"
            show-checkbox
          >
          </el-tree>
        </el-form-item>
        <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'roleAdd',
  data () {
    return {
      id: null,
      form: {
        rname: '',
        remarks: '',
        permissionids: ['1']
      },
      rules: {
        rname: [
          {required: true, message: '角色名不能为空', trigger: 'blur'}
        ]
      },
      permissions: [
        {
          label: '系统管理',
          children: [
            {
              label: '角色管理',
              children: [
                {
                  label: '增加'
                },
                {
                  label: '删除'
                },
                {
                  label: '修改'
                },
                {
                  label: '查询'
                }
              ]
            }
          ]
        },
        {
          label: '公共服务',
          children: [

          ]
        }
      ]
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.init()
    }
    this.permissionInit()
  },
  methods: {
    init () {
      this.$http.get(this.$url.Role_List, {rid: this.id}).then(res => {
        if (res.code === 200 && res.data.length > 0) {
          this.form = res.data[0]
        }
      })
    },
    permissionInit () {
      this.$http.get(this.$url.Permission_List).then(res => {
        if (res.code === 200) {
          this.permissions = this.data
        }
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.id) {
            this.edit()
          } else {
            this.add()
          }
        }
      })
    },
    add () {
      const params = {
        rname: this.form.rname,
        remarks: this.form.remarks,
        permissionids: this.form.permissionids
      }
      this.$http.post(this.$url.Add_Role, params).then(res => {
        if (res.code === 200) {
          this.$message.success('新增成功')
          this.$router.back()
        }
      })
    },
    edit () {
      const params = {
        rid: this.form.rid,
        rname: this.form.rname,
        remarks: this.form.remarks,
        permissionids: this.form.permissionids
      }
      this.$http.post(this.$url.Update_Role, params).then(res => {
        if (res.code === 200) {
          this.$message.success('编辑成功')
          this.$router.back()
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 800px
</style>
