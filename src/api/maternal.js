import api from "./index";
import { axios } from "@/utils/request";
import qs from "querystring";

/**
 * 添加产妇
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function addMaternalReq(parameter) {
  return axios({
    url: api.addMaternalApi,
    method: "post",
    data: parameter
  });
}

/**
 * 删除产妇
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function deleteMaternalReq(parameter) {
  return axios({
    url: api.deleteMaternalApi,
    method: "post",
    data: parameter
  });
}

/**
 * 产妇基本信息分页查询
 * @param parameter
 * @returns {*}
 */
export function queryMaternalReq(parameter) {
  return axios({
    url: `${api.queryMaternalApi}?${qs.stringify(parameter)}`,
    method: "get"
  });
}
