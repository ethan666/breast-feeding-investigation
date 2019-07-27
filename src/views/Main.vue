<template>
  <div class="main">
    <feed-head />
    <div class="content">
      <a-row class="action-line">
        <a-col :span="16">
          <a-form layout="inline" :form="form">
            <a-form-item label="姓名"><a-input /></a-form-item>
            <a-form-item label="入院日期">
              <a-range-picker />
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit">查询</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :span="8">
          <a-button @click="startAddBasicInfo">添加</a-button>
        </a-col>
      </a-row>
      <a-table
        bordered
        :columns="columns"
        :dataSource="data"
        :pagination="pagination"
        :loading="loading"
        :size="'small'"
      >
        <span slot="action">
          <a href="javascript:;">浏览</a>
          <a-divider type="vertical" />
          <a href="javascript:;">编辑</a>
          <a-divider type="vertical" />
          <a href="javascript:;">
            随访
          </a>
        </span>
      </a-table>
    </div>
    <basic-info-form-modal ref="basicInfoModalRef" @ok="addMaternalInfoOk" />
  </div>
</template>

<script>
import FeedHead from "@/views/FeedHead";
import BasicInfoFormModal from "@/views/BasicInfoFormModal";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    sorter: true,
    width: "20%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "Gender",
    dataIndex: "gender",
    width: "20%"
  },
  {
    title: "Email",
    dataIndex: "email"
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

const list = [
  { name: "李明", gender: "0", email: "-" },
  { name: "张韶涵", gender: "1", email: "-" }
];

export default {
  data() {
    return {
      data: list,
      columns,
      loading: false,
      pagination: {},
      form: this.$form.createForm(this)
    };
  },
  methods: {
    startAddBasicInfo() {
      this.$refs.basicInfoModalRef.showModal();
    },
    addMaternalInfoOk() {}
  },
  components: {
    FeedHead,
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
</style>
