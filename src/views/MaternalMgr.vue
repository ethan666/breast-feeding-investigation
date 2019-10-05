<template>
  <div class="content">
    <a-row class="action-line">
      <a-col :span="20">
        <a-form layout="inline" :form="form">
          <a-form-item label="住院号">
            <a-input v-decorator="['userId']"></a-input>
          </a-form-item>
          <a-form-item label="产妇姓名">
            <a-input v-decorator="['userNameLike']" />
          </a-form-item>
          <!-- <a-form-item label="今日随访">
            <a-checkbox
              v-decorator="['isTodayFollowUp', { valuePropName: 'checked' }]"
            ></a-checkbox>
          </a-form-item>-->

          <a-form-item label="随访日期">
            <a-date-picker v-decorator="['todayFollowUpDay']" />
          </a-form-item>

          <a-form-item label="产后/术后三天">
            <a-date-picker v-decorator="['postpartum3day']" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="query">查询</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="reset">重置</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="4" class="add-btn">
        <a-button type="primary" @click="startAddBasicInfo">添加</a-button>
      </a-col>
    </a-row>
    <a-table
      bordered
      :rowKey="record => record.id"
      :columns="columns"
      :dataSource="data"
      :pagination="pagination"
      :loading="loading"
      :size="'small'"
      @change="handleTableChange"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="() => editHandler(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="() => surveyHandler(record.userId)">调查</a>
        <!-- <a-divider type="vertical" />
        <a href="javascript:;">随访</a>-->
        <a-divider type="vertical" />
        <a @click="() => deleteHandler(record.id)">删除</a>
      </span>
    </a-table>
    <basic-info-form-modal ref="basicInfoModalRef" @ok="addMaternalInfoOk" />
  </div>
</template>

<script>
import BasicInfoFormModal from "@/views/BasicInfoFormModal";
import { deleteMaternalReq, queryMaternalReq } from "@/api/maternal";
import { timeFtt } from "@/utils/time";
import { getDictTitleByValue } from "@/utils/dictUtil";
import { mapState, mapMutations } from "vuex";
import moment from "moment";
import { deepClone } from "@/utils/utils";

const columns = [
  {
    title: "姓名",
    dataIndex: "userName",
    align: "center",
    width: "10%"
  },
  {
    title: "年龄",
    dataIndex: "age",
    align: "center",
    width: "10%"
  },
  {
    title: "住院号",
    dataIndex: "userId",
    align: "center",
    width: "10%"
  },
  {
    title: "所在病区",
    dataIndex: "inpatientArea",
    align: "center",
    width: "10%",
    customRender: text => getDictTitleByValue(text, "inpatientArea")
  },
  {
    title: "入组时间",
    dataIndex: "checkInTime",
    align: "center",
    width: "10%",
    customRender: text => timeFtt(text, "yyyy-MM-dd")
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    align: "center",
    width: "10%"
  },
  {
    title: "教育程度",
    dataIndex: "education",
    align: "center",
    width: "10%",
    customRender: text => getDictTitleByValue(text, "educationLevels")
  },
  {
    title: "分娩方式",
    dataIndex: "deliveryWay",
    align: "center",
    width: "10%",
    customRender: text => getDictTitleByValue(text, "deliveryModes")
  },
  {
    title: "婚姻状况",
    dataIndex: "married",
    align: "center",
    customRender: text => getDictTitleByValue(text, "maritalStatus")
  },
  {
    title: "操作",
    key: "action",
    align: "center",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" }
  }
];

export default {
  name: "MaternalMgr",
  data() {
    return {
      data: [],
      columns,
      loading: false,
      pagination: {
        pageSize: 30,
        total: 0,
        showTotal: total => `共 ${total} 条`,
        current: 1
      },
      form: this.$form.createForm(this)
    };
  },
  computed: {
    ...mapState({
      current: state => state.query.current,
      userId: state => state.query.userId,
      userNameLike: state => state.query.userNameLike,
      todayFollowUpDay: state => state.query.todayFollowUpDay,
      postpartum3day: state => state.query.postpartum3day
    })
  },
  mounted() {
    this.pagination.current = this.current;

    const params = {};
    params.userId = this.userId;
    params.userNameLike = this.userNameLike;
    params.todayFollowUpDay = this.todayFollowUpDay;
    params.postpartum3day = this.postpartum3day;

    Object.keys(params).forEach(key => {
      if (params[key] === undefined) {
        delete params[key];
      }
    });

    const fields = deepClone(params);
    if (fields.todayFollowUpDay) {
      fields.todayFollowUpDay = moment(
        new Date(Number(fields.todayFollowUpDay))
      );
    }
    if (fields.postpartum3day) {
      fields.postpartum3day = moment(new Date(Number(fields.postpartum3day)));
    }

    this.form.setFieldsValue(fields);

    this.fetch(params);
  },
  methods: {
    ...mapMutations(["SET_CURRENT", "SET_OTHERS"]),
    async fetch(params = {}) {
      const payload = {};
      payload.userId = params.userId;
      payload.userNameLike = params.userNameLike;
      payload.todayFollowUpDay = params.todayFollowUpDay;
      payload.postpartum3day = params.postpartum3day;
      this.SET_OTHERS(payload);

      const { pageSize, current } = this.pagination;
      this.SET_CURRENT({ current });

      const newParams = {
        ...params,
        limit: pageSize,
        offset: (current - 1) * pageSize
      };
      const res = await queryMaternalReq(newParams);
      if (res.code === "200" && res.data) {
        this.data = res.data.users;
        this.pagination.total = res.data.totalCount;
      }
    },
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      this.pagination = pager;

      const params = {};
      params.userId = this.userId;
      params.userNameLike = this.userNameLike;
      params.todayFollowUpDay = this.todayFollowUpDay;
      params.postpartum3day = this.postpartum3day;

      Object.keys(params).forEach(key => {
        if (params[key] === undefined) {
          delete params[key];
        }
      });
      this.fetch(params);
    },
    query() {
      this.form.validateFields((err, values) => {
        if (!err) {
          if (values.todayFollowUpDay) {
            const time = values.todayFollowUpDay.valueOf();
            const date = new Date(time);

            values.todayFollowUpDay = date.setHours(0, 0, 0, 0);
          }
          if (values.postpartum3day) {
            const time = values.postpartum3day.valueOf();
            const date = new Date(time);

            values.postpartum3day = date.setHours(0, 0, 0, 0);
          }
          Object.keys(values).forEach(key => {
            if (values[key] === undefined) {
              delete values[key];
            }
          });
          this.pagination.current = 1;
          this.fetch(values);
        }
      });
    },
    reset() {
      this.form.resetFields();
      this.pagination.current = 1;
      this.fetch();
    },
    startAddBasicInfo() {
      this.$refs.basicInfoModalRef.showModal();
    },
    editHandler(record) {
      this.$refs.basicInfoModalRef.showModal(record);
    },
    addMaternalInfoOk() {
      this.fetch();
    },
    surveyHandler(userId) {
      this.$router.push({ path: `survey/${userId}` });
    },
    deleteHandler(id) {
      const _this = this;
      this.$confirm({
        title: "确定删除吗?",
        async onOk() {
          const res = await deleteMaternalReq({ id });
          if (res.code === "200") {
            // 删除后，刷新列表
            _this.fetch();
          }
        }
      });
    }
  },
  components: {
    BasicInfoFormModal
  }
};
</script>

<style lang="less" scoped>
.content {
  padding: 0 30px;
  .action-line {
    margin: 20px 0;
  }
}
.add-btn {
  text-align: right;
}
</style>
