<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名" prop="a">
              <el-input v-model="form.a"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="b">
              <el-input v-model="form.b"></el-input>
            </el-form-item>
            <el-form-item label="身份证号" prop="c">
              <el-input v-model="form.c"></el-input>
            </el-form-item>
            <el-form-item label="登录密码">
              <el-input v-model="form.d"></el-input>
            </el-form-item>
            <el-form-item label="用户角色">
              <el-radio-group v-model="form.e">
                <el-radio label="1">普通用户</el-radio>
                <el-radio label="2">调解员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.e==='2'" label="所属地区" prop="f">
              <el-select style="width: 100%" v-model="form.f">
                <el-option v-for="area in areas" :label="area" :value="area" :key="area"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="注册时间" prop="c">
              <div>{{form.g}}</div>
            </el-form-item>
            <el-form-item label="最后登录时间" prop="c">
              <div>{{form.h}}</div>
            </el-form-item>
            <el-form-item label="实名认证" prop="c">
              <el-switch
                v-model="form.i"
                active-text="是"
                inactive-text="否"
              ></el-switch>
            </el-form-item>
            <div class="id-img">
              <el-upload
                action="#"
              >
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </el-upload>
              <el-upload
                action="#"
              >
                <div>
                  <i class="el-icon-plus"></i>
                </div>
              </el-upload>
            </div>
            <el-form-item label="户籍所在地" prop="c" label-width="none" style="padding-left: 70px">
              <el-input v-model="form.j"></el-input>
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
  name: 'UserEdit',
  data () {
    return {
      id: null,
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '1',
        f: '',
        g: '',
        h: '',
        i: '',
        j: ''
      },
      rules: {
        a: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ],
        b: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'},
          {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
        ],
        c: [
          {validator: this.validateIdNumber}
        ],
        d: [
          {required: true, message: '不能为空', trigger: 'blur'}
        ]
      },
      roles: ['昌吉管理员'],
      areas: ['都匀市', '福泉市', '三都县']
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
    },
    validateIdNumber (rule, value, callback) {
      if (this.$util.idCheck(value)) {
        callback()
      } else {
        callback(new Error('身份证格式错误'))
      }
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.edit()
        }
      })
    },
    edit () {
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 800px
  .id-img
    padding-left 70px
    display flex
    align-items center
    justify-content space-between
  .el-upload
    >div
      width 140px
      height 100px
      line-height 100px
      text-align center
      border 1px solid #aaa
</style>
