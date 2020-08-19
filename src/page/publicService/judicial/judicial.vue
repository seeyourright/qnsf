<template>
  <div class="mm">
    <div class="condition">
      <div>公共服务—司法所</div>
      <el-form size="small" inline>
        <el-form-item v-if="allper">
          <el-select v-model="condition.cityNumber">
            <el-option label="全部地区" :value="null"></el-option>
            <el-option v-for="area in areas" :label="area.name" :value="area.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="输入司法所名称" v-model="condition.judicialName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="getData(1)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addHandler">新增</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="deleteAllHandler">批量删除</el-button>
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
        prop="id"
        label="ID"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="judicialName"
        label="司法所名称"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="chargePerson"
        label="负责人姓名"
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="联系电话"
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
        align="center"
        prop="a"
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="detailHandler(scope.row)">详情</el-button>
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
      :visible="dialogVisible"
      :show-close="false"
    >
      <el-form ref="form" class="form" label-width="100px" :rules="rules" :model="form">
        <el-form-item label="司法所名称" prop="judicialName">
          <el-input v-model="form.judicialName"></el-input>
        </el-form-item>
        <el-form-item label="负责人姓名" prop="chargePerson">
          <el-input v-model="form.chargePerson"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码" prop="postalCode">
          <el-input v-model="form.postalCode" maxlength="6"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
            active-text="启用"
            inactive-text="停用"
          ></el-switch>
        </el-form-item>
        <el-form-item label="图片" prop="imgUrl">
          <el-upload
            action="#"
            type="file"
            :before-upload="beforeUpload"
            :show-file-list="false"
            accept="image/*"
          >
            <div style="text-align: left">
              <el-button>选择图片</el-button>
            </div>
          </el-upload>
          <div v-if="imgUrl" style="margin-top: 10px">
            <el-image :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
          </div>
        </el-form-item>
        <el-form-item label="县/市" prop="cityNumber">
          <el-select :disabled="!allper" v-model="area">
            <el-option v-for="area in areas" :label="area.name" :value="area.name+'-'+area.id"></el-option>
          </el-select>
        </el-form-item>
        <div style="text-align: right">
          <el-button @click="dialogVisible=false">取消</el-button>
          <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'judicial',
    data () {
      return {
        loading: false,
        page: 1,
        size: 10,
        total: 100,
        tableData: [],
        condition: {
          cityNumber: null,
          judicialName: ''
        },
        dialogVisible: false,
        form: {
          judicialName: '',
          chargePerson: '',
          city: '',
          cityNumber: '',
          phone: '',
          postalCode: '',
          address: '',
          imgUrl: null,
          status: 1
        },
        area: null,
        file: null,
        key: '',
        imgUrl: '',
        rules: {
          judicialName: [
            {required: true, message: '司法所名称不能为空', trigger: 'blur'}
          ],
          chargePerson: [
            {required: true, message: '负责人姓名不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
          ],
          postalCode: [
            {required: true, message: '邮政编码不能为空', trigger: 'blur'},
            {pattern: /\d{6}/, message: '邮政编码格式错误', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'}
          ],
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          cityNumber: [
            {required: true, message: '请选择县/市', trigger: 'blur'}
          ],
        },
        areas: [],
        allper: true,
      }
    },
    mounted () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.allper = false
        this.condition.cityNumber = this.$store.state.user.unitId
      }
      this.getData(1)
      this.areaInit()
    },
    methods: {
      getData (page) {
        this.$util.tableLoading()
        this.$http.get(this.$url.Judicial_List, {page, limit: this.size, ...this.condition}).then(res => {
          if (res.code === 200) {
            this.tableData = res.data
            this.page = page
            this.total = res.totals
          } else if(res.code === 203) {
            this.tableData = []
            this.page = 1
            this.total = 0
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
      imgValidator (rule, value, callback) {
        if (!this.imgUrl) {
          callback(new Error('图片不能为空'))
          return false
        }
        callback()
      },
      beforeUpload (file) {
        if (file) {
          this.$util.imgBase64(file, (res) => {
            this.file = file
            this.imgUrl = res
            this.$refs.form.validateField('imgUrl')
          })
        }
        return Promise.reject(new Error())
      },
      detailHandler (row) {
        this.form = {...row}
        this.area = row.city + '-' +row.cityNumber
        this.imgUrl = row.imgUrl
        this.file = null
        this.key = ''
        this.dialogVisible = true
      },
      deleteAllHandler () {
        const selection = this.$refs.table.selection
        if (selection.length === 0) {
          this.$message.warning('至少选择一条数据')
          return false
        }
        const ids = []
        for (let i = 0; i < selection.length; i++) {
          ids.push(selection[i].id)
        }
        this.$confirm('确定删除吗').then(() => {
          this.$http.post(this.$url.Delete_Judicial, {ids: ids.join(',')}).then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功')
              this.getData(this.page)
            }
          })
        }, () => {})
      },
      addHandler () {
        this.form = {
          judicialName: '',
          chargePerson: '',
          city: '',
          cityNumber: '',
          phone: '',
          postalCode: '',
          address: '',
          imgUrl: null,
          status: 1
        }
        this.area = ''
        if (!this.allper) {
          for (let i = 0; i < this.areas.length; i++) {
            if (this.areas[i].id === this.$store.state.user.unitId) {
              this.area = this.areas[i].name + '-' + this.areas[i].id
              break
            }
          }
        }
        this.file = null
        this.imgUrl = ''
        this.key = ''
        this.dialogVisible = true
      },
      async uploadFile (file, key) {
        return await this.$ObsClient.putObject({
          Bucket: 'zhsf',
          Key: key,
          SourceFile: file,
        })
      },
      submit () {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.form.id) {
              this.edit()
            } else {
              this.add()
            }
          }
        })
      },
      async add () {
        this.loading = true
        if (this.file) {
          this.key = 'judicial'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          this.form.remark = this.key
          this.form.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Add_Judicial, this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.getData(1)
            this.dialogVisible = false
          }
        }).finally(res => {
          this.loading = false
        })
      },
      async edit () {
        this.loading = true
        const params = {
          id: this.form.id,
          judicialName: this.form.judicialName,
          chargePerson: this.form.chargePerson,
          city: this.form.city,
          cityNumber: this.form.cityNumber,
          phone: this.form.phone,
          postalCode: this.form.postalCode,
          address: this.form.address,
          status: this.form.status
        }
        if (this.file) {
          this.key = 'judicial'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.remark = this.key
          params.imgUrl = this.$url.OBS_Path + this.key
        }
        this.$http.post(this.$url.Update_Judicial, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.getData(this.page)
            this.dialogVisible = false
          }
        }).finally(res => {
          this.loading = false
        })
      }
    },
    watch: {
      area (value) {
        this.form.city = value && value.split('-')[0]
        this.form.cityNumber = value && value.split('-')[1]
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
