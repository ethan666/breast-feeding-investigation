const api = {
  /** 用户相关 */
  loginApi: "/api/mrwy/login",

  /** 产妇相关 */
  addMaternalApi: "/api/mrwy/user/add",
  editMaternalApi: "/api/mrwy/user/modify",
  queryMaternalApi: "/api/mrwy/users/page/query",
  deleteMaternalApi: "/api/mrwy/users/delete",

  /** 调查表信息获取带回答 */
  getQuestionnsApi: "/api/mrwy/getQuestionnaireWithAsks",
  saveQuestionnaireApi: "/api/mrwy/saveQuestionnaire"
};
export default api;
