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
            node-key="id"
            style="margin-top: 7px"
            :props="treeProps"
            :data="permissions"
            show-checkbox
            :check-strictly="checkStrictly"
          >
          </el-tree>
        </el-form-item>
        <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
          <el-button @click="$router.back()">取消</el-button>
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
      checkStrictly: true,
      form: {
        rname: '',
        remarks: ''
      },
      rules: {
        rname: [
          {required: true, message: '角色名不能为空', trigger: 'blur'}
        ]
      },
      treeProps: {
        label: 'descritpion',
        children: 'children'
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
  async created () {
    this.id = this.$route.query.id
    await this.permissionInit()
    if (this.id) {
      this.init()
    }
  },
  methods: {
    init () {
      this.$http.get(this.$url.Role_By_Id, {rid: this.id}).then(res => {
        if (res.code === 200) {
          this.form = res.data
          const p = res.data.sysPermissions
          const pids = []
          for (let i = 0; i < p.length; i++) {
            pids.push(p[i].id)
          }
          this.$refs.tree.setCheckedKeys(pids)
          this.cancalP(this.permissions)
          this.checkStrictly = false
          this.$nextTick(() => {
            this.$refs.tree.setCheckedKeys(this.$refs.tree.getCheckedKeys())
          })
        }
      })
    },
    async permissionInit () {
      await this.$http.get(this.$url.Permission_List).then(res => {
        if (res.code === 200) {
          this.permissions = res.data
        }
      })
    },
    cancalP (p) {
      for (let i = 0; i < p.length; i++) {
        if (p[i].children) {
          this.$refs.tree.setChecked(p[i].id, false)
          this.cancalP(p[i].children)
        }
      }
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
        permissionids: [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]
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
        permissionids: [...this.$refs.tree.getHalfCheckedKeys(), ...this.$refs.tree.getCheckedKeys()]
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
