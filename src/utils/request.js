import Vue from "vue";
import axios from "axios";
import store from "@/store/index";
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
        description: response.message
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
  if (response.code === 400) {
    notification.warning({
      message: "参数错误",
      description: response.message
    });
  } else if (response.code === 401) {
    notification.warning({
      message: "登陆帐号密码错误",
      description: response.message
    });
  } else if (response.code === 500) {
    notification.warning({
      message: "系统异常",
      description: response.message
    });
  } else if (response.code === 301) {
    router.push({ name: "login" });
    notification.info({
      message: "请重新登录",
      description: response.message
    });
  } else if (response.code === 200) {
    notification.info({
      message: "提示",
      description: response.message
    });
  }
  return response.data;
}, err);

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, service);
  }
};

export { installer as VueAxios, service as axios };
