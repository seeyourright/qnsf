<template>
  <div class="mm">
    <el-form ref="form" class="form" :model="form" :rules="rules" label-width="150px">
      <el-form-item label="名称" prop="departmentName">
        <el-input style="width: 220px" v-model="form.departmentName"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input style="width: 220px" v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input style="width: 220px" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-select style="width: 220px" v-model="form.area" :disabled="$store.state.user.userType === '2'">
          <el-option v-for="area in areas" :label="area.institutionalName" :value="area.id" :key="area.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <el-form-item label="单位简介" prop="departmentSynopsis">
        <el-input type="textarea" v-model="form.departmentSynopsis"></el-input>
      </el-form-item>
      <el-form-item label="单位类型" prop="departmentType">
        <el-select style="width: 220px" v-model="form.departmentType">
          <el-option v-for="item in unitType" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="负责人" prop="principal">
        <el-input style="width: 220px" v-model="form.principal"></el-input>
      </el-form-item>
      <el-form-item label="职能" prop="function">
        <el-input v-model="form.functions"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="function">
        <el-upload
          action="#"
          :before-upload="beforeUpload"
          :show-file-list="false"
        >
          <div style="text-align: left;margin-bottom: 10px">
            <el-button>上传图片</el-button>
          </div>
          <img style="max-width: 600px" :src="imgUrl" alt="">
        </el-upload>
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
  name: 'UnitEdit',
  data () {
    return {
      id: null,
      form: {
        departmentName: '',
        phone: '',
        email: '',
        address: '',
        area: '',
        departmentSynopsis: '',
        departmentType: '',
        principal: '',
        functions: '',
        picture: ''
      },
      file: '',
      imgUrl: '',
      rules: {
        departmentName: [
          {required: true, message: '名称不能为空', trigger: 'blur'}
        ],
        address: [
          {required: true, message: '地址不能为空', trigger: 'blur'}
        ],
        Email: [
          {pattern: this.$util.emailReg, message: '邮箱格式不正确', trigger: 'blur'}
        ],
        area: [
          {required: true, message: '区域不能为空', trigger: 'blur'}
        ],
        departmentType: [
          {required: true, message: '单位类型不能为空', trigger: 'blur'}
        ],
        principal: [
          {required: true, message: '负责人不能为空', trigger: 'blur'}
        ],
        functions: [
          {required: true, message: '职能不能为空', trigger: 'blur'}
        ]
      },
      areas: [],
      unitType: [
        '人民调解',
        '法律援助',
        '法律咨询'
      ]
    }
  },
  created () {
    this.id = this.$route.query.id
    this.form.area = this.$store.state.user.unitId
    if (this.id) {
      this.init()
    }
    this.areaInit()
  },
  methods: {
    init () {
      this.$http.post(this.$url.Unit_List, {institutionalCode: this.id}).then(res => {
        if (res.code === 200 && res.data.length > 0) {
          this.form = res.data[0]
          this.imgUrl = this.$url.Img_Path + res.data[0].picture
        }
      })
    },
    areaInit () {
      this.$http.get(this.$url.Area_All).then(res => {
        if (res.code === 200) {
          const area = []
          for (let i = 0; i < res.data.length; i++) {
            if (res.data[i].pid === 0) {
              area.push(res.data[i])
            }
            if (area.length > 0 && area[0].id === res.data[i].pid.toString()) {
              area.push(res.data[i])
            }
          }
          this.areas = area
        }
      })
    },
    beforeUpload (file) {
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        this.file = file
        this.imgUrl = e.target.result
      }
      fileReader.readAsDataURL(file)
      return false
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
      const formdata = new FormData()
      const form = {...this.form}
      if (this.file) {
        form.up_file = this.file
        delete form.picture
      }
      for (let key in form) {
        if (form[key]) {
          formdata.append(key, form[key])
        }
      }
      this.$http.axios.post(this.$url.Add_Unit, formdata).then(res => {
        if (res.data.code === 200) {
          this.$message.success('添加成功')
          this.$router.back()
        }
      })
    },
    edit () {
      const formdata = new FormData()
      const form = {...this.form}
      if (this.file) {
        form.up_file = this.file
        delete form.picture
      }
      delete form.sysRoomManagements
      for (let key in form) {
        if (form[key]) {
          formdata.append(key, form[key])
        }
      }
      this.$http.axios.post(this.$url.Update_Unit, formdata).then(res => {
        if (res.data.code === 200) {
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
</style>
