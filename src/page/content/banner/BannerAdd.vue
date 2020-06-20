<template>
    <div class="mm">
      <el-form>

      </el-form>
    </div>
</template>

<script>
export default {
  name: 'BannerAdd',
  data () {
    return {
      id: null,
      form: {
        a: '',
        b: '',
        c: ''
      },
      rules: {
        a: [
          {required: true, message: '不能为空', trigger: 'blur'}
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

</style>
