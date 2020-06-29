<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <div class="row">
        <el-form-item label="名称" prop="nickname">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" :placeholder="id?'不填写则不会修改密码':''"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="禁用"
          >
          </el-switch>
        </el-form-item>
      </div>
      <el-row>
        <el-col :span="12">
          <el-form-item v-if="form.createTime" label="创建时间">
            <div>{{$util.dateFormat(form.createTime)}}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AdministratorAdd',
  data () {
    return {
      id: null,
      form: {
        nickname: '',
        phone: '',
        username: '',
        email: '',
        password: '',
        status: '1',
        userType: '2'
      },
      rules: {
        nickname: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ],
        username: [
          {required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'},
          {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '邮箱不能为空', trigger: 'blur'},
          {pattern: this.$util.emailReg, message: '邮箱格式错误', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不能为空', trigger: 'blur'}
        ],
      },
      roles: []
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.init()
      delete this.rules.password
    }
    this.roleInit()
  },
  methods: {
    init () {
      this.$http.get(this.$url.User_One, {id: this.id}).then(res => {
        if (res.code === 200) {
          delete res.data.password
          this.form = res.data
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
      this.$http.post(this.$url.Add_User, this.form).then(res => {
        if (res.code === 200) {
          this.$message.success('新增成功')
          this.$router.back()
        }
      })
    },
    edit () {
      const params = {
        id: this.id,
        nickname: this.form.nickname,
        phone: this.form.phone,
        username: this.form.username,
        email: this.form.email,
        status: this.form.status
      }
      if (this.form.password) {
        params.password = this.form.password
      }
      this.$http.post(this.$url.Update_User, params).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
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
  .row
    display flex
    .el-form-item
      flex 1
      .el-select
        width 100%
  .roomid
    .el-select
      width 100%
</style>
