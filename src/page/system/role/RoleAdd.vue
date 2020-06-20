<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-form-item label="角色名称" prop="a">
          <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.b"></el-input>
        </el-form-item>
        <el-form-item label="权限">
          <el-tree
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
        a: '',
        b: '',
        c: ''
      },
      rules: {
        a: [
          {required: true, message: '不能为空', trigger: 'blur'}
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
  },
  methods: {
    init () {
      this.form.m = '2020-11-11 02:23:23'
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
      console.log('add')
    },
    edit () {
      console.log('edit')
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 800px
</style>
