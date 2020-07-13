<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="登录密码" prop="password">
              <el-input v-model="form.password" placeholder="不填写则不会修改密码"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" prop="userType">
              <el-radio-group v-model="form.userType">
                <el-radio label="0">普通用户</el-radio>
                <el-radio label="1">调解员</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="最后登录时间" prop="lastLoginTime">
              <div>{{$util.dateFormat(form.lastLoginTime)}}</div>
            </el-form-item>
            <el-form-item label="注册时间" prop="createTime">
              <div>{{$util.dateFormat(form.createTime)}}</div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item v-if="form.userType==='1'" label="所属地区" prop="unitId">
          <el-cascader
            style="width: 100%"
            :props="{value: 'id', label: 'institutionalName'}"
            v-model="area"
            :options="areas"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="实名认证">
          <span v-if="form.idCardNo" style="color: green">已认证</span>
          <span v-else style="color: red">未认证</span>
        </el-form-item>
        <el-form-item style="width: 50%;float: left" label="姓名" prop="nickname">
          {{form.nickname || '未填写'}}
        </el-form-item>
        <el-form-item style="width: 50%;float: left" label="身份证号" prop="idCardNo">
          {{form.idCardNo || '未填写'}}
        </el-form-item>
        <el-form-item label="户籍所在地" prop="address">
          {{form.address || '未填写'}}
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
  name: 'UserEdit',
  data () {
    return {
      id: null,
      dialogVisible: false,
      form: {
        nickname: '',
        phone: '',
        idCardNo: '',
        password: '',
        userType: '0',
        createTime: '',
        lastLoginTime: '',
        address: ''
      },
      rules: {
        phone: [
          {required: true, message: '联系电话不能为空', trigger: 'blur'},
          {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
        ]
      },
      area: null,
      areas: []
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.init()
    }
    this.areaInit()
  },
  methods: {
    init () {
      this.$http.get(this.$url.User_One, {id: this.id}).then(res => {
        if (res.code === 200) {
          delete res.data.password
          this.form = res.data
          this.area = [this.form.unitId, this.form.townId, this.form.communityId]
        }
      })
    },
    areaInit () {
      this.$http.get(this.$url.Area_Tree).then(res => {
        let areas = res.data[0].children
        if (this.$store.state.user.userType === '2') {
          for (let i = 0; i < areas.length; i++) {
            if (this.$store.state.user.unitId === areas[i].id) {
              areas = [areas[i]]
              break
            }
          }
        }
        this.filterChildren(areas)
        this.areas = areas
      })
    },
    filterChildren (arr) {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].children.length > 0) {
          this.filterChildren(arr[i].children)
        } else {
          arr[i].children = null
        }
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
      const params = {
        id: this.id,
        phone: this.form.phone,
        userType: this.form.userType
      }
      if (this.form.password) {
        params.password = this.form.password
      }
      if (params.userType === '1') {
        params.roleid = 2
        params.unitId = this.area[0]
        params.townId = this.area[1]
        params.communityId = this.area[2]
      } else {
        params.roleid = 0
      }
      this.$http.post(this.$url.Update_User, params).then(res => {
        if (res.code === 200) {
          this.$message.success('修改成功')
          this.$router.back()
          this.roleChange(params.roleid)
        }
      })
    },
    roleChange (rid) {
      this.$http.post(this.$url.Give_User_Role, {uid: this.id, roleid: rid}).then(res => {
        if (res.code === 200) {
        }
      })
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 800px
  .id-img
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
      img
        height 100%
        width 100%
</style>
