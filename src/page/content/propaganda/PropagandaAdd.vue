<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="标题" prop="title">
        <el-input placeholder="请输入标题" v-model="form.title"></el-input>
      </el-form-item>
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
          <el-image :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
        </div>
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
      <el-form-item label="展示顺序" prop="sort">
        <el-input-number placeholder="数字越大越靠前" :controls="false" v-model="form.sort"></el-input-number>
      </el-form-item>
      <el-form-item label="" prop="content">
        <textEditor ref="editor" :text.sync="form.content" @change="$refs['form'].validateField('content')"></textEditor>
      </el-form-item>
      <div class="d-btns">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import textEditor from '../../../components/textEditor'
  export default {
    name: 'PropagandaAdd',
    components: {
      textEditor
    },
    data () {
      return {
        loading: false,
        id: null,
        form: {
          title: '',
          status: 1,
          sort: '',
          content: ''
        },
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          title: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          sort: [
            {required: true, message: '展示顺序不能为空', trigger: 'blur'}
          ],
          content: [
            {validator: this.editorValidator, trigger: 'blur'}
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
        this.$http.get(this.$url.Propaganda_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.$refs.editor.editor.txt.html(res.data.content)
            this.date = [this.form.startTime, this.form.endTime]
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
      editorValidator (rule, value, callback) {
        let c = this.form.content
        c = c.replace(/<p.*?>/g, '').replace(/<\/p>/g, '').replace(/<br>/g, '')
        if (!c.trim()) {
          callback(new Error('展示内容不能为空'))
        } else {
          callback()
        }
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
          title: this.form.title,
          status: this.form.status,
          sort: this.form.sort,
          content: this.form.content
        }
        if (this.file) {
          this.key = 'judicial'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_Propaganda, params).then(res => {
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
          title: this.form.title,
          status: this.form.status,
          sort: this.form.sort,
          content: this.form.content
        }
        if (this.file) {
          this.key = 'judicial'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.imgKey = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_Propaganda, params).then(res => {
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
