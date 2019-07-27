import { addUserReq } from "@/api/maternal";

const maternal = {
  state: {},

  mutations: {
    SET_LOGINED: (state, value) => {
      state.logined = value;
    }
  },

  actions: {
    // 添加产妇基本信息
    AddMaternalBasicInfo({ commit }, info) {
      return new Promise((resolve, reject) => {
        addUserReq(info)
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

export default maternal;
