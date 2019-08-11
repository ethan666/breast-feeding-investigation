import { loginReq } from "@/api/user";

/**
 * 登录用户
 */
const user = {
  state: {
    logined: false
  },

  mutations: {
    SET_LOGINED: (state, payload) => {
      const { logined } = payload;
      state.logined = logined;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginReq(userInfo)
          .then(response => {
            if (response.code === "200" && response.data === true) {
              commit("SET_LOGINED", { logined: true });
              resolve();
            } else {
              reject(response.message);
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
