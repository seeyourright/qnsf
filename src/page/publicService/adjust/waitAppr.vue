<template>
  <!-- 待审批状态 -->
  <div class="step0">
    <!--------------------------------------- 线上调解 ------------------------------------------------->
    <div class="step0_up" v-if="role != 1 || status == 1 ">
      <!-- 审批拒绝显示内容 -->
      <div class="step0_up_no" v-if="upPass === false || (status == 1 && isUp === true)">
        <p class="add_key">拒绝原因</p>
        <el-input
          :disabled="status == 1"
          style="margin:10px 0 30px;"
          v-model="upReason"
          type="textarea"
          :rows="5"
        ></el-input>
      </div>
      <div class="step0_up_button" v-if="upPass === false && status == 0">
        <el-button type="danger" size="small" :loading="btnLoading" @click="applyRes('1')">提交</el-button>
        <el-button type="primary" size="small" @click="upPass = ''">返回上一步</el-button>
      </div>
      <!-- 审批通过显示内容 -->
      <div class="step0_up_yes" v-if="upPass === true && status == 0">
        <div class="step0_up_yes_item">
          <span class="add_key">选择调解员:</span>
          <el-select v-model="upPeople" placeholder="请选择" size="small" @change="upChange1">
            <el-option
              :value="item.id"
              v-for="(item,index) in upPeopleList"
              :key="index"
            >{{item.name}}</el-option>
          </el-select>
        </div>
        <div class="step0_up_yes_item">
          <span class="add_key">选择调解室:</span>
          <el-select v-model="upRoom" placeholder="请选择" size="small" @change="upChange2">
            <el-option
              :value="item.id"
              v-for="(item,index) in upRoomList"
              :key="index"
            >{{item.name}}</el-option>
          </el-select>
        </div>
        <div class="step0_up_yes_item">
          <span class="add_key">调解时间:</span>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            v-model="upTime"
            type="datetime"
            placeholder="选择调解时间"
          ></el-date-picker>
        </div>
      </div>
      <div class="step0_up_button" v-if="upPass === true && status == 0">
        <el-button type="danger" size="small" :loading="btnLoading" @click="applyRes('2')">提交</el-button>
        <el-button type="primary" size="small" @click="upPass = ''">返回上一步</el-button>
      </div>

      <!-- 线上审批按钮 -->
      <div class="step0_up_button" v-if="upPass === '' && isUp === true &&  status == 0">
        <el-button type="danger" size="small" @click="upPass = false">线上拒绝</el-button>
        <el-button type="primary" size="small" @click="upPass = true">线上通过</el-button>
      </div>
    </div>

    <!--------------------------------------------- 线下调解 ----------------------------------------------->
    <div class="step0_low" v-if="role == 1 || status == 1 ">
      <!-- 线下审批拒绝显示内容 -->
      <div class="step0_up_no" v-if="lowPass === false ||  (status == 1 && isUp === false)">
        <div class="step0_low_item">
          <span class="add_key">调解员:</span>
          <span class="add_value">{{obj.reconcileMan}}</span>
        </div>
        <div class="step0_low_item">
          <span class="add_key">调解时间:</span>
          <span class="add_value">无</span>
        </div>
        <div class="step0_low_item">
          <span class="add_key" style="width:72px;">调解地点:</span>
          <span class="add_value" style="white-space:nowrap;margin-right:10px;">无</span>
        </div>
        <p class="add_key">拒绝原因</p>
        <el-input
          :disabled="status == 1"
          style="margin:10px 0 30px;"
          v-model="lowReason"
          type="textarea"
          :rows="5"
        ></el-input>
      </div>
      <div class="step0_up_button" v-if="lowPass === false && status == 0">
        <el-button type="danger" size="small" :loading="btnLoading" @click="applyRes('1')">提交</el-button>
        <el-button type="primary" size="small" @click="lowPass = ''">返回上一步</el-button>
      </div>

      <!-- 线下审批通过显示内容 -->
      <div class="step0_up_no" v-if="lowPass === true  && status == 0 ">
        <div class="step0_low_item">
          <span class="add_key">调解员:</span>
          <span class="add_value">{{obj.reconcileMan}}</span>
        </div>
        <div class="step0_low_item">
          <span class="add_key">调解时间:</span>
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            size="small"
            v-model="lowTime"
            type="datetime"
            placeholder="选择调解时间"
          ></el-date-picker>
        </div>
        <div class="step0_low_item">
          <span class="add_key" style="width:72px;">调解地点:</span>
          <span
            class="add_value"
            style="white-space:nowrap;margin-right:10px;"
          >{{obj.applyForAddress}}</span>
          <div style="width:50%;">
            <el-input v-model="lowAddr" placeholder="输入详细地点" size="small"></el-input>
          </div>
        </div>
        <div class="step0_up_button">
          <el-button type="danger" size="small" :loading="btnLoading"  @click="applyRes('3')">提交</el-button>
          <el-button type="primary" size="small" @click="lowPass = ''">返回上一步</el-button>
        </div>
      </div>

      <!-- 线下审批按钮 -->
      <div class="step0_up_button" v-if="lowPass === '' && isUp === false && status == 0">
        <el-button type="danger" size="small" @click="lowPass = false">线下拒绝</el-button>
        <el-button type="primary" size="small" @click="lowPass = true">线下通过</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["upDown", "status", "rejReason", "obj", "role"],
  data() {
    return {
      btnLoading:false,
      isUp: true, //true线上审批  false 线下审批
      //线上审批
      upPass: "", //线上审批通过   线上审批拒绝
      upReason: "", //线上审批拒绝原因
      upPeople: "", //线上审批通过  分配调解员
      upPeopleId: "", //线上审批通过  分配调解员
      upPeopleList: [], //调解员列表
      upRoom: "", //线上审批通过  分配调解室
      upRoomId: "", //线上审批通过  分配调解室
      upRoomList: [], // 调解室列表
      upTime: "", //线上审批通过  分配调解时间

      //线下审批
      lowPass: "", //线上审批通过   线上审批拒绝
      lowReason: "", //线下审批拒绝原因
      lowTime: "", //线下调节时间
      lowAddr: "" //线下调解地点
    };
  },
  watch: {
    role(val) {
      this.role = val;
    },
    upDown(v) {
      this.isUp = v;
    },
    "obj.refuseReason"(v) {
      this.upReason = v;
      this.lowReason = v;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.isUp = this.upDown;
      console.log(this.role);
      if (this.obj.applyForStatus == 1) {
        this.upReason = this.obj.refuseReason;
        this.lowReason = this.obj.refuseReason;
      }
      this.getTJYlist(); //获取调解员列表
      this.getRoomList(); //获取调解室列表
      console.log(sessionStorage.getItem("unitId"));
    },
    getTJYlist() {
      const that = this;
      that.$http
        .axios({
          method: "post",
          url: that.$url.adjust.tjyList,
          params: {
            userType: "1"
          }
        })
        .then(function(res) {
          console.log("调解员列表", res);
          if (res.data.code == 200) {
            // that.$emit('res',res)
            that.upPeopleList = [];
            res.data.data.forEach(val => {
              that.upPeopleList.push({
                name: val.nickname,
                id: val.id
              });
            });
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    getRoomList() {
      const that = this;
      let param = {};
      if (
        sessionStorage.getItem("unitId") == "null" ||
        sessionStorage.getItem("unitId") == null
      ) {
        param = {
          roomStatus: 0
        };
      } else {
        param = {
          institutionalCode: sessionStorage.getItem("unitId"),
          roomStatus: 0
        };
      }

      that.$http
        .axios({
          method: "post",
          url: that.$url.adjust.roomList,
          params: param
        })
        .then(function(res) {
          console.log("房间列表", res);
          if (res.data.code == 200) {
            // that.$emit('res',res)
            that.upRoomList = [];
            res.data.data.forEach(val => {
              that.upRoomList.push({
                name: val.roomNumber,
                id: val.roomNumber
              });
            });
            console.log(that.upRoomList);
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });
    },
    applyRes(res) {
      const that = this;
      if (
        that.isUp == true &&
        res == "2" &&
        (that.upPeople == "" || that.upRoom == "" || that.upTime == "")
      ) {
        that.$message.error("填写不能为空");
        return false;
      }

      if (that.isUp == true && res == "1" && that.upReason == "") {
        that.$message.error("请填写拒绝原因");
        return false;
      }

      if (
        that.isUp == false &&
        res == "2" &&
        (that.lowTime == "" || that.lowAddr == "")
      ) {
        that.$message.error("填写不能为空");
        return false;
      }

      if (that.isUp == false && res == "1" && that.lowReason == "") {
        that.$message.error("请填写拒绝原因");
        return false;
      }

      that.subResHttp(res);
    },
    subResHttp(res) {
      const that = this;
      let param = {};
      that.btnLoading = true
      if (that.isUp == true && res == 1) {
        param = {
          reservationNumber: that.obj.reservationNumber,
          id: that.obj.id,
          applyForStatus: 1,
          refuseReason: that.upReason,
          endTime: that.$util.getDateTime()
        };
      } else if (that.isUp == true && res == 2) {
        param = {
          reservationNumber: that.obj.reservationNumber,
          id: that.obj.id,
          applyForStatus: 2,
          reconcileMan: that.upPeople,
          reconcileId: that.upPeopleId,
          reconcileRoom: that.upRoom,
          reconcileTime: that.upTime
        };
      } else if (that.isUp == false && res == 1) {
        param = {
          reservationNumber: that.obj.reservationNumber,
          id: that.obj.id,
          applyForStatus: 1,
          refuseReason: that.lowReason
          //   endTime:that.$util.getDateTime()
        };
      } else if (that.isUp == false && res == 3) {
        param = {
          reservationNumber: that.obj.reservationNumber,
          id: that.obj.id,
          applyForStatus: 3,
          reconcileTime: that.lowTime,
          reconcileAddress: that.obj.applyForAddress + that.lowAddr
        };
      }
      console.log(param);
      //   return false
      that.$http
        .axios({
          method: "post",
          url: that.$url.adjust.updateDetail,
          params: param
        })
        .then(function(res) {
          console.log("更新人民调解信息", res);
           that.btnLoading = false
          if (res.data.code == 200) {
            that.$emit("res", res);
          }
        })
        .catch(function(error) {
          that.loading = false;
          console.log(error);
        });

      //
    },
    upChange1(e) {
      console.log(e);
      const that = this;
      that.upPeopleList.forEach(val => {
        if (val.id == e) {
          that.upPeople = val.name;
          that.upPeopleId = val.id;
        }
      });
    },
    upChange2(e) {
      const that = this;
      //  that.upPeople = that.upPeopleList.filter(val=>{
      //      return val.id == e.detail.value
      //  })
      that.upRoomList.forEach(val => {
        if (val.id == e) {
          that.upRoom = val.name;
          that.upRoomId = val.id;
        }
      });
    }
  }
};
</script>

<style scoped>
/* 待审批状态 */
.step0 {
  width: 100%;
  margin-top: 40px;
}

.step0_up {
  width: 100%;
}

.step0_up_button {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}

/deep/.step0_up_button .el-button:nth-child(1) {
  margin-right: 40px;
}

.step0_up_no {
  width: 100%;
}

.step0_up_yes {
  width: 100%;
  height: 50px;
  display: flex;
  /* justify-content: space-around; */
  align-items: center;
  margin-top: 40px;
  margin-bottom: 30px;
}

.step0_up_yes_item {
  width: 30%;
}

.add_key {
  font-size: 15px;
  font-weight: bold;
  margin-right: 3px;
}

/* 线下调解 */
.step0_low {
  width: 100%;
}

.step0_low_item {
  /* width: 50%; */
  height: 50px;
  display: flex;
  align-items: center;
}
</style>
