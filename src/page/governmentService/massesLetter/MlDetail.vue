<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :model="form">
      <el-form-item label="用户名">
        <div>{{form.userId}}</div>
      </el-form-item>
      <el-form-item label="联系方式">
        <div>{{form.phone}}</div>
      </el-form-item>
      <el-form-item label="县/市">
        <div>{{form.city}}</div>
      </el-form-item>
      <el-form-item label="留言时间">
        <div>{{form.createTime}}</div>
      </el-form-item>
      <el-form-item label="内容">
        <div>{{form.replyContent}}</div>
      </el-form-item>
      <el-form-item label="回复" v-if="form.msgContent">
        <div>{{form.msgContent}}</div>
      </el-form-item>
      <div v-else style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="dialogVisible = true">回复</el-button>
      </div>
    </el-form>
    <el-dialog
      :visible="dialogVisible"
      :show-close="false"
      width="500px"
    >
      <div>
        <el-input rows="10" type="textarea" v-model="reply" placeholder="请输入回复内容"></el-input>
        <div style="text-align: center;margin-top: 20px">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit">确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'MlDetail',
    data () {
      return {
        id: null,
        dialogVisible: false,
        form: {
        },
        reply: ''
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
        this.$http.get(this.$url.Message_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
          }
        })
      },
      submit () {
        if (!this.reply) {
          this.$message.success('回复不能为空')
        }
        this.$http.post(this.$url.Update_Message, {id: this.id, msgContent: this.reply}).then(res => {
          if (res.code === 200) {
            this.$message.success('回复成功')
            this.dialogVisible = false
            this.init()
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  /deep/ .el-dialog__header
    padding 0
</style>
