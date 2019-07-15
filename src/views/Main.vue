<template>
  <div class="main">
    <feed-head />
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
</template>

<script>
import FeedHead from "@/views/FeedHead";

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
      pagination: {}
    };
  },
  components: {
    FeedHead
  }
};
</script>
