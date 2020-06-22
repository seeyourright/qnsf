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
            <el-button type="text" size="small" @click="update(scope.row)">修改</el-button>
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
        layout="prev, pager, next, jumper"
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
              <el-form-item label="视讯房间号" prop="roomId">
                <el-select :disabled="mode == 'look'" v-model="form.roomId" placeholder="请选择">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in roomList"
                    :key="index"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="县/市" prop="city">
                <el-select :disabled="mode == 'look'" v-model="form.city" placeholder="请选择">
                  <el-option
                    :label="item"
                    :value="item"
                    v-for="(item,index) in cityList"
                    :key="index"
                  ></el-option>
                </el-select>
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
              <el-input  :disabled="mode == 'look'" type="textarea" v-model="form.intro"></el-input>
            </el-form-item>
          </div>

          <div style="width:60%;">
            <el-form-item label="地址" prop="addr">
              <el-input :disabled="mode == 'look'" type="textarea" v-model="form.addr"></el-input>
            </el-form-item>
          </div>

          <div style="width:100%;">
            <p style="color: #606266;padding-left: 58px;">上传图片</p>
            <div style="width:100%;padding:30px 58px;">
              <el-upload
                action
                list-type="picture-card"
                :auto-upload="false"
                :on-change="fileChange"
                :on-exceed="onExceed"
                :limit="1"
                :disabled="mode == 'look'"
                :file-list = 'fileList'
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
            </div>
          </div>

          

          <el-form-item v-if="mode == 'add'">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="reset">重置</el-button>
          </el-form-item>
          <el-form-item v-if="mode == 'update'">
            <el-button type="primary" @click="onSubmit">确认修改</el-button>
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
      currentPage: 1, //当前页
      size: 10, //每页展示条数
      totals: 50, //总条数
      multipleSelection: [], //批量选择列表
      tableData: [
        {
          id: "0",
          roomId: "335",
          city: "都匀",
          phone: "13595026341",
          email: "2225942@qq.com",
          intro: "1",
          addr: "1",
          file: "",
        }
      ],
      // --------------------------------------------------------------------------------------------------------
      fileList:[],
      dialogImageUrl: "",
      dialogVisible: false,
      show1: false,
      roomList: ["001", "002", "003", "004", "005"],
      cityList: ["都匀市", "独山县", "平塘县"],
      form: {
        roomId: "",
        city: "",
        phone: "",
        email: "",
        intro: "",
        addr: "",
        file: "",
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
  methods: {
    add() {
      this.mode = "add";
      this.form = {
        roomId: "",
        city: "",
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
      console.log(val);
      this.mode = 'update'
      this.form = val
      this.show1 = true
    },
    //查询人民调解申请列表
    getApplyList() {
      const that = this;
      // that.$http({
      //     method: "post",
      //     url: that.url.sys.login,
      //     params: {
      //       loginName: that.status,
      //       pwd: that.condition,
      //       page:that.currentPage,
      //       size:that.size
      //     }
      //   })
      //   .then(function(response) {})
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    //下拉框change事件
    selectChange(e) {
      this.currentPage = 1;
      this.getApplyList();
    },
    //批量删除
    delMore() {
      console.log("159");
    },
    //查看详情
    lookDetail(val) {
      this.mode = 'look'
      this.form = val
      this.srcList = [val.imgUrl]
      this.show1 = true
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
    onExceed() {
      console.log("超出限制");
      this.$message.error('只能上传一张图片哦,如需修改请先删除图片~');
    },
    reset() {
      this.$refs.form.resetFields();
      this.fileList = []
    },
    fileChange(file, filelist) {
      console.log(file);
      this.form.file = file
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

/deep/ .dlg .el-image-viewer__wrapper{
    top: 8%;
}
</style>
