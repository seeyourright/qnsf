<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="科室" prop="department">
        <el-input v-model="form.department"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="chargePerson">
        <el-input v-model="form.chargePerson"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="房间号" prop="roomNumber">
        <el-input v-model="form.roomNumber"></el-input>
      </el-form-item>
      <el-form-item label="主要业务" prop="introduction">
        <el-input type="textarea" v-model="form.introduction"></el-input>
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
      <el-form-item label="所属县市" prop="cityNumber">
        <el-select v-model="area">
          <el-option v-for="area in areas" :label="area.name" :value="area.name+'-'+area.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
      <div style="text-align: center;letter-spacing: 50px;margin-top: 30px">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="submit" :loading="loading">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'ArAdd',
    data () {
      return {
        loading: false,
        id: null,
        form: {
          department: '',
          city: '',
          cityNumber: '',
          chargePerson: '',
          phone: '',
          roomNumber: '',
          address: '',
          introduction: '',
          status: 1,
        },
        area: '',
        rules: {
          department: [
            {required: true, message: '科室不能为空', trigger: 'blur'}
          ],
          cityNumber: [
            {required: true, message: '所属县市不能为空', trigger: 'blur'}
          ],
          // chargePerson: [
          //   {required: true, message: '联系人不能为空', trigger: 'blur'}
          // ],
          // phone: [
          //   {required: true, message: '联系电话不能为空', trigger: 'blur'},
          //   {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
          // ],
          // roomNumber: [
          //   {required: true, message: '房间号不能为空', trigger: 'blur'}
          // ],
          // address: [
          //   {required: true, message: '地址不能为空', trigger: 'blur'}
          // ],
          // introduction: [
          //   {required: true, message: '主要业务不能为空', trigger: 'blur'}
          // ],
        },
        areas: []
      }
    },
    created () {
      this.id = this.$route.query.id
      if (this.id) {
        this.init()
      }
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Administrative_Reconsideration_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.area = this.form.city + '-' + this.form.cityNumber
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
            if (this.id) {
              this.edit()
            } else {
              this.add()
            }
          }
        })
      },
      async add () {
        this.loading = true
        this.$http.post(this.$url.Add_Administrative_Reconsideration, this.form).then(res => {
          if (res.code === 200) {
            this.$message.success('新增成功')
            this.$router.back()
          }
        }).finally(res => {
          this.loading = false
        })
      },
      async edit () {
        this.loading = true
        const params = {
          id: this.form.id,
          department: this.form.department,
          city: this.form.city,
          cityNumber: this.form.cityNumber,
          chargePerson: this.form.chargePerson,
          phone: this.form.phone,
          roomNumber: this.form.roomNumber,
          address: this.form.address,
          introduction: this.form.introduction,
          status: this.form.status
        }
        this.$http.post(this.$url.Update_Administrative_Reconsideration, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.$router.back()
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
  .form
    width 900px
</style>
