<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-form-item placeholder="请输入标题" label="标题" prop="a">
          <el-input v-model="form.a"></el-input>
        </el-form-item>
        <el-form-item label="图片" prop="b">
          <el-upload
            action="#"
          >
            <el-image v-if="form.b"></el-image>
            <span v-else>上传图片</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="状态" prop="c">
          <el-switch
            v-model="form.c"
            active-text="启用"
            inactive-text="停用"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="展示顺序" prop="d">
          <el-image src="http://img.yangrq.com/qnsfbgimg2"></el-image>
          <el-input-number placeholder="数字越大越靠前" :controls="false" v-model="form.d"></el-input-number>
        </el-form-item>
        <el-form-item label="" prop="e">
          <textEditor :text.sync="form.e"></textEditor>
        </el-form-item>
        <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
          <el-button>取消</el-button>
          <el-button type="primary" @click="submit">保存</el-button>
        </div>
      </el-form>
    </div>
</template>

<script>
import textEditor from '../../../components/textEditor'
export default {
  name: 'BannerAdd',
  components: {
    textEditor
  },
  data () {
    return {
      id: null,
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: ''
      },
      rules: {
        a: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        b: [
          {required: true, message: '图片不能为空', trigger: 'blur'}
        ],
        d: [
          {required: true, message: '展示顺序不能为空', trigger: 'blur'}
        ]
      }
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
    width 900px
</style>
