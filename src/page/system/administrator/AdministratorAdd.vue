<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <div class="row">
        <el-form-item label="名称" prop="a">
          <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="a">
          <el-input v-model="form.b"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="账号" prop="a">
          <el-input v-model="form.c"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="a">
          <el-input v-model="form.d"></el-input>
        </el-form-item>
      </div>
      <div class="row">
        <el-form-item label="密码" prop="a">
          <el-input v-model="form.e"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="a" >
          <el-select v-model="form.f">
            <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <el-row>
        <el-col class="roomid" :span="12">
          <el-form-item label="法律咨询房间号">
            <el-select v-model="form.g">
              <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法律援助房间号">
            <el-select v-model="form.h">
              <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人民调解房间号">
            <el-select v-model="form.i">
              <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政复议房间号">
            <el-select v-model="form.j">
              <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="行政执法房间号">
            <el-select v-model="form.k">
              <el-option v-for="role in roles" :label="role" :value="role" :key="role"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态">
            <el-switch
              v-model="form.l"
              active-text="启用"
              inactive-text="禁用"
            >
            </el-switch>
          </el-form-item>
          <el-form-item v-if="form.m" label="创建时间">
            <div>{{form.m}}</div>
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
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        g: '',
        h: '',
        i: '',
        j: '',
        k: '',
        l: '',
        m: '',
        n: ''
      },
      rules: {
        a: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ]
      },
      roles: ['昌吉管理员']
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
