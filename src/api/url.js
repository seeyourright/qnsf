const path = `http://139.9.249.249:8080`
const path1 = `http://139.9.249.249:8080`
// const path = `http://192.168.0.145:8080`
// const path1 = `http://192.168.0.145:8080`

const url = {
  login: `${path}/api/auth/oauth/token`, // 登录获取token
  // obs
  OBS_Path: `https://zhsf.obs.cn-east-3.myhuaweicloud.com/`, // 获取obs上传url
  // 用户
  User_List: `${path}/api/system-management/sysuser/select_user_all`, // 用户列表
  User_List_No_Admin: `${path}/api/system-management/sysuser/selectUserByUserType`, // 用户列表(不含管理员)
  User_One: `${path}/api/system-management/sysuser/select_user_one`, // 单个用户信息
  Add_User: `${path}/api/system-management/sysuser/insert_user`, // 添加用户
  Delete_User: `${path}/api/system-management/sysuser/delete_user_one`, // 删除用户
  Delete_User_Batch: `${path}/api/system-management/sysuser/deleteUserMore`, // 批量删除用户
  Give_User_Role: `${path}/api/system-management/sysuser/give_user_role`, // 赋予用户角色
  Update_User: `${path}/api/system-management/sysuser/update_user`, // 修改用户
  // 角色管理
  Role_List: `${path}/api/system-management/sysrole/selectRoleAll`, // 角色列表
  Add_Role: `${path}/api/system-management/sysrole/insertRole`, // 添加角色
  Update_Role: `${path}/api/system-management/sysrole/updateRole`, // 修改角色
  Delete_Role: `${path}/api/system-management/sysrole/deleteRole`, // 删除角色
  Role_By_User: `${path}/api/system-management/sysrole/selectRoleByUser`, // 根据用户查询角色
  Role_By_Id: `${path}/api/system-management/sysrole/selectRoleOne`, // 根据id查询角色
  // 权限管理
  Permission_List: `${path}/api/system-management/syspermission/getPermissionTree`, // 根据用户查询角色
  Add_Permission: `${path}/api/system-management/syspermission/insertPermission`, // 根据用户查询角色
  Update_Permission: `${path}/api/system-management/syspermission/updatePermission`, // 根据用户查询角色
  Delete_Permission: `${path}/api/system-management/syspermission/deletePermission`, // 根据用户查询角色
  Permission_By_User: `${path}/api/system-management/syspermission/getPermissionByUser`, // 根据用户查询角色
  // app管理
  App_List: `${path}/api/system-management/sysappversion/getAppALL`, // app列表
  Add_App: `${path}/api/system-management/sysappversion/insertApp`, // app添加
  Delete_App: `${path}/api/system-management/sysappversion/deleteAppMore`, // app删除
  Download_App: `${path}/api/system-management/static/app/`, // app下载
  // 单位管理
  Unit_List: `${path}/api/system-management/department/getAll`, // 单位列表
  Add_Unit: `${path}/api/system-management/department/insertDepartment`, // 单位添加
  Update_Unit: `${path}/api/system-management/department/updateDepartment`, // 单位修改
  Delete_Unit: `${path}/api/system-management/department/deleteDepartment`, // 单位删除
  // 房间管理
  Room_List: `${path}/api/system-management/room/getRoomAll`, // 房间列表
  Add_Room: `${path}/api/system-management/room/insertRoom`, // 房间添加
  Update_Room: `${path}/api/system-management/room/updateRoom`, // 房间修改
  Distribution_Room: `${path}/api/system-management/room/updateRoom2`, // 房间修改
  Delete_Room: `${path}/api/system-management/room/deleteRoom`, // 房间删除
  // 地区管理
  Area_All: `${path}/api/system-management/sysunit/getUnitAll`, // 地区列表
  Area_Tree: `${path}/api/system-management/sysunit/getUnitTree`, // 地区列表
  // tupian
  Img_Path: `${path}/api/rmtj/static/`,

  //banner
  Banner_List: `${path}/api/lawConsult/banner/findlist`, // banner列表
  Banner_By_Id: `${path}/api/lawConsult/banner/findbyid`, // banner根据id查询
  Add_Banner: `${path}/api/lawConsult/banner/add`, // banner添加
  Update_Banner: `${path}/api/lawConsult/banner/update`, // banner更新
  Delete_Banner: `${path}/api/lawConsult/banner/removes`, // banner批量删除

  // 司法所
  Judicial_List: `${path}/api/lawConsult/judicialOffice/findlist`, // 司法所列表
  Judicial_By_Id: `${path}/api/lawConsult/judicialOffice/findbyid`, // 司法所根据id查询
  Add_Judicial: `${path}/api/lawConsult/judicialOffice/add`, // 司法所添加
  Update_Judicial: `${path}/api/lawConsult/judicialOffice/update`, // 司法所更新
  Delete_Judicial: `${path}/api/lawConsult/judicialOffice/removes`, // 司法所批量删除

  doNotDelete: 'doNotDelete', // 别删
  // ----------------------------------ly---------------------------------------
  getUserInfo:`${path}/api/system-management/sysuser/select_user_one`,
  imgUrl:`${path1}/api/lawAid/static/`,
  upUrl:`${path1}/api/lawAid/lawAidApplyForm/upSignFile`,
  adjust:{
    getList:`${path}/api/rmtj/rmtj/selectReconcile`,
    delMore:`${path}/api/rmtj/rmtj/deleteReconcile`,
    getDetail:`${path}/api/rmtj/rmtj/selectReconcileOne`,
    updateDetail:`${path}/api/rmtj/rmtj/updateReconcile`,
    lookMorePeople:`${path}/api/rmtj/rmtj/selectMorYyrAndByyr`,
    imgUrl:`${path}/api/rmtj/static/`,
    downZip:`${path}/api/rmtj/rmtj/verifyMaterialDownloadZip`,
    tjyList:`${path}/api/system-management/sysuser/select_user_all`,
    roomList:`${path}/api/system-management/room/getRoomAll`,
    signatureUpload:`${path}/api/rmtj/rmtj/signatureUpload`,
    jgdm:`${path}/api/system-management/department/getAll`,
    signSecond:`${path}/api/rmtj/rmtj/checkSignature`
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
      update1:`${path1}/api/lawAid/lawAidInfo/update`,
      netFileAddr:`${path1}/api/lawAid/lawAidApplyFile/findlist`
  },
  lawConsult:{
    getList:`${path1}/api/lawConsult/lawConsultForm/findlist`,
    delMore:`${path1}/api/lawConsult/lawConsultForm/removes`,
    add:`${path1}/api/lawConsult/lawConsultForm/add`,
    update:`${path1}/api/lawConsult/lawConsultForm/update`,
    uploadPic:`${path1}/api/lawAid/lawAidApplyForm/upfile`,
    getCity:`${path}/api/system-management/sysunit/getUnitTree`
  }
}

export default url
