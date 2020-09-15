<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—组织架构—{{$route.query.org}}</div>
      <el-form size="small" inline>
        <el-form-item>
          <el-input placeholder="输入姓名、手机号、终端号" v-model="condition.nickName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addHandler">新增</el-button>
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
      :tree-props="{children: 'children'}"
    >
      <el-table-column
        align="center"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="nickname"
        label="姓名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="手机号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="terminalNumber"
        label="终端号"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="chargePerson"
        label="所属组织"
      >
        <template v-slot="scope">
          <span>{{$route.query.org}}</span>
        </template>
      </el-table-column>
      <el-table-column
        width="300px"
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="moveHandler(scope.row)">移动</el-button>
          <el-button type="text" size="small" class="text-danger" @click="removeHandler(scope.row)">删除</el-button>
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
      :show-close="false"
      :visible="dialogVisible"
    >
      <div style="padding: 0 20px">
        <el-form label-width="100px">
          <el-form-item label="名称">
            <el-input readonly v-model="form.name" style="width: 200px"></el-input>
          </el-form-item>
          <el-form-item label="所属组织">
            <el-cascader
              :options="organization"
              :props="{label: 'organizationName', value: 'id', checkStrictly: true}"
              v-model="moveToOrganization"
              style="width: 100%">
<!--              <el-option v-for="area in areas" :label="area.name" :value="area.id"></el-option>-->
            </el-cascader>
          </el-form-item>
          <div style="text-align: right">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="moveSubmit">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :visible="addVisible"
      title="添加人员"
      width="800px"
      top="50px"
    >
      <div>
        <el-divider></el-divider>
        <div style="display: flex;align-items: center;justify-content: flex-end;padding: 10px 20px">
          <el-select style="margin-right: 10px" v-model="personCondition.userType">
            <el-option value="0" label="普通用户"></el-option>
            <el-option value="1" label="调解员"></el-option>
            <el-option value="7" label="社矫人员"></el-option>
          </el-select>
          <el-input v-model="personCondition.nickname" style="width: 250px;margin-right: 10px" placeholder="请输入姓名、手机号、终端号"></el-input>
          <el-button @click="getPersonlist(1)">查询</el-button>
        </div>
        <el-divider></el-divider>
        <div class="personlist">
          <el-tag style="margin: 0 10px 10px 0" v-for="(item, i) in chosePerson" :key="item.id" closable @close="removeChose(i)">
            {{item.nickname}}
          </el-tag>
        </div>
        <el-divider></el-divider>
        <el-table
          :data="personData"
          style="width: 100%"
        >
          <el-table-column
            align="center"
            prop="nickname"
            label="姓名"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="phone"
            label="手机号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="terminalNumber"
            label="终端号"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="organization"
            label="部门"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="a"
            label="操作"
          >
            <template slot-scope="scope">
              <div v-if="!scope.row.organization">
                <el-button type="text" size="small" @click="chooseHandler(scope.row)" v-html="choseOrNot(scope.row.id)"></el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="y-page"
          @current-change="getPersonlist"
          :current-page.sync="personPage"
          :page-size="personSize"
          layout="total, prev, pager, next, jumper"
          :total="personTotal"
        ></el-pagination>
        <div style="text-align: center;margin-top: 20px">
          <el-button style="margin-right: 100px" @click="addVisible=false">取消</el-button>
          <el-button type="primary" @click="addPerson">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'DirectoriesPerson',
    data () {
      return {
        id: null,
        addVisible: false,
        dialogVisible: false,
        loading: false,
        page: 1,
        size: 10,
        total: 0,
        tableData: [],
        condition: {
          nickName: ''
        },
        areas: [],
        organization: [],
        moveToOrganization: [],
        allper: true,
        userCity: null,
        form: {
          name: '',
        },
        // 新增人员
        personPage: 1,
        personSize: 10,
        personTotal: 0,
        personData: [],
        personCondition: {
          nickname: '',
          userType: '0'
        },
        chosePerson: []
      }
    },
    computed: {

    },
    created () {
    },
    mounted () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.allper = false
        this.userCity = this.$store.state.user.unitId
      }
      this.id = this.$route.query.id
      if (this.id) {
        this.getData(1)
      }
      this.areaInit()
      this.organizationInit()
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Organization_User, {page, limit: this.size, id: this.id, ...this.condition}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.page = page
            this.total = res.totals
          }
        }).finally(res => {
          this.$util.tableLoaded()
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
      organizationInit () {
        this.$http.get(this.$url.Organization_Tree).then(res => {
          if (res.code === 200) {
            if (!this.allper) {
              this.filterChildren(res.data)
            }
            this.organization = res.data
          }
        })
      },
      filterChildren (arr) {
        for (let i = 0; i < arr.length; i++) {
          if(this.userCity !== arr[i].cityNumber){
            arr[i].disabled = true
          }
          if (arr[i].children.length > 0) {
            this.filterChildren(arr[i].children)
          } else {
            arr[i].children = null
          }
        }
      },
      moveHandler (row) {
        this.form = {
          name: row.nickname,
          userId: row.id
        }
        this.moveToOrganization = []
        this.dialogVisible = true
      },
      moveSubmit () {
        const params = {
          userId: this.form.userId,
          organizationId: this.moveToOrganization[this.moveToOrganization.length - 1]
        }
        this.$http.post(this.$url.Organization_User_Move, params).then(res => {
          if (res.code === 200) {
            this.$message.success('移动成功')
            this.dialogVisible = false
            this.getData(this.page)
          }
        })
      },
      removeHandler (row) {
        this.$confirm('确定删除吗？').then(res => {
          this.$http.post(this.$url.Organization_User_Remove, {userId: row.id}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      submit () {
        console.log(1)
      },
      // 选人
      addHandler () {
        this.chosePerson = []
        this.getPersonlist(1)
        this.addVisible = true
      },
      getPersonlist (page) {
        this.$http.get(this.$url.Organization_Find_User, {page: this.personPage, limit: this.personSize, ...this.personCondition}).then(res => {
          if (res.code === 200) {
            this.personData = res.data
            this.personPage = page
            this.personTotal = res.totals
          }
        })
      },
      chooseHandler (row) {
        let index = -1
        for (let j = 0; j < this.chosePerson.length; j++) {
          if (this.chosePerson[j].id === row.id) {
            index = j
            break
          }
        }
        if (index > -1) {
          this.chosePerson.splice(index, 1)
        } else {
          this.chosePerson.push(row)
        }
      },
      removeChose (i) {
        this.chosePerson.splice(i, 1)
      },
      addPerson () {
        const ids = []
        for (let i = 0; i < this.chosePerson.length; i++) {
          ids.push(this.chosePerson[i].id)
        }
        this.$http.post(this.$url.Organization_User_Add, {userIds: ids, organizationId: this.id}).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.addVisible = false
            this.getData(1)
          }
        })
      },
      choseOrNot(id) {
        for (let j = 0; j < this.chosePerson.length; j++) {
          if (this.chosePerson[j].id === id) {
            return '<span style="color: red">已选择</span>'
            break
          }
        }
        return '选择'
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .condition
    display flex
    align-items center
    justify-content space-between
  .form
    padding 0 20px
    /deep/ textarea
      height 150px
  .el-divider
    margin 0
  /deep/ .el-dialog__body
    padding 0 0 20px 0
  .personlist
    padding 20px
    overflow hidden
</style>
