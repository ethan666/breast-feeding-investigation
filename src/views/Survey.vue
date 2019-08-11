<template>
  <div class="survey">
    <a-row>
      <a-col :span="4">
        <a-card title="基本信息">
          <p>姓名：{{ basicInfo.userName }}</p>
          <p>年龄：{{ basicInfo.age }}</p>
          <p>住院号：{{ basicInfo.userId }}</p>
        </a-card>
      </a-col>
      <a-col :span="20">
        <a-form :form="form">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-for="item in formItems"
            :key="item.questionId"
            :label="item.questionName"
          >
            <component
              :is="getInputComponent(item.questionType)"
              v-decorator="[
                item.questionId,
                {
                  rules: [
                    { required: true, message: `${item.questionName}必填！` }
                  ]
                }
              ]"
            ></component>
          </a-form-item>
        </a-form>
        <a-row>
          <a-col class="btn" :span="6">
            <a-button icon="save">暂存</a-button>
          </a-col>
          <a-col class="btn" :span="6">
            <a-button icon="right">下一页</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { Input } from "ant-design-vue";
import { getQuestionnsReq } from "@/api/questions";

const questionTableIds = [
  ["T0", "A11", "A12", "A13", "A14", "A15"],
  ["B", "B8", "b11_2"],
  ["C0", "C4", "C5", "C6", "C7", "C8"],
  ["D0", "D8"],
  ["E0"],
  ["F0", "F3"],
  ["G0"]
];

let blockIndex = 0;
let tableIndex = 0;

export default {
  name: "Survey",
  props: ["userId"],
  data() {
    return {
      basicInfo: {},
      form: this.$form.createForm(this),
      labelCol: { span: 4 },
      wrapperCol: { span: 8 },
      formItems: [],
      tableName: ""
    };
  },
  computed: {},
  mounted() {
    this.fetch(questionTableIds[blockIndex][tableIndex]);
  },
  methods: {
    //问题类型(问题类型 0-板块 1-录入表 10-选择题(单选) 11-选择题（多选） 20-填空题 30-选择题答案 31-选择题之后的填空)
    getInputComponent(type) {
      // return Input;
      return Input;
    },
    async fetch(questionnaireId) {
      const res = await getQuestionnsReq({
        questionnaireId,
        userId: this.userId
      });
      if (res.code === "200" && res.data) {
        this.formItems = res.data.questionVOList;
        this.tableName = res.data.questionnaireName;
      } else {
        this.formItems = [];
        this.tableName = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.btn {
  text-align: center;
}
</style>
