<template>
  <div class="empty">
    <div class="content">
      <img src="../../common/images/logo.jpg" class="logo"/>
      <p>还没有内容哦</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "empty"
  }
</script>

<style scoped lang="scss">
  .empty {
    display: flex;
    height: inherit;
    width: inherit;
    justify-content: center;
    text-align: center;
    .content {
      flex: 1;
      line-height: inherit;
      .logo {
        flex: 1;
        height: 64px;
        width: 64px;
      }
      p {
        margin-top: 10px;
        font-size: 14px;
        color: $gray;
      }
    }

  }

</style>
