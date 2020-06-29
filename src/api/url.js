// const path = `http://192.168.0.15:8080`
// const path = `http://192.168.1.155:9001`
const path = `http://192.168.0.127:8080`
const path1 = `http://192.168.0.145:8080`

const url = {
  login: `${path}/api/auth/oauth/token`, // 登录获取token
  // 用户
  User_List: `${path}/api/system-management/sysuser/select_user_all`, // 用户列表
  User_One: `${path}/api/system-management/sysuser/select_user_one`, // 单个用户信息
  Add_User: `${path}/api/system-management/sysuser/insert_user`, // 添加用户
  Delete_User: `${path}/api/system-management/sysuser/delete_user_one`, // 删除用户
  Give_User_Role: `${path}/api/system-management/sysuser/give_user_role`, // 赋予用户角色
  Update_User: `${path}/api/system-management/sysuser/update_user`, // 修改用户
  // app管理
  App_List: `${path}/api/system-management/sysappversion/getAppALL`, // app列表
  Add_App: `${path}/api/system-management/sysappversion/insertApp`, // app添加
  Delete_App: `${path}/api/system-management/sysappversion/deleteAppMore`, // app删除
  Download_App: `${path}/api/system-management/sysappversion/appDownload`, // app下载

  doNotDelete: 'doNotDelete', // 别删
  imgUrl:`${path1}/api/lawAid/static/`,
  upUrl:`${path1}/api/lawAid/lawAidApplyForm/upSignFile`,
  adjust:{
    getList:`${path}/api/rmtj/rmtj/selectReconcile`,
  },
  lawHelp:{
      getList:`${path1}/api/lawAid/lawAidApplyForm/findlist`,
      delMore:`${path1}/api/lawAid/lawAidApplyForm/removes`,
      getDetail:`${path1}/api/lawAid/lawAidApplyForm/findbyid`,
      subRes:`${path1}/api/lawAid/lawAidApplyForm/update`,
      expWord:`${path1}/api/lawAid/createWord/exportSellPlan`,
      downFile: `${path1}/api/lawAid/lawAidApplyForm/downloadFile`,
      // ---------------------------------------------------------
      getList1:`${path1}/api/lawAid/lawAidInfo/findlist`,
      delMore1:`${path1}/api/lawAid/lawAidInfo/removes`,
      add1:`${path1}/api/lawAid/lawAidInfo/add`,
      getDetail1:`${path1}/api/lawAid/lawAidInfo/findById`,
      update1:`${path1}/api/lawAid/lawAidInfo/update`
  },
  lawConsult:{
    getList:`${path1}/api/lawConsult/lawConsultForm/findlist`,
    delMore:`${path1}/api/lawConsult/lawConsultForm/removes`,
    add:`${path1}/api/lawConsult/lawConsultForm/add`,
    uploadPic:`${path1}/api/lawAid/lawAidApplyForm/upfile`,
    getCity:`${path}/api/system-management/sysunit/getUnitList`
  }
}

export default url
