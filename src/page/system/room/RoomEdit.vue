<template>
    <div class="mm">
      <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
        <el-form-item label="县/市" prop="a">
          <el-select style="width: 200px" v-model="form.a">
            <el-option v-for="area in areas" :label="area" :value="area" :key="area"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="视讯房间号" prop="b">
          <div v-for="(item, i) in form.b" :key="item" style="margin-bottom: 20px">
            <el-input style="width: 200px" v-model="form.b[i]"></el-input>
            <el-button type="text" class="text-danger" @click="roomDelete(i)">删除</el-button>
          </div>
          <el-button type="primary" @click="roomAdd">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  name: 'RoomEdit',
  data () {
    return {
      id: null,
      form: {
        a: '',
        b: []
      },
      rules: {
        a: [
          {required: true, message: '姓名不能为空', trigger: 'blur'}
        ]
      },
      areas: ['都匀市', '福泉市', '三都县']
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
    },
    validateIdNumber (rule, value, callback) {
      if (this.$util.idCheck(value)) {
        callback()
      } else {
        callback(new Error('身份证格式错误'))
      }
    },
    roomAdd () {
      this.form.b.push('')
    },
    roomDelete (i) {
      this.form.b.splice(i, 1)
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.edit()
        }
      })
    },
    edit () {
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 800px
</style>
