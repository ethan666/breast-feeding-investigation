<template>
  <a-modal
    :visible="visible"
    title="入组确认"
    @cancel="cancelHandler"
    @ok="okHandler"
  >
    <a-form :form="form">
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="姓名">
        <a-input
          v-decorator="[
            'userName',
            { rules: [{ required: true, message: '姓名必填！' }] }
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="住院号">
        <a-input
          v-decorator="[
            'userId',
            { rules: [{ required: true, message: '住院号必填！' }] }
          ]"
        />
      </a-form-item>
      <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol" label="年龄">
        <a-input-number
          :min="1"
          v-decorator="[
            'age',
            { rules: [{ required: true, message: '年龄必填！' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="联系电话"
      >
        <a-input-number
          v-decorator="[
            'phone',
            { rules: [{ required: true, message: '联系电话必填！' }] }
          ]"
        />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="录入时间"
      >
        <a-date-picker
          v-decorator="['checkInTime', { initialValue: moment(Date.now()) }]"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { addUserReq } from "@/api/maternal";
import moment from "moment";

export default {
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      visible: false,
      moment
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    okHandler() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        debugger;
        if (!err) {
          values.checkInTime = values.checkInTime.valueOf();
          const res = await addUserReq(values);
          if (res.code === "200" && res.data === true) {
            this.visible = false;
            this.$emit("ok");
          }
        }
      });
    },
    cancelHandler() {
      this.visible = false;
    }
  }
};
</script>
