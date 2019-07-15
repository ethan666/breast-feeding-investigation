const api = {
  Login: "/api/mrwy/login",
  basicInfoQuery: "/api/mrwy/users/page/query",

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
