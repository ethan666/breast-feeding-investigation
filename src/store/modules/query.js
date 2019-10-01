/**
 * 查询参数
 */
const query = {
  state: {
    current: 1,
    userId: undefined,
    userNameLike: undefined,
    todayFollowUpDay: undefined,
    postpartum3day: undefined
  },

  mutations: {
    SET_CURRENT: (state, payload) => {
      const { current } = payload;
      state.current = current;
    },
    SET_OTHERS: (state, payload) => {
      Object.assign(state, payload);
    }
  }
};

export default query;
