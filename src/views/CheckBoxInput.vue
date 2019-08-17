<template>
  <div>
    <a-checkbox></a-checkbox>
    <a-input />
  </div>
</template>

<script>
export default {
  props: ["value"],
  data() {
    return {
      checked: false
    };
  },
  watch: {
    value(newV, oldV) {}
  }
};
</script>
