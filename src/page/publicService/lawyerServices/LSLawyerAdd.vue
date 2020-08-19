<template>
  <div style="margin-top: 20px">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-row>
        <div>
          <el-form-item label="头像" prop="imgUrl">
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
          <el-form-item label="姓名" prop="lawName">
            <el-input v-model="form.lawName"></el-input>
          </el-form-item>
          <el-form-item label="案件类型" prop="caseType">
            <el-input v-model="form.caseType"></el-input>
          </el-form-item>
          <el-form-item label="执业证号" prop="practiceNumber">
            <el-input v-model="form.practiceNumber"></el-input>
          </el-form-item>
          <el-form-item label="展示顺序" prop="sort">
            <el-input-number :controls="false" placeholder="数字越大越靠前" v-model="form.sort"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
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
        </el-col>
      </el-row>
      <div class="d-btns">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'LSLawyerAdd',
    data () {
      return {
        id: null,
        form: {
          chargePerson: '',
          lawName: '',
          phone: '',
          email: '',
          imgUrl: '',
          imgKey: '',
          caseType: '',
          practiceNumber: '',
          sort: 0,
          status: 1,
          lawyerServerId: '',
        },
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          lawName: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          chargePerson: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系人不能为空', trigger: 'blur'},
            {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
          ],
          caseType: [
            {required: true, message: '案件类型不能为空', trigger: 'blur'}
          ],
          practiceNumber: [
            {required: true, message: '执业证号不能为空', trigger: 'blur'}
          ],
          email: [
            {pattern: this.$util.emailReg, message: '邮箱格式错误', trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '展示顺序不能为空', trigger: 'change'}
          ]
        },
      }
    },
    created () {
      this.id = this.$route.query.zid
      if (this.id) {
        this.init()
      }
    },
    methods: {
      init () {
        this.$http.get(this.$url.Lawyer_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.imgUrl = this.form.imgUrl
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
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id) {
              this.edit()
            } else {
              this.add()
            }
          }
        })
      },
      async add () {
        this.loading = true
        const params = {...this.form}
        params.lawyerServerId = this.$parent.id
        if (this.file) {
          this.key = 'laywer' + new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_Lawyer, params).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
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
        this.$http.post(this.$url.Update_Lawyer, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
        })
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
