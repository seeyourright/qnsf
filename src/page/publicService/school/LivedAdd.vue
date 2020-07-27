<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="标题" prop="vname">
        <el-input placeholder="请输入标题" v-model="form.vname"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="vlogo">
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
      <el-form-item label="视频" prop="vsite">
        <el-upload
          action="#"
          type="file"
          :before-upload="beforeUpload1"
          :show-file-list="false"
          accept="video/*"
        >
          <div style="text-align: left">
            <el-button>选择视频</el-button>
          </div>
        </el-upload>
        <div v-if="videoUrl" style="margin-top: 10px">
          <video controls style="max-width: 100%" :src="videoUrl"></video>
        </div>
      </el-form-item>
      <el-form-item label="状态" prop="vstatus">
        <el-switch
          v-model="form.vstatus"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="展示顺序" prop="vnumber">
        <el-input-number placeholder="数字越大越靠前" :controls="false" v-model="form.vnumber"></el-input-number>
      </el-form-item>
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
    <el-dialog
      :visible="proVisible"
      :title="proTitle"
      :show-close="false"
    >
      <el-progress :percentage="percent"></el-progress>
    </el-dialog>
  </div>
</template>

<script>
  import textEditor from '../../../components/textEditor'
  export default {
    name: 'LivedAdd',
    components: {
      textEditor
    },
    data () {
      return {
        proVisible: false,
        proTitle: '',
        percent: 0,
        loading: false,
        id: null,
        form: {
          vname: '',
          vsite: '',
          vlogo: '',
          vstatus: 1,
          vnumber: ''
        },
        file: null,
        key: '',
        imgUrl: '',
        videoFile: null,
        videoKey: '',
        videoUrl: '',
        rules: {
          vname: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          vlogo: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          vsite: [
            {validator: this.videoValidator, trigger: 'blur'}
          ],
          vnumber: [
            {required: true, message: '展示顺序不能为空', trigger: 'blur'}
          ],
        },
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
        this.$http.get(this.$url.School_Lived_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.imgUrl = this.form.vlogo
            this.videoUrl = this.form.vsite
          }
        })
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('vlogo')
          })
        }
        return Promise.reject(new Error())
      },
      beforeUpload1 (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.videoFile = file
            this.videoUrl = res
            this.$refs.form.validateField('vsite')
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
      videoValidator (rule, value, callback) {
        if (!this.videoUrl) {
          callback(new Error('视频不能为空'))
          return false
        }
        callback()
      },
      async uploadFile (file, key) {
        return await this.$ObsClient.putObject({
          Bucket: 'zhsf',
          Key: key,
          SourceFile: file,
          ProgressCallback: (transferredAmount, totalAmount, totalSeconds) => {
            // speed.innerHTML = transferredAmount * 1.0 / totalSeconds / 1024;
            console.log(transferredAmount * 100 / totalAmount)
            this.percent = transferredAmount * 100 / totalAmount
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
      async add () {
        this.loading = true
        const params = {
          vname: this.form.vname,
          vstatus: this.form.vstatus,
          vnumber: this.form.vnumber
        }
        if (this.file) {
          this.key = 'school'+new Date().getTime()
          this.proTitle = '图片上传中'
          this.proVisible = true
          await this.uploadFile(this.file, this.key)
          params.vlogo = this.$url.OBS_Path + this.key
        }
        if (this.videoFile) {
          this.Filekey = 'school'+new Date().getTime()
          this.proTitle = '视频上传中'
          this.proVisible = true
          await this.uploadFile(this.videoFile, this.Filekey)
          params.vsite = this.$url.OBS_Path + this.Filekey
        }
        this.$http.post(this.$url.Add_School_Lived, params).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
          this.proVisible = false
        })
      },
      async edit () {
        this.loading = true
        const params = {
          id: this.form.id,
          vname: this.form.vname,
          vstatus: this.form.vstatus,
          vnumber: this.form.vnumber
        }
        if (this.file) {
          this.key = 'school'+new Date().getTime()
          this.proTitle = '图片上传中'
          this.proVisible = true
          await this.uploadFile(this.file, this.key)
          params.vlogo = this.$url.OBS_Path + this.key
        }
        if (this.videoFile) {
          this.Filekey = 'school'+new Date().getTime()
          this.proTitle = '视频上传中'
          this.proVisible = true
          await this.uploadFile(this.videoFile, this.Filekey)
          params.vsite = this.$url.OBS_Path + this.Filekey
        }
        this.$http.post(this.$url.Update_School_Lived, params).then(res => {
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
        this.form.city = value && value.split('-')[0]
        this.form.cityNumber = value && value.split('-')[1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 900px
</style>
