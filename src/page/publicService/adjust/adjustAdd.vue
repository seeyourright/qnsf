<template>
  <div class="lawConsult">
    <div class="dlg">
      <i style="position:absolute;top:20px;right:20px;" @click="goback" class="el-icon-close"></i>
      <p class="lawTitle">人民调解</p>
      <div style="margin:20px 0 0 20px;">
        <el-radio v-model="radio1" label="1" border>基础信息</el-radio>
        <el-radio v-model="radio1" label="2" border>援助管理</el-radio>
      </div>
      <adjust v-show="radio1 == 2"></adjust>
      <div class="lc_form"  style="min-height:63vh;" v-show="radio1 == 1">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="县/市" prop="city">
                <el-select
                  :disabled="mode == 'look'"
                  v-model="form.cityId"
                  @change="selectChange"
                  placeholder="请选择"
                >
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row v-for="(domain, index) in form.roomId" :key="index">
            <el-col :span="7">
              <el-form-item
                :label="'房间号' + index"
                :key="domain.key"
                :prop="'roomId.' + index + '.value'"
                :rules="{
                      required: true, message: '房间号不能为空', trigger: 'blur'
                  }"
              >
                <el-input :disabled="mode == 'look'" v-model="domain.value"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <div
                style="padding:10px;color:#409EFF;cursor: pointer;"
                @click.prevent="removeDomain(domain)"
              >删除</div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-button
                style="margin:0px 100px 20px;"
                type="primary"
                size="mini"
                @click="addDomain"
              >继续添加</el-button>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="状态" prop="phone">
                <el-switch v-model="form.status"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item v-if="mode == 'add'">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item v-if="mode == 'update'">
            <el-button type="primary" @click="onSubmit1">确认修改</el-button>
          </el-form-item>
        </el-form>
      </div>

      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt />
      </el-dialog>
    </div>
  </div>
</template>

<script>
import adjust from "./adjust";
export default {
  components: { adjust },
  props: {},
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码!"));
      }
    };
    return {
      mode: "",
      id: "",
      radio1: "1",
      preImg:'',
      srcList: [],
      fileList: [],
      upUrl:'',
      dialogImageUrl: "",
      dialogVisible: false,
      show1: false,
      roomList: [],
      cityList: [],
      form: {
        roomId: [
          {
            value: ""
          }
        ],
        status: false,
        city: "",
        cityId: "",
        phone: "",
        addr: "",
        imgUrl: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        intro: [{ required: true, message: "请输入简介", trigger: "blur" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    // let s = "E:\zhsf\law_aid_sign_file\20200629151728484.png".replace(/\//g, '-')
    // console.log(s.substring(s.lastIndexOf("-")+1));
    this.upUrl = this.$url.upUrl
    let res = JSON.parse(sessionStorage.getItem("adjustHome"));
    console.log(res);
    this.mode = res.mode;
    if (res.id) {
      this.id = res.id;
      this.getDetail();
    }
    this.getCity();
  },
  methods: {
    getDetail() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.getDetail1,
          params: {
            id: that.id
          }
        })
        .then(function(res) {
          console.log("基础信息id", res);
          if (res.data.code == 200) {
              let arr = res.data.data.roomNumber.split(',')
              let arr1 = []
              arr.forEach(val=>{
                arr1.push({
                  value:val,
                  key: Date.now()
                })
              })

              that.form = {
                 roomId: arr1,
                 status: res.data.data.status == 1?true:false,
                 city: res.data.data.city,
                 cityId: res.data.data.addressNumber,
                 phone: res.data.data.phone,
                 addr: res.data.data.address,
                 imgUrl: res.data.data.imgUrl
              }
              console.log(that.form)
              that.preImg = res.data.data.imgUrl


          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    getCity() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.getCity,
          params: {}
        })
        .then(function(res) {
          console.log("获取行政单位", res);
          that.cityList = [];
          if (res.data.code == 200) {
            res.data.data.forEach(val => {
              that.cityList.push({
                name: val.institutionalName,
                value: val.id
              });
            });

            that.city = that.cityList[0].name;
            // that.getApplyList();
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    removeDomain(item) {
      var index = this.form.roomId.indexOf(item);
      if (index !== -1) {
        this.form.roomId.splice(index, 1);
      }
    },
    addDomain() {
      this.form.roomId.push({
        value: "",
        key: Date.now()
      });
    },
    selectChange(e) {
      console.log()
      this.cityList.forEach(val => {
        if(e == val.value){
           this.form.city = val.name;
        }
        
      });
    },
    goback() {
      this.$router.push("adjust");
    },
    getCity() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.getCity,
          params: {}
        })
        .then(function(res) {
          console.log("获取行政单位", res);
          that.cityList = [];
          if (res.data.code == 200) {
            res.data.data.forEach(val => {
              that.cityList.push({
                name: val.institutionalName,
                value: val.id
              });
            });
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    add() {
      this.mode = "add";
      this.form = {
        roomId: [
          {
            value: ""
          }
        ],
        status: false,
        city: "",
        cityId: "",
        phone: "",
        addr: "",
        imgUrl: ""
      };
      this.show1 = true;
    },
    update(val) {
      console.log(val);
      this.mode = "update";
      this.form = val;
      this.show1 = true;
    },
    uploadSuccess(e) {

      this.preImg = ''
      this.form.imgUrl = `${this.$url.imgUrl}${e.data.split("\\").pop()}`;
    },
    uploadErr(e) {
      console.log(e);
    },
    onSubmit() {
      const that = this;
      console.log(that.form);
      let arr = [];
      that.form.roomId.forEach(val => {
        arr.push(val.value);
      });

      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.add1,
          params: {
            city: that.form.city,
            addressNumber: that.form.cityId,
            phone: that.form.phone,
            roomNumber: arr.join(","),
            status: that.form.status?1:0,
            address: that.form.addr,
            imgUrl: that.form.imgUrl
          }
        })
        .then(function(res) {
          console.log("新增法律咨询", res);
          if (res.data.code == 200) {
            that.form = {
              roomId: [
                {
                  value: ""
                }
              ],
              status: false,
              city: "",
              cityId: "",
              phone: "",
              addr: "",
              imgUrl: ""
            };
            that.fileList = [];
            that.$message.success("新增成功！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      //   console.log(document.querySelector('.el-upload .el-upload__input').files[0])
    },
    onSubmit1() {
      const that = this;
      console.log(that.form);
      let arr = [];
      that.form.roomId.forEach(val => {
        arr.push(val.value);
      });

      that.$http
        .axios({
          method: "post",
          url: that.$url.lawHelp.update1,
          params: {
            id:that.id,
            city: that.form.city,
            addressNumber: that.form.cityId,
            phone: that.form.phone,
            roomNumber: arr.join(","),
            status: that.form.status?1:0,
            address: that.form.addr,
            imgUrl: that.form.imgUrl
          }
        })
        .then(function(res) {
          console.log("修改法律援助详情", res);
          if (res.data.code == 200) {
            that.$message.success("修改成功！");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      //   console.log(document.querySelector('.el-upload .el-upload__input').files[0])
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.imgUrl = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onExceed() {
      console.log("超出限制");
      this.$message.error("只能上传一张图片哦,如需修改请先删除图片~");
    },
    reset() {
      this.$refs.form.resetFields();
      this.fileList = [];
    },
    fileChange(file, filelist) {
      console.log(file);
      // this.form.file = file
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
  align-items: center;
}

.dlg {
  width: 100%;
  min-width: 800px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  background: white;
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

.lawTitle {
  font-size: 15px;
  font-weight: bold;
  padding: 20px 20px 0;
}
</style>
