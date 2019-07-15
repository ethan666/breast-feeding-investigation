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
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const res = await this.Login(values);
          console.log(res);
          // this.$router.push({ name: "home" });
        }
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
