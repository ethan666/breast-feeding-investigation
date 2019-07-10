import api from "./index";
import axios from "axios";

/**
 * login func
 * parameter: {
 *     username: '',
 *     password: '',
 * }
 * @param parameter
 * @returns {*}
 */
export function login(parameter) {
  return axios({
    url: api.Login,
    method: "post",
    data: parameter
  });
}
