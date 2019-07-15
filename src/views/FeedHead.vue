<template>
  <div class="head">
    <div class="title">母乳喂养调查</div>
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<script>
import { dateFtt } from "@/utils/time";

export default {
  data() {
    return {};
  },
  computed: {
    currentTime() {
      return dateFtt(new Date(), "yyyy-MM-dd");
    }
  }
};
</script>

<style lang="scss" scoped>
.head {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  padding: 10px 20px;
  height: 60px;
  background: #3b4c5c;

  .title {
    display: inline-block;
    margin: 0 10px;
    height: 40px;
    line-height: 40px;
  }
  .time {
    display: inline-block;
    margin: 0 10px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
