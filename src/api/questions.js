import api from "./index";
import { axios } from "@/utils/request";
import qs from "querystring";

/**
 * 调查表信息获取带回答
 * @param parameter
 * @returns {*}
 */
export function getQuestionnsReq(parameter) {
  return axios({
    url: `${api.getQuestionnsApi}?${qs.stringify(parameter)}`,
    method: "get"
  });
}

/**
 * 调查表信息获取带回答
 * @param parameter
 * @returns {*}
 */
export function saveQuestionnaireReq(parameter) {
  return axios({
    url: api.saveQuestionnaireApi,
    method: "post",
    data: parameter
  });
}
