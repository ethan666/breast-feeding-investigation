<template>
  <div class="survey">
    <a-row>
      <a-col :span="4">
        <a-card title="基本信息">
          <p>姓名：{{ basicInfo.userName }}</p>
          <p>年龄：{{ basicInfo.age }}</p>
          <p>住院号：{{ basicInfo.userId }}</p>
          <p>电话号码：{{ basicInfo.phone }}</p>
          <p>分娩方式：{{ deliveyMode }}</p>
        </a-card>
      </a-col>
      <a-col :span="20">
        <a-row>
          <a-button
            v-for="(item, index) in questionTableIdsOneD"
            :key="index"
            class="table-btn"
            :class="{ 'selected-btn': index === tableIndex }"
            :title="titles[index]"
            @click="
              () => {
                gotoQuestionTable(item, index);
              }
            "
          >{{ item }}</a-button>
        </a-row>
        <p class="question-title">{{ tableName }}</p>
        <a-form :form="form" class="form">
          <a-form-item
            :labelCol="rowCol"
            :wrapperCol="rowCol"
            v-for="item in formItems"
            :key="item.questionId"
            :label="item.location+'. '+item.questionName"
            :hidden="!showFormItem(item.deliveyWay)"
            hasFeedback
          >
            <!-- 问题类型(10-选择题(单选) 11-选择题（多选） 20-填空题) -->
            <a-radio-group
              v-if="item.questionType === 10"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO
                    ? item.askVO.questionItemIds[0]
                    : undefined,
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
                @dblclick="event=>{dblclickHandler(item.questionId, event)}"
              >
                {{
                optionItem.questionItemName +
                "(分值:" +
                optionItem.score +
                ")"
                }}
              </a-radio>
            </a-radio-group>
            <a-checkbox-group
              v-else-if="item.questionType === 11"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO
                    ? item.askVO.questionItemIds
                    : undefined,
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
            <!-- 日期输入控件 -->
            <a-date-picker
              v-else-if="item.questionType === 20 && item.buttonType === 'DATE'"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO
                    ? moment(new Date(Number(item.askVO.issueResult)))
                    : undefined
                }
              ]"
            />
            <a-date-picker
              v-else-if="
                item.questionType === 20 && item.buttonType === 'DATETIME'
              "
              showTime
              format="YYYY-MM-DD HH:mm:ss"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO
                    ? moment(new Date(Number(item.askVO.issueResult)))
                    : undefined
                }
              ]"
            />
            <!-- 总分 -->
            <a-input
              class="input-short"
              v-else-if="
                item.questionType === 20 && item.questionId.includes('SUM')
              "
              read-only
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO ? item.askVO.issueResult : undefined
                }
              ]"
            />
            <a-input
              class="input-short"
              v-else-if="item.questionType === 20 && item.suffix === undefined"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO ? item.askVO.issueResult : undefined,
                  rules: [
                    {
                      required: item.required,
                      message: `${item.questionName}必填！`
                    }
                  ]
                }
              ]"
            />
            <a-input-number
              v-else-if="item.questionType === 20 && item.suffix"
              v-decorator="[
                item.questionId,
                {
                  initialValue: item.askVO ? item.askVO.issueResult : undefined,
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
              {{
              item.suffix
              }}
            </span>
          </a-form-item>
        </a-form>
        <a-row>
          <a-col class="btn" :span="3" :offset="8">
            <a-button
              type="primary"
              icon="save"
              @click="
                () => {
                  saveHandler(false);
                }
              "
            >暂存</a-button>
          </a-col>
          <a-col class="btn" :span="3">
            <a-button
              :disabled="tableIndex === 0"
              type="primary"
              icon="left"
              @click="
                () => {
                  saveHandler(-1);
                }
              "
            >上一页</a-button>
          </a-col>
          <a-col class="btn" :span="3">
            <a-button
              :disabled="tableIndex === questionTableIdsOneD.length - 1"
              type="primary"
              icon="right"
              @click="
                () => {
                  saveHandler(1);
                }
              "
            >下一页</a-button>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { getQuestionnsReq, saveQuestionnaireReq } from "@/api/questions";
import { queryMaternalReq } from "@/api/maternal";
import moment from "moment";
import notification from "ant-design-vue/es/notification";
import { getDictTitleByValue } from "@/utils/dictUtil";

const questionTableIds = [
  ["T0", "A11", "A12", "A13", "A14", "A15"],
  ["B", "B8", "b11_2"],
  ["C0", "C4", "C5", "C6", "C7", "C8"],
  ["D0", "D8"],
  ["E0"],
  ["F0", "F3"],
  ["G0"]
];

const modeIds = ["b11_2", "D0", "E0", "F0"];

// let blockIndex = 0;
// let tableIndex = 0;

export default {
  name: "Survey",
  props: ["userId"],
  data() {
    return {
      basicInfo: {},
      labelCol: { span: 7 },
      wrapperCol: { span: 12 },
      rowCol: { span: 24 },
      formItems: [],
      tableName: "",
      titles: [
        "产前基本信息表",
        "IOWA婴儿喂养态度量表",
        "母乳喂养自信心量表BSES",
        "焦虑量表",
        "爱丁堡产后抑郁量表EPDS",
        "调查表2-中文版母乳喂养自信心量表（调查对象：患者配偶）",
        "产后第一板块基本信息",
        "客观泌乳量评价",
        "术后疼痛情况",
        "剖宫术后第二板块C基本信息",
        "爱丁堡产后抑郁量表EPDS",
        "IOWA婴儿喂养态度量表",
        "母乳喂养自信心量表BSES",
        "IOWA婴儿喂养态度量表",
        "母乳喂养测量工具BAT",
        "产后第三板块D",
        "舌系带功能评估",
        "术后第四板块E",
        "随访板块G",
        "纯母乳喂养家人支持程度问卷",
        "随访板块G"
      ],
      questionnaireId: "",
      deliveyWay: 0, //表单中某一项是否需要展示
      moment,
      tableIndex: 0
    };
  },
  computed: {
    questionTableIdsOneD() {
      return [].concat.apply([], questionTableIds);
    },
    deliveyMode() {
      return getDictTitleByValue(this.basicInfo.deliveryWay, "deliveryModes");
    }
  },
  beforeCreate() {
    const _this = this;
    this.form = this.$form.createForm(this, {
      onValuesChange: (props, values) => {
        const total = this.formItems.find(item =>
          item.questionId.includes("SUM")
        );
        if (total && values[total.questionId] === undefined) {
          // 判断其他都填有值
          const obj = Object.assign({}, props.getFieldsValue(), values);
          delete obj[total.questionId];
          const undefinedItem = Object.keys(obj).find(
            key => obj[key] === undefined
          );
          if (!undefinedItem) {
            // 计算总分
            let score = 0;
            Object.keys(obj).forEach(key => {
              const tItem = _this.formItems.find(
                item => item.questionId === key
              );
              if (tItem) {
                const optionItem = tItem.questionItemVOList.find(
                  item => item.questionItemId === obj[key]
                );
                if (optionItem) {
                  score += optionItem.score;
                }
              }
            });
            const result = {};
            result[total.questionId] = score;
            props.setFieldsValue(result);
          }
        }

        // 判断顺产、剖宫产. B0
        if (values.B0 !== undefined) {
          if (values.B0 === "B0-1") {
            _this.deliveyWay = 1;
          } else if (values.B0 === "B0-2") {
            _this.deliveyWay = 2;
          }
        }
      }
    });
  },
  mounted() {
    // tableIndex = 0;
    this.getBasicInfo();
    this.fetch(this.questionTableIdsOneD[this.tableIndex]);
  },
  methods: {
    dblclickHandler(fieldName) {
      const data = {};
      data[fieldName] = null;
      this.form.setFieldsValue(data);
    },
    needLineFeed(label = "") {
      return label.length > 25;
    },
    reset() {
      this.deliveyWay = 0;
    },
    async fetch(questionnaireId) {
      this.reset();
      const res = await getQuestionnsReq({
        questionnaireId,
        userId: this.userId
      });
      if (res.code === "200" && res.data) {
        this.formItems = res.data.questionVOList;
        this.tableName = res.data.questionnaireName;
        this.questionnaireId = res.data.questionnaireId;

        window.scrollTo(0, 0);

        if (modeIds.indexOf(this.questionnaireId) !== -1) {
          if (!res.data.mode) {
            notification.info({
              message: "提示",
              description: "还没有填写“是顺产还是剖腹产”！"
            });
          } else {
            this.deliveyWay = res.data.mode;
          }
        }

        // 判断剖腹产初始值
        this.formItems.forEach(item => {
          if (item.questionId === "B0" && item.askVO) {
            if (item.askVO.questionItemIds[0] === "B0-1") {
              this.deliveyWay = 1;
            } else if (item.askVO.questionItemIds[0] === "B0-2") {
              this.deliveyWay = 2;
            }
          }
        });
      } else {
        this.formItems = [];
        this.tableName = "";
        this.questionnaireId = "";
      }
    },
    async getBasicInfo() {
      const params = { userId: this.userId, limit: 100, offset: 0 };
      const res = await queryMaternalReq(params);
      if (res.code === "200" && res.data) {
        this.basicInfo = res.data.users[0] || {};
      }
    },
    saveHandler(direction) {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (!err) {
          const askVOList = Object.keys(values)
            .filter(key => values[key] !== undefined)
            .map(key => {
              const newItem = { questionId: key };
              const temp = this.formItems.find(item => item.questionId === key);
              if (temp) {
                newItem.questionType = temp.questionType;
                newItem.buttonType = temp.buttonType;
              }
              const { questionType, buttonType } = newItem;
              if (questionType === 10) {
                // 单选题
                newItem.questionItemIds = [values[key]];
              } else if (questionType === 11) {
                // 多选题
                newItem.questionItemIds = values[key];
              } else if (questionType === 20) {
                if (buttonType === "DATETIME") {
                  newItem.issueResult = values[key].valueOf();
                } else if (buttonType === "DATE") {
                  const time = values[key].valueOf();
                  const date = new Date(time);

                  newItem.issueResult = date.setHours(0, 0, 0, 0);
                } else {
                  newItem.issueResult = values[key];
                }
              }
              return newItem;
            });

          const res = await saveQuestionnaireReq({
            askVOList,
            questionnaireId: this.questionTableIdsOneD[this.tableIndex],
            userId: this.userId
          });
          if (res.code === "200") {
            if (direction === 1) {
              //跳到下一个调查表
              this.tableIndex++;
              // if (this.tableIndex >= this.questionTableIdsOneD.length) {
              //   this.tableIndex = 0;
              //   return;
              // }
            } else if (direction === -1) {
              //跳到上一个调查表
              this.tableIndex--;
            } else {
              return;
            }
            this.fetch(this.questionTableIdsOneD[this.tableIndex]);
          }
        }
      });
    },
    gotoQuestionTable(questionnaireId, index) {
      this.tableIndex = index;
      this.fetch(questionnaireId);
    },
    showFormItem(deliveyWay) {
      return deliveyWay === 0 || deliveyWay === this.deliveyWay;
    }
  }
};
</script>

<style lang="less" scoped>
.survey {
  margin-bottom: 200px;
  .question-title {
    font-size: 18px;
    margin: 10px 20px 20px 20px;
    font-weight: 800;
  }
  .input-short {
    width: 200px;
  }
  .table-btn {
    margin: 8px;
  }
  .selected-btn {
    color: #40a9ff;
    background-color: #fff;
    border-color: #40a9ff;
  }
  .form {
    padding: 0 20px;
  }
}
</style>
