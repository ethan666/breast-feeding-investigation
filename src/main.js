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
  Icon,
  notification
} from 'ant-design-vue'

Vue.use(Input)
Vue.use(Button)
Vue.use(Select)
Vue.use(Card)
Vue.use(Form)
Vue.use(Row)
Vue.use(Col)
Vue.use(Modal)
Vue.use(Table)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(notification)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
