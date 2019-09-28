<template>
  <div class="main">
    <feed-head />
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import FeedHead from "@/views/FeedHead";

export default {
  components: {
    FeedHead
  }
};
</script>
