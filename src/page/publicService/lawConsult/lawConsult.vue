<template>
  <!-- 法律咨询 -->
  <div class="lawConsult">
    <p  class="lawTitle">法律咨询</p>
    <div class="lc_form">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" >
        <el-row>
          <el-col :span="7">
            <el-form-item label="视讯房间号" prop="roomId">
              <el-select v-model="form.roomId" placeholder="请选择">
                <el-option :label="item" :value="item"  v-for="(item,index) in roomList" :key="index"  ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="县/市" prop="city">
              <el-select v-model="form.city" placeholder="请选择">
               <el-option :label="item" :value="item"  v-for="(item,index) in cityList" :key="index"  ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="7">
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div style="width:60%;">
          <el-form-item label="简介" prop="intro">
            <el-input type="textarea" v-model="form.intro"></el-input>
          </el-form-item>
        </div>

        <div style="width:60%;">
          <el-form-item label="地址" prop="addr">
            <el-input type="textarea" v-model="form.addr"></el-input>
          </el-form-item>
        </div>

        <div style="width:100%;">
          <p style="color: #606266;padding-left: 58px;">上传图片</p>
          <div style="width:100%;padding:30px 58px;">
            <el-upload
              action=""
              list-type="picture-card"
              :auto-upload ="false"
              :on-change="fileChange"
              :on-exceed="onExceed"
              :limit="1"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
        </div>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button  @click="reset">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
       var validatePhone = (rule, value, callback) => {
        if (!(/^1[34578]\d{9}$/.test(value))) {
           callback(new Error('请输入正确的手机号码!'));
         }
      };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      roomList:['001','002','003','004','005'],
      cityList:['都匀市','独山县','平塘县'],
      form: {
        roomId: "",
        city: "",
        phone: "",
        email: "",
        intro: '',
        addr: '',
        file: "",
      },
      rules:{
         
         phone:[ { required: true, message: '请输入电话号码', trigger: 'blur' },{ validator: validatePhone, trigger: "blur" }],
         email:[ { required: true, message: '请输入邮箱', trigger: 'blur' },{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
         intro:[ { required: true, message: '请输入简介', trigger: 'blur' }],
         addr:[ { required: true, message: '请输入地址', trigger: 'blur' }],
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    //   console.log(document.querySelector('.el-upload .el-upload__input').files[0])
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed(){
        console.log('超出限制')
    },
    reset(){
        this.$refs.form.resetFields()
        
    },
    fileChange(file,filelist){
       console.log(file)
    }
  }
};
</script>

<style scoped>
.lawConsult {
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.lc_form {
  width: 80%;
  padding: 20px 15% 20px 0%;
  margin: 20px;
  border: 1px solid rgba(190, 190, 190, 1);
  border-radius: 9px;
}

.lc_form_item {
  width: 30%;
}

.lc_form_item_box {
  width: 200px;
}

.lawTitle{
    font-size: 15px;
    font-weight: bold;
    padding: 20px 20px 0;
}
</style>
