<template>
  <div class="icon-block">
    <div class="content">
      <i :class="icon"></i>
      <span class="text" v-if="text">{{text}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "icon-block",
    props: {
      icon: String,
      text: String
    }
  }
</script>

<style scoped lang="scss">
  .icon-block {
    position: relative;
    font-size: 0;
    height: 21px;
    .content {
      display: flex;
      font-size: 21px;
      .text {
        margin: auto 11px;
        font-size: 11px;
      }
      .count {
        margin: auto 11px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>
