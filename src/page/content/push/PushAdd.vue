<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="内容推送">
        <el-input v-model="form.a"></el-input>
      </el-form-item>
      <el-form-item label="内容链接">
        <el-input v-model="form.b"></el-input>
      </el-form-item>
      <el-form-item label="推送用户">
        <el-radio-group v-model="form.c">
          <el-radio label="1">全部用户</el-radio>
          <el-radio label="2">部分用户</el-radio>
        </el-radio-group>
        <div>
          <span>用户</span>
          <el-select></el-select>
        </div>
        <div>
          <span>调解员</span>
          <el-select></el-select>
        </div>
      </el-form-item>
      <el-form-item label="推送时间">
        <el-radio-group v-model="form.e">
          <el-radio label="1">立即推送</el-radio>
          <el-radio label="2">定时推送</el-radio>
        </el-radio-group>
        <el-date-picker
          v-if="form.e==='2'"
          v-model="form.f"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'PushAdd',
  data () {
    return {
      id: null,
      form: {
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: ''
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
  },
  methods () {

  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 900px
</style>
