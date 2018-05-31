<template>
  <div class="loading-wrapper">
    <cube-loading :size="24" class="loading">
      {{message}}
    </cube-loading>
  </div>
</template>

<script>
  export default {
    name: "loading",
    props: {
      message: {
        type: String,
        default: '还没有内容哦'
      }
    }
  }
</script>

<style scoped lang="scss">
  .loading-wrapper {
    display: flex;
    justify-content: center;
    text-align: center;
    height: 30px;
    margin: auto;
    .loading {
      margin: auto;
      position: relative;
      text-align: center;
    }
  }

</style>
