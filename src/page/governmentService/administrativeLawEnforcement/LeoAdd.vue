<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="姓名" prop="ryname">
        <el-input style="width: 300px;" placeholder="请输入标题" v-model="form.ryname"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="证件号" prop="rynumber">
        <el-input style="width: 300px;" placeholder="请输入标题" v-model="form.rynumber"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="rylogo">
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
          <el-image :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
        </div>
      </el-form-item>
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'LeoAdd',
    data () {
      return {
        loading: false,
        id: null,
        form: {
          ryname: '',
          rynumber: '',
          status: 1,
          sex: 1
        },
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          ryname: [
            {required: true, message: '姓名不能为空', trigger: 'blur'}
          ],
          rynumber: [
            {required: true, message: '证件号不能为空', trigger: 'blur'}
          ],
          rylogo: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
        },
      }
    },
    created () {
      this.id = this.$route.query.id
      this.did = this.$route.query.did
      if (this.id) {
        this.init()
      }
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Law_Enforcement_Officer_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.imgUrl = this.form.rylogo
          }
        })
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('rylogo')
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
            if (this.id) {
              this.edit()
            } else {
              this.add()
            }
          }
        })
      },
      async add () {
        this.loading = true
        const params = {
          did: this.did,
          ryname: this.form.ryname,
          rynumber: this.form.rynumber,
          status: this.form.status,
          sex: this.form.sex
        }
        if (this.file) {
          this.key = 'school'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.rylogo = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_Law_Enforcement_Officer, params).then(res => {
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
        const params = {
          id: this.form.id,
          ryname: this.form.ryname,
          rynumber: this.form.rynumber,
          status: this.form.status,
          sex: this.form.sex
        }
        if (this.file) {
          this.key = 'school'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.rylogo = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_Law_Enforcement_Officer, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
        })
      }
    },
    watch: {
      area (value) {
        this.form.region = value && value.split('-')[0]
        this.form.did = value && value.split('-')[1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 900px
</style>
