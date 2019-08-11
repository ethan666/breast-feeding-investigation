import { addMaternalReq } from "@/api/maternal";

/**
 * 产妇
 */
const maternal = {
  state: {},

  mutations: {
    SET_LOGINED: (state, value) => {
      state.logined = value;
    }
  },

  actions: {
    // 产妇基本信息分页查询
    QueryMaternalList({ commit }, info) {},

    // 添加产妇基本信息
    AddMaternalBasicInfo({ commit }, info) {
      return new Promise((resolve, reject) => {
        addMaternalReq(info)
          .then(response => {
            if (response.code === "200" && response.data === true) {
              // commit("SET_LOGINED", true);
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
