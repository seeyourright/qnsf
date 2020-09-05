<template>
  <div style="margin-top: 20px">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="标题" prop="titles">
        <el-input :readonly="!editable" placeholder="请输入标题" v-model="form.titles"></el-input>
      </el-form-item>
      <el-form-item label="展示时间" prop="startTime">
        <el-date-picker
          :readonly="!editable"
          v-model="date"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
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

      <el-form-item label="问卷" prop="problemList">
        <div v-for="(problem, i) in problemList" style="margin-bottom: 20px">
          <div>
            <span>第{{i+1}}题</span>
            <span style="color: deepskyblue" v-if="problem.problemType === '1'">单选题</span>
            <span style="color: deepskyblue" v-if="problem.problemType === '2'">多选题</span>
            <span style="color: deepskyblue" v-if="problem.problemType === '3'">简答题</span>
            <span style="color: deepskyblue" v-if="problem.problemType === '4'">下拉单选题</span>
            <el-button v-if="editable" @click="deleteProblem(i)" type="text" style="color: red">删除</el-button>
          </div>
          <div>
            <el-input type="textarea" :readonly="!editable" placeholder="请输入题目" v-model="problem.problemTitle" style="width: 500px"></el-input>
          </div>
          <div v-for="(option, j) in problem.optionsList" style="margin-top: 20px">
            <el-input :readonly="!editable" placeholder="请输入答案" v-model="option.optionsValue" style="width: 200px"></el-input>
            <span v-if="editable">
              <el-button type="text" @click="addOption(problem, j)">增加</el-button>
              <el-button v-if="j>0" type="text" @click="deleteOption(problem, j)" style="color: red">删除</el-button>
            </span>
          </div>
        </div>
      </el-form-item>
      <el-form-item v-if="editable" label="新增题目">
        <el-button @click="addProblem('1')">单选题</el-button>
        <el-button @click="addProblem('4')">下拉单选题</el-button>
        <el-button @click="addProblem('2')">多选题</el-button>
        <el-button @click="addProblem('3')">简答题</el-button>
      </el-form-item>
      <div class="d-btns" v-if="editable">
        <el-button @click="init(),editable=false">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">重新发布</el-button>
      </div>
      <div class="d-btns" v-else>
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="editable=true" :loading="loading">修改问卷内容</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'QuestionnaireBase',
    data () {
      return {
        editable: false,
        loading: false,
        form: {
          titles: '',
          startTime: '',
          endTime: '',
          status: 1,
        },
        rules:{
          titles: [
            {required: true, message: '标题不能为空', trigger: 'blur'}
          ],
          startTime: [
            {required: true, message: '展示时间不能为空', trigger: 'blur'}
          ],
          problemList: [
            {validator: this.problemsValidator, trigger: 'blur'}
          ]
        },
        date: null,
        problemList: []
      }
    },
    created () {
      this.init()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Questionnaire_By_Id, {id: this.$parent.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.date = [this.form.startTime, this.form.endTime]
            this.problemList = this.form.problemList
          }
        })
      },
      problemsValidator (rules, value, callback) {
        const problemList = this.problemList
        if (problemList.length === 0) {
          callback(new Error('至少需要添加一道题目'))
        }
        for (let i = 0; i < problemList.length; i++) {
          if (!problemList[i].problemTitle.trim()) {
            callback(new Error('问题不能为空'))
          }
          let options = problemList[i].optionsList
          for (let j = 0; j < options.length; j++) {
            if (!options[j].optionsValue.trim()) {
              callback(new Error('答案不能为空'))
            }
          }
        }
        callback()
      },
      addProblem (i) {
        const problem = {
          problemType: i,
          problemTitle: '',
          optionsList: []
        }
        if (i !== '3') {
          problem.optionsList.push({optionsValue: ''})
        }
        this.problemList.push(problem)
        console.log(this.problemList)
      },
      deleteProblem (i) {
        this.problemList.splice(i, 1)
      },
      addOption (problem, j) {
        problem.optionsList.splice(j+1, 0,  {optionsValue: ''})
      },
      deleteOption (problem, j) {
        problem.optionsList.splice(j, 1)
      },
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.editable) {
              this.add()
            }else {
              this.edit()
            }
          }
        })

      },
      edit () {
        this.loading = true
        this.$http.post(this.$url.Update_Questionnaire, {questionnaireId: this.$parent.id, status: this.form.status}).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
          }
        }).finally(res => {
          this.loading = false
        })
      },
      add () {
        const params = {...this.form}
        params.problemList = this.problemList
        params.questionnaireType = '普法问卷'
        this.loading = true
        this.$http.axios.post(this.$url.Add_Questionnaire, params,{
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => {
          if (res.data.code === 200) {
            this.$message.success('发布成功')
            this.$http.post(this.$url.Update_Questionnaire, {questionnaireId: this.$parent.id, status: 0}).then(res => {})
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
        })
      }
    },
    watch: {
      date (value) {
        this.form.startTime = value && value[0]
        this.form.endTime = value && value[1]
      },
      problemList: {
        deep: true,
        handler () {
          this.$refs.form.validateField('problemList')
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 800px
</style>
