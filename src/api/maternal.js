import api from "./index";
import { axios } from "@/utils/request";

/**
 * 添加产妇
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function addUserReq(parameter) {
  return axios({
    url: api.addUserApi,
    method: "post",
    data: parameter
  });
}
