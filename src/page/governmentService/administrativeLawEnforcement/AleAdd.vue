<template>
  <div class="mm">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-form-item label="执法单位" prop="zfsname">
        <el-input placeholder="请输入标题" v-model="form.zfsname"></el-input>
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
      <el-form-item label="所属县市" prop="did">
        <el-select :disabled="!allper" v-model="area">
          <el-option v-for="area in areas" :label="area.name" :value="area.name+'-'+area.id"></el-option>
        </el-select>
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
    name: 'AleAdd',
    data () {
      return {
        loading: false,
        id: null,
        form: {
          zfsname: '',
          status: 1,
          did: '',
          region: ''
        },
        area: '',
        rules: {
          zfsname: [
            {required: true, message: '执法单位不能为空', trigger: 'blur'}
          ],
          did: [
            {required: true, message: '所属县市不能为空', trigger: 'blur'}
          ],
        },
        areas: [],
        allper: true
      }
    },
    created () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000') {
        this.allper = false
      }
      this.id = this.$route.query.id
      if (this.id) {
        this.init()
      }
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Law_Enforcement_Agencies_By_Id, {id: this.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.area = this.form.region + '-' + this.form.did
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
            if (!this.allper) {
              for (let i = 0; i < this.areas.length; i++) {
                if (this.areas[i].id === this.$store.state.user.unitId) {
                  this.area = this.areas[i].name + '-' + this.areas[i].id
                  break
                }
              }
            }
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
        this.$http.post(this.$url.Add_Law_Enforcement_Agencies, this.form).then(res => {
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
          zfsname: this.form.zfsname,
          status: this.form.status,
          did: this.form.did,
          region: this.form.region
        }
        this.$http.post(this.$url.Update_Law_Enforcement_Agencies, params).then(res => {
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
        this.form.region = value && value.split('-')[0]
        this.form.did = value && value.split('-')[1]
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 900px
</style>
