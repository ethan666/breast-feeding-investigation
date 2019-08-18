import axios from "axios";
import router from "@/router";
import { VueAxios } from "./axios";
import notification from "ant-design-vue/es/notification";

// 创建 axios 实例
const service = axios.create({
  baseURL: "http://47.111.125.9:8080", // api base_url
  timeout: 6000 // 请求超时时间
});

const err = error => {
  if (error.response) {
    const { response } = error;
    if (response.status === 404) {
      notification.warning({
        message: "404 Not Found",
        description: data.message
      });
    }
  }
  return Promise.reject(error);
};

// request interceptor
// service.interceptors.request.use(config => {
//   const token = Vue.ls.get(ACCESS_TOKEN);
//   if (token) {
//     config.headers["Access-Token"] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
//   }
//   return config;
// }, err);

// response interceptor
service.interceptors.response.use(response => {
  if (response.status === 200) {
    const { data } = response;
    const { code } = data;
    if (code === "400") {
      notification.warning({
        message: "参数错误",
        description: data.message
      });
    } else if (code === "401") {
      notification.warning({
        message: "登陆帐号密码错误",
        description: data.message
      });
    } else if (code === "500") {
      notification.warning({
        message: "系统异常",
        description: data.message
      });
    } else if (code === "301") {
      router.push({ name: "login" });
      notification.info({
        message: "请重新登录",
        description: data.message
      });
    } 
    return response.data;
  }
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
