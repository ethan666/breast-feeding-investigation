<template>
  <a-form :form="form" class="login-form" @submit="handleSubmit">
    <a-form-item>
      <a-input
        v-decorator="[
          'account',
          { rules: [{ required: true, message: '请输入用户名！' }] }
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码！' }] }
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button"
        >登录</a-button
      >
    </a-form-item>
  </a-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    ...mapActions(["Login"]),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.Login(values)
            .then(this.loginSuccess)
            .catch(this.requestFailed)
            .finally(() => {
              // state.loginBtn = false;
              console.log("login finally!");
            });
        }
      });
    },
    loginSuccess() {
      this.$router.push({ name: "home" });
      // 延迟 1 秒显示欢迎信息
      setTimeout(() => {
        this.$notification.success({
          message: "欢迎",
          description: `欢迎回来`
        });
      }, 1000);
    },
    requestFailed(err) {
      this.$notification["error"]({
        message: "错误",
        description:
          ((err.response || {}).data || {}).message ||
          "请求出现错误，请稍后再试",
        duration: 4
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login-form {
  max-width: 300px;
  height: 200px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
}
.login-form-forgot {
  float: right;
}
.login-form-button {
  width: 100%;
}
</style>
