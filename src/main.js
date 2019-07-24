import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import {
  Input,
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
  notification
} from "ant-design-vue";

import store from "./store";

Vue.use(Input);
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
Vue.use(notification);

Vue.config.productionTip = false;

// 判断是否登录状态，如果不是跳转到登录页面
// router.beforeEach((to, from, next) => {
// });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
