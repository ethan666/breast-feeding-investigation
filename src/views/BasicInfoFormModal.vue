<template>
  <a-modal
    :visible="visible"
    :maskClosable="false"
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
            {
              rules: [
                { required: true, message: '住院号必填！' },
                { pattern: /^[0-9]*$/, message: '请输入数字！' }
              ]
            }
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
        label="所在病区"
      >
        <a-select
          v-decorator="[
            'inpatientArea',
            { rules: [{ required: true, message: '所在病区必填！' }] }
          ]"
        >
          <a-select-option
            v-for="item in dicts.inpatientArea"
            :key="item.value"
            :value="item.value"
            >{{ item.title }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="入组时间"
      >
        <a-date-picker
          v-decorator="[
            'checkInTime',
            {
              initialValue: moment(Date.now()),
              rules: [{ required: true, message: '入组时间必填！' }]
            }
          ]"
        />
      </a-form-item>
      <!-- <a-form-item
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
        label="文化程度"
      >
        <a-input v-decorator="['education']" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="婚姻状况"
      >
        <a-input v-decorator="['married']" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="产前身高"
      >
        <a-input-number v-decorator="['height']" />
      </a-form-item>
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        label="产前体重"
      >
        <a-input-number v-decorator="['weight']" />
      </a-form-item>-->
    </a-form>
  </a-modal>
</template>

<script>
import { addMaternalReq, editMaternalReq } from "@/api/maternal";
import dicts from "@/config/dicts";
import moment from "moment";

let mode; //0：增加模式，1：编辑模式
let tRecord;
export default {
  name: "BasicInfoFormModal",
  data() {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      visible: false,
      moment,
      dicts
    };
  },
  methods: {
    showModal(record) {
      if (record) {
        mode = 1;
      } else {
        mode = 0;
      }
      tRecord = record;
      this.visible = true;
      this.$nextTick(() => {
        this.form.resetFields();
        if (mode === 1) {
          const { userName, userId, age, inpatientArea, checkInTime } = record;
          const values = {
            userName,
            userId,
            age,
            inpatientArea,
            checkInTime: moment(new Date(checkInTime))
          };
          this.form.setFieldsValue(values);
        }
      });
    },
    okHandler() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          values.checkInTime = values.checkInTime.valueOf();
          if (mode === 1) {
            values.id = tRecord.id;
          }
          const req = mode === 0 ? addMaternalReq : editMaternalReq;
          const res = await req(values);
          if (res.code === "200") {
            this.visible = false;
            this.form.resetFields();
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
