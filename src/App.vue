<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="scss">
  .cube-scroll-content {
    display: inline-block;
    position: relative;
    z-index: 1;
    width: 230px;

  }

  .cube-scroll-list {
    margin: 0 auto;
    width: 130px;
  }

  .cube-scroll-item {
    display: inline-block;
    width: 130px;

  }
</style>
