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
        <p class="question-title">{{ tableName }}</p>
        <a-form :form="form">
          <a-form-item
            :labelCol="labelCol"
            :wrapperCol="wrapperCol"
            v-for="item in formItems"
            :key="item.questionId"
            :label="item.questionName"
          >
            <!-- 问题类型(10-选择题(单选) 11-选择题（多选） 20-填空题) -->
            <a-radio-group
              v-if="item.questionType === 10"
              v-decorator="[
                item.questionId,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `${item.questionName}必填！`
                    }
                  ]
                }
              ]"
            >
              <a-radio
                v-for="optionItem in item.questionItemVOList"
                :key="optionItem.questionItemId"
                :value="optionItem.questionItemId"
                >{{
                  optionItem.questionItemName +
                    "(分值:" +
                    optionItem.score +
                    ")"
                }}</a-radio
              >
            </a-radio-group>
            <a-checkbox-group
              v-else-if="item.questionType === 11"
              v-decorator="[
                item.questionId,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `${item.questionName}必填！`
                    }
                  ]
                }
              ]"
            >
              <a-row>
                <a-col
                  v-for="optionItem in item.questionItemVOList"
                  :key="optionItem.questionItemId"
                  :span="8"
                >
                  <a-checkbox :value="optionItem.questionItemId">
                    {{
                      optionItem.questionItemName +
                        "(分值:" +
                        optionItem.score +
                        ")"
                    }}
                  </a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
            <a-input
              class="input-short"
              v-else-if="item.questionType === 20 && item.suffix === undefined"
              v-decorator="[
                item.questionId,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `${item.questionName}必填！`
                    }
                  ]
                }
              ]"
            >
            </a-input>
            <a-input-number
              v-else-if="item.questionType === 20 && item.suffix"
              v-decorator="[
                item.questionId,
                {
                  rules: [
                    {
                      required: item.required,
                      message: `${item.questionName}必填！`
                    }
                  ]
                }
              ]"
            />
            <span class="ant-form-text" v-if="item.suffix">
              {{ item.suffix }}
            </span>
          </a-form-item>
        </a-form>
        <a-row>
          <a-col class="btn" :span="3" :offset="8">
            <a-button icon="save" @click="saveHandler">暂存</a-button>
          </a-col>
          <a-col class="btn" :span="3">
            <a-button
              icon="right"
              @click="
                () => {
                  saveHandler(true);
                }
              "
              >下一页</a-button
            >
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getQuestionnsReq, saveQuestionnaireReq } from "@/api/questions";
import { queryMaternalReq } from "@/api/maternal";

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
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      formItems: [],
      tableName: ""
    };
  },
  computed: {},
  mounted() {
    this.getBasicInfo();
    this.fetch(questionTableIds[blockIndex][tableIndex]);
  },
  methods: {
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
    },
    async getBasicInfo() {
      const params = { userId: this.userId, limit: 100, offset: 0 };
      const res = await queryMaternalReq(params);
      if (res.code === "200" && res.data) {
        this.basicInfo = res.data.users[0] || {};
      }
    },
    saveHandler(gotoNext = false) {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const askVOList = Object.keys(values)
            .filter(key => values[key] !== undefined)
            .map(key => {
              const newItem = { questionId: key };
              const temp = this.formItems.find(item => item.questionId === key);
              if (temp) {
                newItem.questionType = temp.questionType;
              }
              const { questionType } = newItem;
              if (questionType === 10) {
                // 单选题
                newItem.questionItemIds = [values[key]];
              }
              if (questionType === 11) {
                // 多选题
                newItem.questionItemIds = values[key];
              }
              if (questionType === 20) {
                newItem.issueResult = values[key];
              }
              return newItem;
            });

          const res = await saveQuestionnaireReq({
            askVOList,
            questionnaireId: questionTableIds[blockIndex][tableIndex],
            userId: this.userId
          });
          if (res.code === "200" && gotoNext) {
            //跳到下一题
            tableIndex++;
            if (tableIndex >= questionTableIds[blockIndex].length) {
              tableIndex = 0;
              blockIndex++;
              if (blockIndex >= questionTableIds.length) {
                // 问题回答完毕
                blockIndex = 0;
                return;
              }
            }
            this.fetch(questionTableIds[blockIndex][tableIndex]);
          }
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.survey {
  margin-bottom: 200px;
  .question-title {
    font-size: 16px;
    margin: 10px 20px 20px 20px;
  }
  .input-short {
    width: 200px;
  }
}
</style>
