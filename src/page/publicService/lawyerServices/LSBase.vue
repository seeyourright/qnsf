<template>
    <div style="margin-top: 20px">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-row>
          <div>
            <el-form-item label="图片" prop="imgUrl">
              <el-upload
                action="#"
                type="file"
                :before-upload="beforeUpload"
                :show-file-list="false"
                accept="image/*"
              >
                <div style="text-align: left">
                  <el-button>选择图片</el-button>
                </div>
              </el-upload>
              <div v-if="imgUrl" style="margin-top: 10px">
                <el-image class="img" :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
              </div>
            </el-form-item>
          </div>
          <el-col :span="12">
            <el-form-item label="律所名称" prop="lawFirmName">
              <el-input v-model="form.lawFirmName"></el-input>
            </el-form-item>
            <el-form-item label="账号" prop="uname">
              <el-input disabled v-model="form.uname"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" placeholder="不填写则不会修改密码"></el-input>
            </el-form-item>
            <el-form-item label="县/市" prop="cityNumber">
              <el-select :disabled="!allper" v-model="area">
                <el-option v-for="area in areas" :key="area.id" :label="area.name" :value="area.name+'-'+area.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="职业许可证" prop="licenceNumber">
              <el-input v-model="form.licenceNumber"></el-input>
            </el-form-item>
            <el-form-item label="组织形式" prop="organizationalForm">
              <el-input v-model="form.organizationalForm"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop="chargePerson">
              <el-input v-model="form.chargePerson"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="状态" prop="status">
              <el-radio-group  v-model="form.status">
                <el-radio :label="1">启用</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="开启视频功能" prop="roomStatus">
              <el-radio-group  v-model="form.roomStatus">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="form.roomStatus === 1" label="房间号" prop="roomNumber">
              <el-input v-model="form.roomNumber"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="律所地址" prop="address">
          <el-input type="textarea" v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="律所简介" prop="introduction">
          <el-input type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>
        <div class="d-btns">
          <el-button @click="$router.back()">取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
  export default {
    name: 'Base',
    data () {
      return {
        id: null,
        form: {
          chargePerson: '',
          lawFirmName: '',
          phone: '',
          uname: '',
          passw: '',
          email: '',
          city: '',
          cityNumber: '',
          roomStatus: 1,
          roomNumber: '',
          licenceNumber: '',
          organizationalForm: '',
          address: '',
          introduction: '',
          status: '',
          remark: '',
        },
        password: '',
        file: null,
        key: '',
        imgUrl: '',
        area: '',
        rules: {
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          lawFirmName: [
            {required: true, message: '律所名称不能为空', trigger: 'blur'}
          ],
          // chargePerson: [
          //   {required: true, message: '联系人不能为空', trigger: 'blur'}
          // ],
          // phone: [
          //   {required: true, message: '联系人不能为空', trigger: 'blur'},
          // ],
          // uname: [
          //   {required: true, message: '账号不能为空', trigger: 'blur'}
          // ],
          // passw: [
          //   {required: true, message: '密码不能为空', trigger: 'blur'}
          // ],
          email: [
            {pattern: this.$util.emailReg, message: '邮箱格式错误', trigger: 'blur'}
          ],
          cityNumber: [
            {required: true, message: '县/市不能为空', trigger: 'change'}
          ],
          roomNumber: [
            {required: true, message: '房间号不能为空', trigger: 'blur'}
          ]
        },
        areas: [],
        allper: true,
      }
    },
    created () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000' || this.$store.state.user.userType === '4') {
        this.allper = false
      }
      if (this.$parent.id) {
        this.init()
      }
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Law_Firm_By_Id, {id: this.$parent.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.area = this.form.city + '-' + this.form.cityNumber
            this.imgUrl = this.form.imgUrl
          }
        })
      },
      areaInit () {
        this.$http.get(this.$url.Area_Tree).then(res => {
          if (res.code === 200) {
            const area = []
            for (let i = 0; i < res.data.length; i++) {
              area.push({
                id: res.data[i].id,
                name: res.data[i].institutionalName
              })
              for (let j = 0; j < res.data[i].children.length; j++) {
                area.push({
                  id: res.data[i].children[j].id,
                  name: res.data[i].children[j].institutionalName
                })
              }
            }
            this.areas = area
          }
        })
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('imgUrl')
          })
        }
        return Promise.reject(new Error())
      },
      imgValidator (rule, value, callback) {
        if (!this.imgUrl) {
          callback(new Error('图片不能为空'))
          return false
        }
        callback()
      },
      async uploadFile (file, key) {
        return await this.$ObsClient.putObject({
          Bucket: 'zhsf',
          Key: key,
          SourceFile: file,
        })
      },
      submit () {
        this.$refs.form.validate((valid,obj) => {
          if (valid) {
            this.edit()
          }
        })
      },
      async edit () {
        this.loading = true
        const params = {...this.form}
        delete params.createTime
        if (this.file) {
          this.key = 'laywer'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        if (this.password) {
          params.passw = this.password
        } else {
          params.passw = null
        }
        this.$http.post(this.$url.Update_Law_Firm, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.password = ''
            this.init()
          }
        }).finally(res => {
          this.loading = false
        })
      }
    },
    watch: {
      area (value) {
        this.form.city = value && value.split('-')[0]
        this.form.cityNumber = value && value.split('-')[1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 800px
    .el-select
      width 100%
  .img /deep/ img
    max-height 300px
    width auto
</style>
