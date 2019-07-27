import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");

import {
  LocaleProvider,
  Input,
  InputNumber,
  Button,
  Select,
  Card,
  Form,
  Row,
  Col,
  Modal,
  Table,
  Checkbox,
  Divider,
  Icon,
  notification,
  DatePicker
} from "ant-design-vue";

import store from "./store";

Vue.use(LocaleProvider);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Button);
Vue.use(Select);
Vue.use(Card);
Vue.use(Form);
Vue.use(Row);
Vue.use(Col);
Vue.use(Modal);
Vue.use(Table);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Divider);
Vue.use(DatePicker);
Vue.use(notification);

Vue.prototype.$notification = notification;

Vue.config.productionTip = false;

// 判断是否登录状态，如果不是跳转到登录页面
// router.beforeEach((to, from, next) => {
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
