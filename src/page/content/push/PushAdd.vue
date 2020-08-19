<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="推送标题" prop="msgTitle">
        <el-input :readonly="disabled" v-model="form.msgTitle"></el-input>
      </el-form-item>
      <el-form-item v-if="!disabled" label="推送用户" prop="userNumber">
        <el-radio-group v-model="userNumber">
          <el-radio :label="1">全部用户</el-radio>
          <el-radio :label="2">部分用户</el-radio>
        </el-radio-group>
      </el-form-item>
      <div  v-if="userNumber===2">
        <el-form-item v-for="userTypeVO in userTypeVOS" :label="userTypeVO.userType==='0'?'普通用户':userTypeVO.userType=='1'?'调解员':'社矫人员'">
          <el-checkbox-group size="small" v-model="userTypeVO.cityNumber">
            <el-checkbox-button v-for="area in areas" :label="area.id" :key="area.id">{{area.name}}</el-checkbox-button>
          </el-checkbox-group>
        </el-form-item>
      </div>
      <el-form-item label="推送时间" prop="createTime">
        <div v-if="disabled">{{form.createTime}}</div>
        <div v-else>
          <el-radio-group v-model="pushTimeChoice">
            <el-radio :label="1">立即推送</el-radio>
            <el-radio :label="2">定时推送</el-radio>
          </el-radio-group>
          <el-date-picker
            v-if="pushTimeChoice===2"
            v-model="form.createTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
          ></el-date-picker>
        </div>
      </el-form-item>
      <el-form-item label="推送内容" prop="msgContent">
<!--        <textEditor ref="editor" :text.sync="form.content" @change="$refs['form'].validateField('content')"></textEditor>-->
        <el-input :readonly="disabled" type="textarea" :row="5" v-model="form.msgContent"></el-input>
      </el-form-item>
      <div class="d-btns" v-if="!disabled">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import textEditor from '../../../components/textEditor'
  export default {
  name: 'PushAdd',
  components: {
    textEditor
  },
  data () {
    return {
      loading: false,
      id: null,
      userNumber: 1,
      pushTimeChoice: 1,
      userTypeVOS: [
        {
          userType: '0',
          cityNumber: []
        },
        {
          userType: '1',
          cityNumber: []
        },
        {
          userType: '7',
          cityNumber: []
        },
      ],
      form: {
        msgTitle: '',
        msgContent: '',
        createTime: this.$util.dateFormat(new Date())
      },
      rules: {
        msgTitle: [
          {required: true, message: '标题不能为空', trigger: 'blur'}
        ],
        msgContent: [
          {required: true, message: '推送内容不能为空', trigger: 'blur'}
        ],
        createTime: [
          {required: true, message: '推送时间不能为空', trigger: 'blur'}
        ],
        userNumber: [
          {validator: this.userNumberValidator, trigger: 'blur'}
        ]
      },
      areas: [],
      disabled: false
    }
  },
  created () {
    this.id = this.$route.query.id
    if (this.id) {
      this.init()
      this.disabled = true
    }
    this.areaInit()
  },
  methods: {
    init () {
      this.$http.get(this.$url.Message_By_Id, {id: this.id}).then(res => {
        if (res.code === 200) {
          this.form = res.data
          this.userNumber = 2
        }
      })
    },
    areaInit () {
      this.$http.get(this.$url.Area_Tree).then(res => {
        if (res.code === 200) {
          const area = []
          for (let i = 0; i < res.data.length; i++) {
            for (let j = 0; j < res.data[i].children.length; j++) {
              area.push({
                id: res.data[i].children[j].id,
                name: res.data[i].children[j].institutionalName
              })
            }
          }
          this.areas = area
          if (!this.disabled) {
            const citys = []
            for (let i = 0; i < this.areas.length; i++) {
              citys.push(this.areas[i].id)
            }
            for (let i = 0; i < this.userTypeVOS.length; i++) {
              this.userTypeVOS[i].cityNumber = citys
            }
          }
        }
      })
    },
    userNumberValidator (rules, value, callback) {
      const userTypeVOS = this.userTypeVOS
      let c = 0
      for (let i = 0; i < userTypeVOS.length; i++) {
        if(userTypeVOS[i].cityNumber.length === 0) {
          c++
        }
      }
      if (c === userTypeVOS.length) {
        callback(new Error('至少选择一种类型的用户'))
      } else {
        callback()
      }
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.add()
        }
      })
    },
    add () {
      const params = {...this.form}
      params.replyContent = JSON.stringify(this.userTypeVOS)
      params.userTypeVOS = JSON.parse(JSON.stringify(this.userTypeVOS))
      const userId = []
      for (let i = 0; i < params.userTypeVOS.length; i++) {
        if(params.userTypeVOS[i].cityNumber.length === 0) {
          params.userTypeVOS.splice(i--, 1)
        }else {
          const userType = params.userTypeVOS[i].userType
          userId.push(userType === '0'
            ? '普通用户' : userType === '1'
              ? '调解员' : userType === '7'
                ? '社矫人员' : '')
        }
      }
      params.userId = userId.join(',')
      this.loading = true
      this.$http.axios.post(this.$url.Add_Push_Message, params,{
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        if (res.data.code === 200) {
          this.$message.success('新增成功')
          this.$router.back()
        }
      }).finally(res => {
        this.loading = false
      })
    }
  },
  watch: {
    pushTimeChoice (val) {
      if (val === 1) {
        this.form.createTime = this.$util.dateFormat(new Date())
      } else {
        this.form.createTime = null
      }
      this.$refs.form.validateField('createTime')
    },
    userNumber (val) {
      if (val === 1) {
        const citys = []
        for (let i = 0; i < this.areas.length; i++) {
          citys.push(this.areas[i].id)
        }
        for (let i = 0; i < this.userTypeVOS.length; i++) {
          this.userTypeVOS[i].cityNumber = citys
        }
      } else {
        if (this.disabled) {
          this.userTypeVOS = JSON.parse(this.form.replyContent)
          return false
        }
        this.userTypeVOS = [
          {
            userType: '0',
            cityNumber: []
          },
          {
            userType: '1',
            cityNumber: []
          },
          {
            userType: '7',
            cityNumber: []
          },
        ]
      }
    },
    userTypeVOS: {
      deep: true,
      handler (val) {
        this.$refs.form.validateField('userNumber')
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .form
    width 900px
</style>
