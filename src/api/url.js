const path = `http://139.9.249.249:8080`
// const path = `http://116.63.63.200:8080`
// const path = `http://192.168.0.145:8080`

const url = {
  login: `${path}/api/auth/oauth/token`, // 登录获取token
  // obs
  OBS_Path: `https://zhsf.obs.cn-east-3.myhuaweicloud.com/`, // 获取obs上传url
  // 天气
  Get_Weather: `${path}/api/community/weather/test`,
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
  // 组织架构
  Organization_Children: `${path}/api/system-management/sysOrganizationUnit/findUserAndOrg`, //获取子部门和所属用户
  Organization_Tree: `${path}/api/system-management/sysOrganizationUnit/findlist`, // 获取部门树形结构
  Organization_Update: `${path}/api/system-management/sysOrganizationUnit/updateOrganization`, // 修改部门信息
  Organization_User: `${path}/api/system-management/sysOrganizationUnit/findForUser`, // 获取部门用户
  Organization_User_Move: `${path}/api/system-management/sysOrganizationUnit/updateUser`, // 用户移动到其他部门
  Organization_User_Remove: `${path}/api/system-management/sysOrganizationUnit/removeUser`, // 用户移动到其他部门
  Organization_User_Add: `${path}/api/system-management/sysOrganizationUnit/addUser`, // 部门添加用户
  Organization_Find_User: `${path}/api/system-management/sysOrganizationUnit/findUser`, // 查找用户
  Organization_Add: `${path}/api/system-management/sysOrganizationUnit/addOrganization`, // 新增部门
  Organization_Remove: `${path}/api/system-management/sysOrganizationUnit/removeOrganization`, // 新增部门
  Organization_See: `${path}/api/system-management/sysOrganizationUnit/findOrganizationPermissionToYou`, // 自己可以查看的组织
  Organization_Seen: `${path}/api/system-management/sysOrganizationUnit/findOrganizationPermissionYouTo`, // 可以查看自己的组织
  Organization_Update_Seen: `${path}/api/system-management/sysOrganizationUnit/updateOrganizationPermission`, // 修改自己可以查看的组织
  Organization_Update_See: `${path}/api/system-management/sysOrganizationUnit/updateOrganizationPermissionYouTo`, // 修改可以查看自己的组织
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
  //  法治政府
  Government_Information_List: `${path}/api/lawConsult/legalGovernment/findlist`, //  法治政府资讯列表
  Add_Government_Information: `${path}/api/lawConsult/legalGovernment/add`,  //  法治政府资讯添加
  Update_Government_Information: `${path}/api/lawConsult/legalGovernment/update`, //  法治政府资讯修改
  Delete_Government_Information: `${path}/api/lawConsult/legalGovernment/removes`, //  法治政府资讯删除
  Government_Information_By_Id: `${path}/api/lawConsult/legalGovernment/findbyid`, //  法治政府资讯根据id查询
  //  法治宣传
  Propaganda_List: `${path}/api/lawConsult/lawPropaganda/findlist`, //  法治宣传列表
  Add_Propaganda: `${path}/api/lawConsult/lawPropaganda/add`,  //  法治宣传添加
  Update_Propaganda: `${path}/api/lawConsult/lawPropaganda/update`, //  法治宣传修改
  Delete_Propaganda: `${path}/api/lawConsult/lawPropaganda/removes`, //  法治宣传删除
  Propaganda_By_Id: `${path}/api/lawConsult/lawPropaganda/findbyid`, //  法治宣传根据id查询

  // 司法所
  Judicial_List: `${path}/api/lawConsult/judicialOffice/findlist`, // 司法所列表
  Judicial_By_Id: `${path}/api/lawConsult/judicialOffice/findbyid`, // 司法所根据id查询
  Add_Judicial: `${path}/api/lawConsult/judicialOffice/add`, // 司法所添加
  Update_Judicial: `${path}/api/lawConsult/judicialOffice/update`, // 司法所更新
  Delete_Judicial: `${path}/api/lawConsult/judicialOffice/removes`, // 司法所批量删除

  //  法治学堂
  School_Live_List: `${path}/api/fzxt/zhibo/selectAll`, //  法治学堂直播列表
  School_Live_By_Id: `${path}/api/fzxt/zhibo/selectOne`, //  法治学堂直播根据id查询
  Add_School_Live: `${path}/api/fzxt/zhibo/add`, //  法治学堂直播添加
  Update_School_Live: `${path}/api/fzxt/zhibo/update`, //  法治学堂直播修改
  Delete_School_Live: `${path}/api/fzxt/zhibo/delete`, //  法治学堂直播批量删除

  School_Lived_List: `${path}/api/fzxt/FzxtJxsp/all`, //  法治学堂录播列表
  School_Lived_By_Id: `${path}/api/fzxt/FzxtJxsp/selectOne`, //  法治学堂录播根据id查询
  Add_School_Lived: `${path}/api/fzxt/FzxtJxsp/add`, //  法治学堂录播添加
  Update_School_Lived: `${path}/api/fzxt/FzxtJxsp/update`, //  法治学堂录播修改
  Delete_School_Lived: `${path}/api/fzxt/FzxtJxsp/delete`, //  法治学堂录播批量删除

  // 律师服务
  Law_Firm_List: `${path}/api/lawAid/lawyerServices/findlist`, // 律所列表
  Law_Firm_By_Id: `${path}/api/lawAid/lawyerServices/findById`, // 律所根据id查询
  Add_Law_Firm: `${path}/api/lawAid/lawyerServices/add`, // 律所添加
  Update_Law_Firm: `${path}/api/lawAid/lawyerServices/update`, // 律所更新
  Delete_Law_Firm: `${path}/api/lawAid/lawyerServices/removes`, // 律所批量删除

  Lawyer_List: `${path}/api/lawAid/lawyerManagement/findlist`, // 律师列表
  Lawyer_By_Id: `${path}/api/lawAid/lawyerManagement/findById`, // 律师根据id查询
  Add_Lawyer: `${path}/api/lawAid/lawyerManagement/add`, // 律师添加
  Update_Lawyer: `${path}/api/lawAid/lawyerManagement/update`, // 律师更新
  Delete_Lawyer: `${path}/api/lawAid/lawyerManagement/removes`, // 律师批量删除

  Law_Order_List: `${path}/api/lawAid/lawyerOrder/findlist`, // 律所订单列表
  Law_Order_By_Id: `${path}/api/lawAid/lawyerOrder/findById`, // 律所订单根据id查询
  Add_Law_Order: `${path}/api/lawAid/lawyerOrder/add`, // 律所订单添加
  Update_Law_Order: `${path}/api/lawAid/lawyerOrder/update`, // 律所订单更新
  Delete_Law_Order: `${path}/api/lawAid/lawyerOrder/removes`, // 律所订单批量删除
  Law_Order_Download_file: `${path}/api/lawAid/lawyerOrder/downloadFile`, // 律所订单材料下载

  Law_Blacklist_List: `${path}/api/lawAid/lawyerBlacklist/findlist`, // 律所黑名单列表
  Law_Blacklist_By_Id: `${path}/api/lawAid/lawyerBlacklist/findById`, // 律所黑名单根据id查询
  Add_Law_Blacklist: `${path}/api/lawAid/lawyerBlacklist/add`, // 律所黑名单添加
  Update_Law_Blacklist: `${path}/api/lawAid/lawyerBlacklist/update`, // 律所黑名单更新
  Delete_Law_Blacklist: `${path}/api/lawAid/lawyerBlacklist/removes`, // 律所黑名单批量删除

  // 公证服务
  Notarial_Office_List: `${path}/api/fzxt/ggfw-gzc/selectAll`, // 公证处列表
  Notarial_Office_By_Id: `${path}/api/fzxt/ggfw-gzc/selectOne`, // 公证处根据id查询
  Add_Notarial_Office: `${path}/api/fzxt/ggfw-gzc/add`, // 公证处添加
  Update_Notarial_Office: `${path}/api/fzxt/ggfw-gzc/update`, // 公证处更新
  Delete_Notarial_Office: `${path}/api/fzxt/ggfw-gzc/delete`, // 公证处批量删除

  Notarial_Order_List: `${path}/api/fzxt/ggfw-order/selectAll`, // 公证处订单列表
  Notarial_Order_By_Id: `${path}/api/fzxt/ggfw-order/selectOne`, // 公证处订单根据id查询
  Add_Notarial_Order: `${path}/api/fzxt/ggfw-order/add`, // 公证处订单添加
  Update_Notarial_Order: `${path}/api/fzxt/ggfw-order/update`, // 公证处订单更新
  Delete_Notarial_Order: `${path}/api/fzxt/ggfw-order/delete`, // 公证处订单批量删除
  Notarial_Order_Download_file: `${path}/api/fzxt/ggfw-order/download`, // 公证处订单材料下载

  // 司法鉴定
  Appraisal_Office_List: `${path}/api/lawAid/appraisalOffice/findlist`, // 鉴定所列表
  Appraisal_Office_By_Id: `${path}/api/lawAid/appraisalOffice/findById`, // 鉴定所根据id查询
  Add_Appraisal_Office: `${path}/api/lawAid/appraisalOffice/add`, // 鉴定所添加
  Update_Appraisal_Office: `${path}/api/lawAid/appraisalOffice/update`, // 鉴定所更新
  Delete_Appraisal_Office: `${path}/api/lawAid/appraisalOffice/removes`, // 鉴定所批量删除

  Appraisal_Order_List: `${path}/api/lawAid/appraisalOrder/findlist`, // 鉴定所订单列表
  Appraisal_Order_By_Id: `${path}/api/lawAid/appraisalOrder/findById`, // 鉴定所订单根据id查询
  Add_Appraisal_Order: `${path}/api/lawAid/appraisalOrder/add`, // 鉴定所订单添加
  Update_Appraisal_Order: `${path}/api/lawAid/appraisalOrder/update`, // 鉴定所订单更新
  Delete_Appraisal_Order: `${path}/api/lawAid/appraisalOrder/removes`, // 鉴定所订单批量删除
  Appraisal_Order_Download_file: `${path}/api/lawAid/appraisalOrder/downloadFile`, // 律所订单材料下载

  Appraisal_Person_List: `${path}/api/lawAid/appraisalPerson/findlist`, // 鉴定所人员列表
  Appraisal_Person_By_Id: `${path}/api/lawAid/appraisalPerson/findById`, // 鉴定所人员根据id查询
  Add_Appraisal_Person: `${path}/api/lawAid/appraisalPerson/add`, // 鉴定所人员添加
  Update_Appraisal_Person: `${path}/api/lawAid/appraisalPerson/update`, // 鉴定所人员更新
  Delete_Appraisal_Person: `${path}/api/lawAid/appraisalPerson/removes`, // 鉴定所人员批量删除

  // 行政执法
  Law_Enforcement_Agencies_List: `${path}/api/xzzf/zfs/selectAll`, // 执法所列表
  Law_Enforcement_Agencies_By_Id: `${path}/api/xzzf/zfs/selectById`, // 执法所根据id查询
  Add_Law_Enforcement_Agencies: `${path}/api/xzzf/zfs/add`, // 执法所增加
  Update_Law_Enforcement_Agencies: `${path}/api/xzzf/zfs/update`, // 执法所修改
  Delete_Law_Enforcement_Agencies: `${path}/api/xzzf/zfs/delete`, // 执法所删除

  Law_Enforcement_Officer_List: `${path}/api/xzzf/ryjs/selectAll`, // 执法人员列表
  Law_Enforcement_Officer_By_Id: `${path}/api/xzzf/ryjs/selectOne`, // 执法人员根据id查询
  Add_Law_Enforcement_Officer: `${path}/api/xzzf/ryjs/add`, // 执法人员增加
  Update_Law_Enforcement_Officer: `${path}/api/xzzf/ryjs/update`, // 执法人员修改
  Delete_Law_Enforcement_Officer: `${path}/api/xzzf/ryjs/delete`, // 执法人员删除

  // 行政复议
  Administrative_Reconsideration_List: `${path}/api/lawConsult/administrativeReview/findlist`, // 行政复议列表
  Administrative_Reconsideration_By_Id: `${path}/api/lawConsult/administrativeReview/findbyid`, // 行政复议根据id查询
  Add_Administrative_Reconsideration: `${path}/api/lawConsult/administrativeReview/add`, // 行政复议增加
  Update_Administrative_Reconsideration: `${path}/api/lawConsult/administrativeReview/update`, // 行政复议修改
  Delete_Administrative_Reconsideration: `${path}/api/lawConsult/administrativeReview/removes`, // 行政复议删除

  // 消息
  Message_List: `${path}/api/message/sysMsg/findlist`, // 消息列表
  Message_By_Id: `${path}/api/message/sysMsg/findById`, // 消息根据id查询
  Add_Message: `${path}/api/message/sysMsg/add`, // 消息增加
  Update_Message: `${path}/api/message/sysMsg/update`, // 消息修改
  Delete_Message: `${path}/api/message/sysMsg/removes`, // 消息删除
  Add_Push_Message: `${path}/api/message/sysMsg/addPush`, // 消息删除
  PeopleMsg_List: `${path}/api/message/sysMsg/findPeopleMsg`, // 查询留言回复

  //问卷
  Questionnaire_List: `${path}/api/fzxt/opinion-polls/selectAll`, // 问卷列表
  Questionnaire_By_Id: `${path}/api/fzxt/opinion-polls/selectOne`, // 问卷根据id查询
  Add_Questionnaire: `${path}/api/fzxt/opinion-polls/add`, // 问卷增加
  Update_Questionnaire: `${path}/api/fzxt/opinion-polls/update`, // 问卷修改
  Delete_Questionnaire: `${path}/api/fzxt/opinion-polls/delete`, // 问卷删除

  Questionnaire_Answer_List: `${path}/api/fzxt/answer/selectAll`, // 答案列表
  Questionnaire_Answer_By_Id: `${path}/api/fzxt/answer/selectOne`, // 答案根据id查询
  Questionnaire_Answer_Download: `${path}/api/fzxt/answer/download`,// 答案下载
  // 群众来信

  // 人民调解
  Adjust_Committee: `${path}/api/system-management/unitTown/findlist`, // 人民调解委员会列表
  doNotDelete: 'doNotDelete', // 别删
  // ----------------------------------ly---------------------------------------
  getUserInfo:`${path}/api/system-management/sysuser/select_user_one`,
  imgUrl:`${path}/api/lawAid/static/`,
  upUrl:`${path}/api/lawAid/lawAidApplyForm/upSignFile`,
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
      getList:`${path}/api/lawAid/lawAidApplyForm/findlist`,
      delMore:`${path}/api/lawAid/lawAidApplyForm/removes`,
      getDetail:`${path}/api/lawAid/lawAidApplyForm/findbyid`,
      subRes:`${path}/api/lawAid/lawAidApplyForm/update`,
      expWord:`${path}/api/lawAid/createWord/exportSellPlan`,
      downFile: `${path}/api/lawAid/lawAidApplyForm/downloadFile`,
      // ---------------------------------------------------------
      getList1:`${path}/api/lawAid/lawAidInfo/findlist`,
      delMore1:`${path}/api/lawAid/lawAidInfo/removes`,
      add1:`${path}/api/lawAid/lawAidInfo/add`,
      getDetail1:`${path}/api/lawAid/lawAidInfo/findById`,
      update1:`${path}/api/lawAid/lawAidInfo/update`,
      netFileAddr:`${path}/api/lawAid/lawAidApplyFile/findlist`
  },
  lawConsult:{
    getList:`${path}/api/lawConsult/lawConsultForm/findlist`,
    delMore:`${path}/api/lawConsult/lawConsultForm/removes`,
    add:`${path}/api/lawConsult/lawConsultForm/add`,
    update:`${path}/api/lawConsult/lawConsultForm/update`,
    uploadPic:`${path}/api/lawAid/lawAidApplyForm/upfile`,
    getCity:`${path}/api/system-management/sysunit/getUnitTree`
  }
}

export default url
