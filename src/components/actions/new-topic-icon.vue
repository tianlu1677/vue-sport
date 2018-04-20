<template>
  <router-link :to="{path: '/topics/new'}" tag="div" class="icon-block">
    <div class="icon">
      <span class="icon-write"></span>
      <span class="text">写心得</span>
    </div>
  </router-link>
</template>

<script>
  export default {
    name: "new-topic-icon"
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
  }
</style>

