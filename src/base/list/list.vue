<template>
  <div class="list-wrapper">
    <div class="list">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "list"
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $white;
    .list {
      padding: 17.5px 17.5px;
      height: 90%;
    }
  }
</style>
