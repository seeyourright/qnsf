<template>
  <div style="margin-top: 20px">
    <div class="condition">
      <div></div>
      <el-form size="small" inline>
        <el-form-item v-if="allper">
          <el-select @change="getData(1)" v-model="condition.city">
            <el-option label="全部地区" :value="null"></el-option>
            <el-option v-for="area in areas" :label="area.name" :value="area.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="downloadAllHandler">下载问卷</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="table"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
      border
    >
      <el-table-column
        align="center"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="answerId"
        label="序号"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="姓名"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="cityName"
        label="县/市"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPhone"
        label="联系电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
          <el-button type="text" size="small" @click="downloadHandler(scope.row)">下载</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="y-page"
      @current-change="getData"
      :current-page.sync="page"
      :page-size="size"
      layout="total, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
    >
      <div slot="title" style="font-size: 14px">
        <span style="margin-right: 40px">姓名:{{name}}</span>
        <span style="margin-right: 40px">联系电话:{{phone}}</span>
        <span style="margin-right: 40px">提交时间:{{time}}</span>
      </div>
      <div>
        <div style="margin-top: 20px" v-for="(problem, i) in questionnaire.problemList">
          <div>{{i+1+'、'+problem.problemTitle}}</div>
          <div v-if="problem.problemType==='3'">
            <div style="margin-top: 20px">
              {{'答：'+ problem.answer}}
            </div>
          </div>
          <div v-else>
            <div v-for="(option, j) in problem.optionsList">
              <div v-if="option.checked" style="margin-top: 20px;color: red">{{String.fromCharCode(65+j)+'、'+option.optionsValue}}</div>
              <div v-else style="margin-top: 20px">{{String.fromCharCode(65+j)+'、'+option.optionsValue}}</div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Questionnaire',
    data () {
      return {
        dialogVisible: false,
        page: 1,
        size: 10,
        total: 100,
        condition: {
          city: null
        },
        tableData: [],
        name: '',
        phone: '',
        time: '',
        questionnaire: {

        },
        areas: [],
        allper: true
      }
    },
    async mounted () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.condition.city = this.$store.state.user.unitId
        this.allper = false
      }
      await this.areaInit()
      this.getData(1)
      this.questionnaireInit()
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Questionnaire_Answer_List, {page, limit: this.size, id: this.$parent.id, ...this.condition}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            for (let i = 0; i < this.tableData.length; i++) {
              for (let j = 0; j < this.areas.length; j++) {
                if (this.tableData[i].city === this.areas[j].id) {
                  this.tableData[i].cityName = this.areas[j].name
                  break
                }
              }
            }
            this.page = page
            this.total = res.totals
          } else if (res.code === 203) {
            this.tableData = []
            this.page = 1
            this.total = 0
          }
        }).finally(res => {
          this.$util.tableLoaded()
        })
      },
      questionnaireInit () {
        this.$http.get(this.$url.Questionnaire_By_Id, {id: this.$parent.id}).then(res => {
          if (res.code === 200) {
            this.questionnaire = res.data
          }
        })
      },
      async areaInit () {
        const res = await this.$http.get(this.$url.Area_Tree)
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
      },
      detailHandler (row) {
        if (!this.questionnaire.problemList) {
          this.$message.warning('问卷加载中，请稍等。。。')
          return false
        }
        this.name = row.userName
        this.phone = row.userPhone
        this.time = row.createTime
        this.getAnswer(row.answerId)
        this.dialogVisible = true
      },
      getAnswer (id) {
        this.$http.get(this.$url.Questionnaire_Answer_By_Id, {id: id}).then(res => {
          if (res.code === 200) {
            const answer = res.data
            this.matchAnswer(this.questionnaire.problemList, answer)
          }
        })
      },
      matchAnswer (problemList, answer) {
        for (let i = 0; i < problemList.length; i++) {
          if (problemList[i].problemType === '3') {
            for (let j = 0; j < answer.length; j++) {
              if (answer[j].problemId === problemList[i].problemId) {
                problemList[i].answer = answer[j].answerContent
                break
              }
            }
          } else {
            const options = problemList[i].optionsList
            for (let j = 0; j < options.length; j++) {
              options[j].checked = false
              for (let k = 0; k < answer.length; k++) {
                if (answer[k].problemId === problemList[i].problemId && options[j].optionsValue === answer[k].answerContent) {
                  options[j].checked = true
                  break
                }
              }
            }
          }
        }
        this.questionnaire.problemList = JSON.parse(JSON.stringify(problemList))
      },
      downloadHandler (row) {
        open(this.$url.Questionnaire_Answer_Download+'?opid='+this.$parent.id+'&answerId='+row.answerId, '_blank')
      },
      downloadAllHandler() {
        const selection = this.$refs.table.selection
        if (selection.length === 0) {
          this.$message.warning('至少选择一条数据')
          return false
        }
        const ids = []
        for (let i = 0; i < selection.length; i++) {
          ids.push(selection[i].answerId)
        }
        open(this.$url.Questionnaire_Answer_Download+'?opid='+this.$parent.id+'&answerId='+ids, '_blank')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .condition
    display flex
    align-items center
    justify-content space-between
</style>
