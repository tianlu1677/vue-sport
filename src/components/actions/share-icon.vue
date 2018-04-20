<template>
  <div class="icon-block">
    <div class="icon">
      <span class="icon-share"></span>
    </div>
    <span class="text">{{count}}</span>
  </div>

</template>

<script>
  export default {
    name: "share-icon",
    props: {
      count: {
        type: Number,
        default: 0
      }
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
      padding-right: 5px;
    }
    .text {
      font-size: 14px;
      line-height: 21px;
    }
  }
</style>
