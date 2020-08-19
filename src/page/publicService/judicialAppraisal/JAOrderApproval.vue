<template>
  <div style="font-size: 14px;width: 800px">
    <el-row class="info">
      <el-col :span="8">订单编号：{{form.orderNumber}}</el-col>
      <el-col :span="8">提交时间：{{form.createTime}}</el-col>
      <el-col :span="8">状态：
        <span v-if="form.status === 0">未审核</span>
        <span v-if="form.status === 1">已通过</span>
        <span v-if="form.status === 2">已拒绝</span>
      </el-col>
      <el-col :span="8">委托人：{{form.entrustPerson}}</el-col>
      <el-col :span="8">联系电话：{{form.phone}}</el-col>
      <el-col v-if="form.status === 2" :span="8">拒绝时间：{{form.examineTime}}</el-col>
      <el-col v-if="form.status === 1" :span="8">通过时间：{{form.examineTime}}</el-col>
    </el-row>
    <div class="item">
      <div style="flex-shrink: 0">诉求内容：</div>
      <div style="max-width: 800px;word-break: break-all;text-align: justify">{{form.content}}</div>
    </div>
    <div class="item">
      <div>相关证明材料：</div>
      <div style="flex: 1">
        <ul class="filelist">
          <li v-for="item in form.appraisalFilesList"><a href="javascript:;" @click="download(item)" target="_blank"><i class="iconfont icon-wenjian"></i>{{item.fileUrl|urlName}}</a></li>
        </ul>
      </div>
      <div>
        <a style="color: #8cc5ff" :href="$url.Appraisal_Order_Download_file +'?id=' + id" target="_blank">下载全部</a>
      </div>
    </div>
    <div class="item">
      <div>委托人签名：</div>
      <div class="sign"><img :src="form.signImgUrl" alt=""></div>
    </div>
    <div v-if="form.status===0">
      <div v-if="status===2">
        <div class="item">
          <div style="line-height: 40px">拒绝理由：</div>
          <div><el-input style="width: 500px" rows="5" type="textarea" v-model="refuseReason"></el-input></div>
        </div>
        <div style="text-align: center;margin-top: 20px">
          <el-button type="primary" @click="refuse">保存</el-button>
        </div>
      </div>
      <div class="d-btns" v-if="status===0">
        <el-button type="danger" @click="status=2">拒绝</el-button>
        <el-button type="primary" @click="submit">通过</el-button>
      </div>
    </div>
    <div v-if="form.status===2">
      <div class="item">
        <div style="line-height: 40px">拒绝理由：</div>
        <div><el-input disabled style="width: 500px" rows="5" type="textarea" v-model="refuseReason"></el-input></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'JAOrderApproval',
    data () {
      return {
        id: null,
        refuseReason: '',
        status: 0,
        form: {
          content: '',
          createTime: '',
          entrustPerson: '',
          examineTime: '',
          lawyerServerName: '',
          orderNumber: '',
          phone: '',
          refusalCause: '',
          signImgUrl: '',
          status: '',
          userPhone: '',
          appraisalFilesList: [],
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
        this.$http.get(this.$url.Appraisal_Order_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
          }
        })
      },
      download (item) {
        open(item.fileUrl)
      },
      refuse () {
        if (!this.refuseReason) {
          this.$message.warning('请填写拒绝原因')
          return false
        }
        const params = {
          id: this.id,
          status: '2',
          refusalCause: this.refuseReason,
        }
        this.$http.post(this.$url.Update_Appraisal_Order, params).then(res => {
          if (res.code === 200) {
            this.$message.success('审批成功')
            this.init()
          }
        })
      },
      submit () {
        const params = {
          id: this.id,
          status: '1',
          lawyerId: this.lawyer,
        }
        this.$http.post(this.$url.Update_Appraisal_Order, params).then(res => {
          if (res.code === 200) {
            this.$message.success('审批成功')
            this.init()
          }
        })
      }
    },
    filters: {
      urlName (value) {
        const arr = value.split('/')
        return arr[arr.length-1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .info
    font-size 14px
    word-break break-all
    >.el-col
      margin-top  20px
  .item
    display flex
    margin-top 20px
  .filelist
    >li
      margin-bottom 10px
      >a
        color #007aff
        >i
          vertical-align middle
  .sign
    height 50px
    width 150px
    display flex
    justify-content center
    align-items center
    img
      max-width 100%
      max-height 100%
</style>
