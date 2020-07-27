<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="标题" prop="zname">
        <el-input placeholder="请输入标题" v-model="form.zname"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="fangjianhao">
        <el-input placeholder="请输入房间号" v-model="form.fangjianhao"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="zsite">
        <el-input placeholder="请输入链接地址" v-model="form.zsite"></el-input>
      </el-form-item>
      <el-form-item label="图片" prop="zlogo">
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
      <el-form-item label="状态" prop="status">
        <el-switch
          v-model="form.zstatus"
          :active-value="1"
          :inactive-value="0"
          active-text="启用"
          inactive-text="停用"
        >
        </el-switch>
      </el-form-item>
      <el-form-item label="展示顺序" prop="znumber">
        <el-input-number placeholder="数字越大越靠前" :controls="false" v-model="form.znumber"></el-input-number>
      </el-form-item>
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button>取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import textEditor from '../../../components/textEditor'
  export default {
    name: 'LiveAdd',
    components: {
      textEditor
    },
    data () {
      return {
        loading: false,
        id: null,
        form: {
          zname: '',
          fangjianhao: '',
          zsite: '',
          zlogo: '',
          zstatus: 1,
          znumber: ''
        },
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          zname: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          fangjianhao: [
            {required: true, message: '房间号不能为空', trigger: 'blur'}
          ],
          zlogo: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          znumber: [
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
        this.$http.get(this.$url.School_Live_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.imgUrl = this.form.zlogo
          }
        })
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('zlogo')
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
          zname: this.form.zname,
          fangjianhao: this.form.fangjianhao,
          zsite: this.form.zsite,
          znumber: this.form.znumber,
          zstatus: this.form.zstatus
        }
        if (this.file) {
          this.key = 'school'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.zlogo = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_School_Live, params).then(res => {
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
          zname: this.form.zname,
          fangjianhao: this.form.fangjianhao,
          zsite: this.form.zsite,
          znumber: this.form.znumber,
          zstatus: this.form.zstatus
        }
        if (this.file) {
          this.key = 'judicial'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.zlogo = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_School_Live, params).then(res => {
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
