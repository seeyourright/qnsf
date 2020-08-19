<template>
  <!-- 法律咨询 -->
  <div class="lawConsult">
    <p class="lawTitle">法律咨询</p>
    <!-- 操作栏 -->
    <div class="ad_row1">
      <el-button type="primary" size="small" @click="add">新增</el-button>
      <el-popconfirm title="确定删除吗？" @onConfirm="delMore" style="margin-left:20px;">
        <el-button type="danger" size="small" slot="reference">批量删除</el-button>
      </el-popconfirm>
    </div>

    <!-- 表格 -->
    <div class="ad_row2">
      <el-table
        ref="multipleTable"
        :data="tableData"
        v-loading="loading"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{'background':'rgba(190,190,190,0.3)','color':'#666666'}"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="id" label="ID" align="center"></el-table-column>
        <el-table-column prop="city" label="县/市" align="center"></el-table-column>
        <el-table-column prop="phone" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="roomId" label="房间号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="lookDetail(scope.row)">查看详情</el-button>
            <!-- <el-button type="text" size="small" @click="update(scope.row)">修改</el-button> -->
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="ad_row3">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="size"
        layout="total, prev, pager, next, jumper"
        :total="totals"
      ></el-pagination>
    </div>

    <!-------------------------------------------------- 法律咨询模态框 ---------------------------------------------->
    <div class="dlg" v-if="show1">
      <i
        style="position:absolute;top:20px;right:20px;"
        @click="show1 = false"
        class="el-icon-close"
      ></i>
      <p class="lawTitle">法律咨询</p>
      <div class="lc_form">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>
            <el-col :span="7">
              <el-form-item label="县/市" prop="city">
                <el-select :disabled="mode == 'look' || role != 3" v-model="form.cityId"  @change="selectChange"  placeholder="请选择">
                  <el-option
                    :label="item.name"
                    :value="item.value"
                    v-for="(item,index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="视讯房间号" prop="roomId">
                 <el-input :disabled="mode == 'look'" v-model="form.roomId"></el-input>
                <!-- <el-select :disabled="mode == 'look'" v-model="form.roomId" placeholder="请选择">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in roomList"
                    :key="index"
                  ></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="7">
              <el-form-item label="电话" prop="phone">
                <el-input :disabled="mode == 'look'" v-model="form.phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="邮箱" prop="email">
                <el-input :disabled="mode == 'look'" v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <div style="width:60%;">
            <el-form-item label="简介" prop="intro">
              <el-input :disabled="mode == 'look'" type="textarea" v-model="form.intro"></el-input>
            </el-form-item>
          </div>

          <div style="width:60%;">
            <el-form-item label="地址" prop="addr">
              <el-input :disabled="mode == 'look'" type="textarea" v-model="form.addr"></el-input>
            </el-form-item>
          </div>

          <div style="width:100%;">
            <p style="color: #606266;padding-left: 58px;">上传图片</p>
            <div style="width:100%;padding:30px 58px;display:flex;align-items: center;">
              <el-image  v-if="mode == 'update' && preImg != ''"   style="width: 140px; height: 140px;margin-right:10px;" :src="form.imgUrl" :preview-src-list="srcList"></el-image>
              <el-upload
                v-if="mode != 'look'"
                :action="upUrl"
                :headers = "upHeader"
                name="upSignFile"
                list-type="picture-card"
                :auto-upload="true"
                :on-change="fileChange"
                :on-exceed="onExceed"
                :limit="1"
                :disabled="mode == 'look'"
                :file-list="fileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :on-error="uploadErr"
              >
                <i class="el-icon-plus"></i>
              </el-upload>

               <el-image
                 v-if="mode == 'look'"
                 style="width: 100px; height: 100px"
                 :src="form.imgUrl"
                 :preview-src-list="srcList">
              </el-image>
            </div>
          </div>



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
export default {
  props: {},
  data() {
    var validatePhone = (rule, value, callback) => {
      if (!/^1[34578]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码!"));
      }
    };
    return {
      mode: "",
      loading: false,
      currentPage: 1, //当前页
      size: 5, //每页展示条数
      totals: 1, //总条数
      multipleSelection: [], //批量选择列表
      tableData: [
        // {
        //   id: "0",
        //   roomId: "335",
        //   city: "都匀",
        //   phone: "13595026341",
        //   email: "2225942@qq.com",
        //   intro: "1",
        //   addr: "1",
        //   file: "",
        //   imgUrl:''
        // }
      ],
      // --------------------------------------------------------------------------------------------------------
     role:'',
     upUrl:'',
     upHeader:{},
      srcList:[],
      fileList: [],
      preImg:'',
      dialogImageUrl: "",
      dialogVisible: false,
      show1: false,
      roomList: [],
      cityList: [],
      form: {
        roomId: "",
        city: "",
        cityId:'',
        phone: "",
        email: "",
        intro: "",
        addr: "",
        file: "",
        imgUrl: ""
      },
      rules: {
        phone: [
          { required: true, message: "请输入电话号码", trigger: "blur" }
          // { validator: validatePhone, trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  created() {
    this.upUrl = this.$url.upUrl  //初始化上传地址
    this.role = sessionStorage.getItem('userType')

    this.getApplyList();
    this.getCity()

    // 上传图片需加上token
    this.upHeader = {
      Authorization:localStorage.getItem('token')
    }
  },
  methods: {
    //查询法律咨询列表
    getApplyList() {
      const that = this;
      that.loading = true;
      that.$http
        .axios({
          method: "get",
          url: that.$url.lawConsult.getList,
          params: {
            addressNumber: sessionStorage.getItem('userType') == 3?null:sessionStorage.getItem('unitId'),  //管理员查询需加上归属单位编码
            page: that.currentPage,
            limit: that.size
          }
        })
        .then(function(res) {
          console.log("法律咨询列表", res);
          that.loading = false;
          that.tableData = [];
          if (res.data.code == 200) {
            that.totals = res.data.totals;
            res.data.data.forEach(val => {
              that.tableData.push({
                id: val.id,
                roomId: val.roomNumber,
                city: val.city,
                cityId: val.addressNumber,
                phone: val.phone,
                email: val.email,
                intro: val.introduce,
                addr: val.address,
                imgUrl: val.imgUrl
              });
            });
          }
        })
    },
    //批量删除
    delMore() {
      const that = this;
      if (that.multipleSelection.length == 0) {
        that.$message.warning("请选择需要删除的记录！");
        return false;
      }

      that.loading = true;
      let arr = [];
      that.multipleSelection.forEach(val => {
        arr.push(val.id);
      });

      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.delMore,
          params: {
            ids: arr.join(",")
          }
        })
        .then(function(res) {
          console.log("批量删除", res);
          if (res.data.code == 200) {
            that.getApplyList();
            that.$message.success("删除成功！");
          }
        })
    },
    //查看详情
    lookDetail(val) {
      this.mode = "update";
      this.form = val;
      this.preImg = val.imgUrl
      this.srcList = [val.imgUrl];
      // this.fileList = [val.imgUrl]
      this.show1 = true;
    },

    //点击表格多选框触发函数
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //点击分页触发函数
    handleCurrentChange(val) {
      this.getApplyList();
    },
    // -------------------------------------------------------------------------------------------------------------------
   //初始化地区选择下拉框下拉数据
   getCity(){
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.getCity,
          params: {
          }
        })
        .then(function(res) {
          console.log("获取行政单位", res);
          that.cityList = []
          if (res.data.code == 200) {
            // 添加一级行政单位
              res.data.data.forEach(val=>{
                   that.cityList.push({
                     name:val.institutionalName,
                     value:val.id
                   })
              })

            //添加二级行政单位
              res.data.data[0].children.forEach(val=>{
                   that.cityList.push({
                     name:val.institutionalName,
                     value:val.id
                   })
              })
          }
        })
    },
    selectChange(e){
      this.cityList.forEach(val => {
        if(e == val.value){
           this.form.city = val.name;
           this.form.cityId = val.value;
        }

      });
    },
    //添加按钮触发事件
    add() {
      this.mode = "add";
      this.form = {
        roomId: "",
        city: "",
        cityId: sessionStorage.getItem('userType') == 3?'':sessionStorage.getItem('unitId'),   //管理员新增时候不可选择区县  所以要初始化
        phone: "",
        email: "",
        intro: "",
        addr: "",
        file: "",
        imgUrl: ""
      };
      this.show1 = true;
    },
    update(val) {
      this.mode = "update";
      this.form = val;
      this.show1 = true;
    },
    // 上传图片成功回调函数
    uploadSuccess(e) {
      console.log(e);
      this.preImg = ''
      this.form.imgUrl = `${this.$url.imgUrl}${e.data.split('\\').pop()}`;
    },
    // 上传图片失败回调函数
    uploadErr(e) {
      console.log(e);
    },
    //新增数据
    onSubmit() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.add,
          params: {
            city: sessionStorage.getItem('userType') == 3?that.form.city:that.tableData[0].city,
            addressNumber: that.form.cityId,
            phone: that.form.phone,
            roomNumber: that.form.roomId,
            email: that.form.email,
            introduce: that.form.intro,
            address: that.form.addr,
            imgUrl: that.form.imgUrl
          }
        })
        .then(function(res) {
          console.log("新增法律咨询", res);
          if (res.data.code == 200) {
            that.getApplyList();
            that.form = {
              roomId: "",
              city: "",
              phone: "",
              email: "",
              intro: "",
              addr: "",
              file: "",
              imgUrl: ""
            };
            that.fileList=[]
            that.$message.success("新增成功！");
          }
        })
    },
    //修改数据
     onSubmit1() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.lawConsult.update,
          params: {
            id:that.form.id,
            city: sessionStorage.getItem('userType') == 3?that.form.city:that.tableData[0].city,
            addressNumber: that.form.cityId,
            phone: that.form.phone,
            roomNumber: that.form.roomId,
            email: that.form.email,
            introduce: that.form.intro,
            address: that.form.addr,
            imgUrl: that.form.imgUrl
          }
        })
        .then(function(res) {
          console.log("修改法律咨询", res);
          if (res.data.code == 200) {
            that.getApplyList();
            that.$message.success("修改成功！");
          }
        })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.imgUrl = "";
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //只可上传一张图片  超出限制触发回调函数   提示
    onExceed() {
      console.log("超出限制");
      this.$message.error("只能上传一张图片哦,如需修改请先删除图片~");
    },
    //重置表单
    reset() {
      this.$refs.form.resetFields();
      this.fileList = [];
    },
    fileChange(file, filelist) {
      console.log(file);
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

/* ------------------------------------------------ */

.lawTitle {
  font-size: 15px;
  font-weight: bold;
  padding: 20px 2.5% 0;
  width: 100%;
  height: 37px;
  box-sizing: border-box;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 10px;
  white-space: nowrap;
}

.marginRight {
  margin-right: 20px;
}

.ad_row1 {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  padding: 0 2.5%;
}

.ad_row2 {
  width: 95%;
}

.ad_row3 {
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/deep/ .el-checkbox__inner {
  border: 1px solid rgba(190, 190, 190);
}

/deep/ .dlg .el-image-viewer__wrapper {
  top: 8%;
}
</style>
