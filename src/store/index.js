import Vue from "vue";
import Vuex from "vuex";

import maternal from "./modules/maternal";
import user from "./modules/user";
import query from "./modules/query";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    maternal,
    user,
    query
  },
  state: {},
  mutations: {},
  actions: {}
});
