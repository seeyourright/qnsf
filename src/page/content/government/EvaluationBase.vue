<template>
  <div style="margin-top: 20px">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="标题" prop="titles">
        <el-input readonly placeholder="请输入标题" v-model="form.titles"></el-input>
      </el-form-item>
      <el-form-item label="县/市" prop="city">
        <el-select disabled v-model="area">
          <el-option v-for="area in areas" :label="area.name" :value="area.name+'-'+area.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="展示时间" prop="startTime">
        <el-date-picker
          readonly
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
          </div>
          <div>
            <el-input type="textarea" readonly placeholder="请输入题目" v-model="problem.problemTitle" style="width: 500px"></el-input>
          </div>
          <div v-for="(option, j) in problem.optionsList" style="margin-top: 20px">
            <el-input readonly placeholder="请输入答案" v-model="option.optionsValue" style="width: 200px"></el-input>
          </div>
        </div>
      </el-form-item>
      <div class="d-btns">
        <el-button @click="$router.back()">取消</el-button>
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
        loading: false,
        form: {
          titles: '',
          startTime: '',
          endTime: '',
          cityName: null,
          city: null,
          status: 1,
        },
        rules:{
        },
        area:null,
        areas: [],
        date: null,
        problemList: [],
        allper: true
      }
    },
    created () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.allper = false
      }
      this.init()
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Questionnaire_By_Id, {id: this.$parent.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.date = [this.form.startTime, this.form.endTime]
            this.problemList = this.form.problemList
            this.area = this.form.cityName + '-' + this.form.city
          }
        })
      },
      areaInit () {
        this.$http.get(this.$url.Area_Tree).then(res => {
          if (res.code === 200) {
            const area = []
            for (let i = 0; i < res.data.length; i++) {
              area.push({
                id: res.data[i].id,
                name: res.data[i].institutionalName
              })
              for (let j = 0; j < res.data[i].children.length; j++) {
                area.push({
                  id: res.data[i].children[j].id,
                  name: res.data[i].children[j].institutionalName
                })
              }
            }
            this.areas = area
          }
        })
      },
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.edit()
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
      }
    },
    watch: {
      area (value) {
        this.form.cityName = value && value.split('-')[0]
        this.form.city = value && value.split('-')[1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 800px
</style>
