import api from "./index";
import { axios } from "@/utils/request";
import qs from "querystring";

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function loginReq(parameter) {
  return axios({
    url: api.loginApi,
    method: "post",
    data: parameter,
    transformRequest: [
      function(data) {
        data = qs.stringify(data);
        return data;
      }
    ],
    headers: { "Content-Type": "application/x-www-form-urlencoded" }
  });
}
