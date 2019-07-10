import { login } from "@root/api/login";

const user = {
  state: {
    logined: false
  },

  mutations: {
    SET_LOGINED: (state, value) => {
      state.logined = value;
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then(response => {
            if (response.code === "200" && response.data === true) {
              commit("SET_LOGINED", true);
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
