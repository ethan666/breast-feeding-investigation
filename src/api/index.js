const api = {
  /** 用户相关 */
  loginApi: "/api/mrwy/login",

  /** 产妇相关 */
  addMaternalApi: "/api/mrwy/user/add",
  queryMaternalApi: "/api/mrwy/users/page/query",
  deleteMaternalApi: "/api/mrwy/users/delete",

  Logout: "/auth/logout",
  ForgePassword: "/auth/forge-password",
  Register: "/auth/register",
  twoStepCode: "/auth/2step-code",
  SendSms: "/account/sms",
  SendSmsErr: "/account/sms_err",
  // get my info
  UserInfo: "/user/info"
};
export default api;
