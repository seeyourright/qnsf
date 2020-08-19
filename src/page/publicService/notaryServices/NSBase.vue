<template>
  <div style="margin-top: 20px">
    <el-form ref="form" class="form" label-width="150px" :rules="rules" :model="form">
      <el-row>
        <div>
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
              <el-image class="img" :src="imgUrl" :preview-src-list="[imgUrl]"></el-image>
            </div>
          </el-form-item>
        </div>
        <el-col :span="12">
          <el-form-item label="公证处名称" prop="gzcName">
            <el-input v-model="form.gzcName"></el-input>
          </el-form-item>

          <el-form-item label="账号" prop="gzcAccount">
            <el-input v-model="form.gzcAccount" disabled></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" placeholder="不填写则不会修改密码"></el-input>
          </el-form-item>
          <el-form-item label="县/市" prop="city">
            <el-select :disabled="!allper" v-model="area">
              <el-option v-for="area in areas" :label="area.name" :value="area.name+'-'+area.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系人" prop="gzcLinkmanName">
            <el-input v-model="form.gzcLinkmanName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="gzcLinkmanPhone">
            <el-input v-model="form.gzcLinkmanPhone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="gzcEmail">
            <el-input v-model="form.gzcEmail"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
            <el-radio-group  v-model="form.status">
              <el-radio :label="1">启用</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="房间号" prop="gzcRoom">
            <el-input v-model="form.gzcRoom"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="业务类型" prop="gzcBusiness">
        <el-tag
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)">
          {{tag}}
        </el-tag>
        <el-input
          class="input-new-tag"
          v-if="inputVisible"
          v-model="inputValue"
          ref="saveTagInput"
          size="small"
          @keyup.enter.native="handleInputConfirm"
          @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">添加</el-button>
      </el-form-item>
      <el-form-item label="公证处地址" prop="gzcSite">
        <el-input type="textarea" v-model="form.gzcSite"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="gzcSynopsis">
        <el-input type="textarea" v-model="form.gzcSynopsis"></el-input>
      </el-form-item>
      <el-form-item label="公证类型所需材料" prop="materials">
        <el-input type="textarea" v-model="form.materials"></el-input>
      </el-form-item>
      <div class="d-btns">
        <el-button @click="$router.back()">取消</el-button>
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'NSBase',
    data () {
      return {
        id: null,
        form: {
          gzcName: '',
          gzcLinkmanName: '',
          gzcLinkmanPhone: '',
          gzcEmail: '',
          gzcRoom: '',
          gzcAccount: '',
          gzcPassword: '',
          gczLogo: '',
          city: '',
          cityName: null,
          gzcSite: '',
          gzcBusiness: '',
          gzcSynopsis: '',
          materials: '',
          status: 1
        },
        password: '',
        file: null,
        key: '',
        imgUrl: '',
        area: '',
        rules: {
          imgUrl: [
            {validator: this.imgValidator, trigger: 'blur'}
          ],
          gzcName: [
            {required: true, message: '公证处名称不能为空', trigger: 'blur'}
          ],
          gzcLinkmanName: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          gzcLinkmanPhone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {pattern: this.$util.phoneReg, message: '联系电话格式错误', trigger: 'blur'}
          ],
          gzcAccount: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          gzcPassword: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          gzcEmail: [
            {pattern: this.$util.emailReg, message: '邮箱格式错误', trigger: 'blur'}
          ],
          city: [
            {required: true, message: '县/市不能为空', trigger: 'change'}
          ],
          gzcRoom: [
            {required: true, message: '房间号不能为空', trigger: 'blur'}
          ],
          gzcSynopsis: [
            {required: true, message: '简介不能为空', trigger: 'blur'}
          ],
          gzcBusiness: [
            {required: true, message: '业务类型不能为空', trigger: 'blur'}
          ],
          gzcSite: [
            {required: true, message: '公证处地址不能为空', trigger: 'blur'}
          ],
          materials: [
            {required: true, message: '公证类型所需材料不能为空', trigger: 'blur'}
          ]
        },
        areas: [],
        allper: true,
        dynamicTags: [],
        inputVisible: false,
        inputValue: ''
      }
    },
    created () {
      if (this.$store.state.user.userType === '2' && this.$store.state.user.unitId !== '5227000000' || this.$store.state.user.userType === '5') {
        this.allper = false
      }
      if (this.$parent.id) {
        this.init()
      }
      this.areaInit()
    },
    methods: {
      init () {
        this.$http.get(this.$url.Notarial_Office_By_Id, {id: this.$parent.id}).then(res => {
          if (res.code === 200) {
            this.form = res.data
            this.area = this.form.cityName + '-' + this.form.city
            this.imgUrl = this.form.gzcLogo
            this.dynamicTags = this.form.gzcBusiness.split('\u0888')
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
      imgValidator (rule, value, callback) {
        if (!this.imgUrl) {
          callback(new Error('图片不能为空'))
          return false
        }
        callback()
      },
      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
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
            this.edit()
          }
        })
      },
      async edit () {
        this.loading = true
        const params = {
          id: this.form.id,
          gzcName: this.form.gzcName,
          gzcLinkmanName: this.form.gzcLinkmanName,
          gzcLinkmanPhone: this.form.gzcLinkmanPhone,
          gzcEmail: this.form.gzcEmail,
          gzcRoom: this.form.gzcRoom,
          city: this.form.city,
          cityName: this.form.cityName,
          gzcSite: this.form.gzcSite,
          gzcBusiness: this.form.gzcBusiness,
          gzcSynopsis: this.form.gzcSynopsis,
          materials: this.form.materials,
          status: this.form.status
        }
        if (this.file) {
          this.key = 'notary'+new Date().getTime()
          await this.uploadFile(this.file, this.key)
          params.gzcLogo = this.$url.OBS_Path + this.key
        }
        if (this.password) {
          params.gzcPassword = this.password
        }
        this.$http.post(this.$url.Update_Notarial_Office, params).then(res => {
          if (res.code === 200) {
            this.$message.success('修改成功')
            this.password = ''
            this.init()
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
      },
      dynamicTags (value) {
        this.form.gzcBusiness = value.join('\u0888')
        this.$nextTick(()=>{
          this.$refs.form.validateField('gzcBusiness')
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .form
    width 800px
    .el-select
      width 100%
  .img /deep/ img
    max-height 300px
    width auto
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
