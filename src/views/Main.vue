<template>
  <div class="main">
    <feed-head />
    <router-view />
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
