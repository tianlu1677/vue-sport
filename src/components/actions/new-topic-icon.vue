<template>
  <router-link :to="{path: '/topics/new'}" tag="div" class="icon-block">
    <div class="icon">
      <span class="icon-write"></span>
      <span class="text" v-if="text">{{text}}</span>
      <span class="count" v-if="count">{{count}}</span>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "new-topic-icon",
    props: {
      text: String,
      count: String
    }
  }
</script>

<style scoped lang="scss">
  .icon-block {
    display: flex;
    position: relative;
    font-size: 0;
    height: 21px;

    .icon {
      font-size: 21px;
      vertical-align: middle;
      position: relative;
    }
    .text {
      font-size: 11px;
    }
    .count {
      font-size: 14px;
      line-height: 21px;
    }
  }
</style>

