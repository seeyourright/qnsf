<template>
  <div class="mm">
    <div class="condition">
      <div>系统管理—组织架构</div>
      <el-form size="small" inline>
<!--        <el-form-item v-if="allper">-->
<!--          <el-select v-model="condition.cityNumber">-->
<!--            <el-option label="全部地区" :value="null"></el-option>-->
<!--            <el-option v-for="area in areas" :label="area.name" :value="area.id"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-input placeholder="输入名称" v-model="condition.lawFirmName"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button @click="getData(1)">查询</el-button>-->
<!--        </el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="addHandler()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="table"
      :data="organization"
      tooltip-effect="dark"
      style="width: 100%"
      :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: true}"
    >
      <el-table-column
        align="center"
        type="selection"
      >
      </el-table-column>
      <el-table-column
        prop="organizationName"
        label="名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="县/市"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="status"
        label="状态"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.status === 0">停用</span>
          <span v-if="scope.row.status === 1">启用</span>
        </template>
      </el-table-column>
      <el-table-column
        width="350px"
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <span v-if="!scope.row.disabled">
            <el-button type="text" size="small" @click="addHandler(scope.row)">增加下级</el-button>
            <el-button type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="detailHandler(scope.row)">查看人员</el-button>
            <el-button type="text" size="small" @click="seeHandler(scope.row)">设置可见组织</el-button>
            <el-button type="text" size="small" @click="seenHandler(scope.row)">设置被哪些组织可见</el-button>
            <el-button type="text" size="small" @click="changeStatus(scope.row)">{{scope.row.status === 1?'停用':'启用'}}</el-button>
            <el-button type="text" size="small" class="text-danger" @click="deleteHandler(scope.row)">删除</el-button>
          </span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :show-close="false"
      :visible="dialogVisible"
      width="800px"
    >
      <div>
        <el-form label-width="50px">
          <el-form-item label="名称">
            <el-input v-model="form.organizationName"></el-input>
          </el-form-item>
          <el-form-item label="县/市">
            <el-select :disabled="!allper||cityDisabled" v-model="form.cityNumber">
              <el-option v-for="area in areas" :label="area.name" :value="area.id"></el-option>
            </el-select>
          </el-form-item>
          <div style="padding: 20px;display: flex;justify-content: space-around">
            <div>
              <div style="margin-bottom: 20px">选择哪些部门可以查看新增的部门</div>
              <el-tree
                style="max-height: 400px; overflow: auto"
                :props="{label: 'organizationName', children: 'children'}"
                :data="organization"
                node-key="id"
                check-strictly
                show-checkbox
                ref="departs"
              >
              </el-tree>
            </div>
            <div>
              <div style="margin-bottom: 20px">选择新增的部门可以查看哪些部门</div>
              <el-tree
                style="max-height: 400px; overflow: auto"
                :props="{label: 'organizationName', children: 'children'}"
                :data="organization"
                node-key="id"
                check-strictly
                show-checkbox
                ref="organizations"
              >
              </el-tree>
            </div>
          </div>
          <div style="text-align: right">
            <el-button @click="dialogVisible=false">取消</el-button>
            <el-button type="primary" @click="submit">保存</el-button>
          </div>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :visible="editVisible"
      width="800px"
    >
      <el-form label-width="50px">
        <el-form-item label="名称">
          <el-input v-model="form.organizationName"></el-input>
        </el-form-item>
        <div style="text-align: right">
          <el-button @click="editVisible=false">取消</el-button>
          <el-button type="primary" @click="edit">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :visible="seeVisible"
      width="800px"
    >
      <el-form label-width="50px">
        <div style="margin-bottom: 20px">此组织可以查看的组织</div>
        <i v-if="seeloading" class="el-icon-loading"></i>
        <el-tree
          v-else
          style="max-height: 400px; overflow: auto"
          :props="{label: 'organizationName', children: 'children'}"
          :data="organization"
          node-key="id"
          check-strictly
          show-checkbox
          ref="seeTree"
        >
        </el-tree>
        <div style="text-align: right">
          <el-button @click="seeVisible=false">取消</el-button>
          <el-button type="primary" @click="seeSubmit">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
    <el-dialog
      :show-close="false"
      :visible="seenVisible"
      width="800px"
    >
      <el-form label-width="50px">
        <div style="margin-bottom: 20px">可以查看此组织的组织</div>
        <i v-if="seeloading" class="el-icon-loading"></i>
        <el-tree
          v-else
          style="max-height: 400px; overflow: auto"
          :props="{label: 'organizationName', children: 'children'}"
          :data="organization"
          node-key="id"
          check-strictly
          show-checkbox
          ref="seenTree"
        >
        </el-tree>
        <div style="text-align: right">
          <el-button @click="seenVisible=false">取消</el-button>
          <el-button type="primary" @click="seenSubmit">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Directories',
    data () {
      return {
        seeVisible: false,
        seenVisible: false,
        editVisible: false,
        dialogVisible: false,
        seeloading: false,
        loading: false,
        page: 1,
        size: 10,
        total: 100,
        userCity: null,
        areas: [],
        organization: [],
        allper: true,
        cityDisabled: false,
        form: {
          id: null,
          organizationName: '',
          city: '',
          cityNumber: null,
        }
      }
    },
    created () {
    },
    mounted () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.allper = false
        this.userCity = this.$store.state.user.unitId
      }
      this.getData()
      this.areaInit()
    },
    methods: {
      getData () {
        this.$util.tableLoading()
        this.$http.get(this.$url.Organization_Tree).then(res => {
          if (res.code === 200) {
            if (!this.allper) {
              this.filterChildren(res.data)
            }
            this.organization = res.data
          }
        }).finally(res => {
          this.$util.tableLoaded()
        })
      },
      filterChildren (arr) {
        for (let i = 0; i < arr.length; i++) {
          if(this.userCity !== arr[i].cityNumber){
            arr[i].disabled = true
          }
          if (arr[i].children.length > 0) {
            this.filterChildren(arr[i].children)
          }
        }
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
      addHandler (row) {
        this.form = {
          id: null,
          organizationName: '',
          cityNumber: null,
        }
        if (!this.allper) {
          this.form.cityNumber = this.userCity
        }
        if (!row) {
          this.form.pid = 0
        } else {
          this.form.pid = row.id
          if (row.cityNumber !== '5227000000'){
            this.cityDisabled = true
            this.form.cityNumber = row.cityNumber
          } else {
            this.cityDisabled = false
          }
        }
        this.dialogVisible = true
      },
      editHandler (row) {
        this.form = {
          id: row.id,
          organizationName: row.organizationName,
          cityNumber: row.cityNumber,
        }
        this.editVisible = true
      },
      detailHandler (row) {
        this.$router.push('directoriesPerson?id=' + row.id + '&org=' + row.organizationName)
      },
      seeHandler (row) {
        this.form = {
          id: row.id,
        }
        this.seeVisible = true
        this.seeloading = true
        this.$http.get(this.$url.Organization_See, {depart: row.id}).then(res => {
          if (res.code === 200) {
            this.seeloading = false
            this.$nextTick(() => {
              this.$refs.seeTree.setCheckedKeys(res.data)
            })
          }
        })
      },
      seenHandler (row) {
        this.form = {
          id: row.id,
        }
        this.seenVisible = true
        this.seeloading = true
        this.$http.get(this.$url.Organization_Seen, {organization: row.id}).then(res => {
          if (res.code === 200) {
            this.seeloading = false
            this.$nextTick(() => {
              this.$refs.seenTree.setCheckedKeys(res.data)
            })
          }
        })
      },
      deleteHandler(row) {
        this.$confirm('删除组织将会删除下级组织及人员，确定吗？').then(res => {
          this.$http.post(this.$url.Organization_Remove, {id: row.id}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData()
            }
          })
        }, () => {})

      },
      changeStatus (row) {
        const status = row.status === 0 ? 1 : 0
        const text = row.status === 0 ? '确认启用吗？' : '停用之后组织及下级将不展示在app上，确认吗？'
        this.$confirm(text).then(res => {
          this.$http.get(this.$url.Organization_Update, {status, id: row.id}).then(res => {
            if (res.code === 200) {
              row.status = status
              this.$message.success('操作成功')
            }
          })
        }, () => {})
      },
      submit () {
        if (!this.form.organizationName.trim()) {
          this.$message.warning('组织名称不能为空')
          return false
        }
        if (!this.form.cityNumber) {
          this.$message.warning('请选这县/市')
          return false
        }
        this.add()
      },
      add () {
        const params = {
          pid: this.form.pid,
          organizationName: this.form.organizationName,
          city: this.form.city,
          cityNumber: this.form.cityNumber,
          organizations: this.$refs.organizations.getCheckedKeys(),
          departs: this.$refs.departs.getCheckedKeys(),
          status: 1
        }
        this.$http.post(this.$url.Organization_Add, params).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.getData()
            this.dialogVisible = false
          }
        })
      },
      edit () {
        if (!this.form.organizationName.trim()) {
          this.$message.warning('组织名称不能为空')
          return false
        }
        const params = {
          id: this.form.id,
          organizationName: this.form.organizationName
        }
        this.$http.post(this.$url.Organization_Update, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.getData()
            this.editVisible = false
          }
        })
      },
      seeSubmit () {
        const params = {
          id: this.form.id,
          organizations: this.$refs.seeTree.getCheckedKeys(),
        }
        this.$http.post(this.$url.Organization_Update_See, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.seeVisible = false
          }
        })
      },
      seenSubmit () {
        const params = {
          id: this.form.id,
          departs: this.$refs.seenTree.getCheckedKeys(),
        }
        this.$http.post(this.$url.Organization_Update_Seen, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.seenVisible = false
          }
        })
      }
    },
    watch: {
      'form.cityNumber': {
        handler (val) {
          if (val) {
            for (let i = 0; i < this.areas.length; i++) {
              if (this.areas[i].id === val) {
                this.form.city = this.areas[i].name
                break
              }
            }
          } else {
            this.form.city = ''
          }
        }
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
</style>
