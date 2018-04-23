<template>
  <router-link :to="{path: `/categories/${category.id}`}" exact>
    <div class="category-wrapper">
      <div class="content">
        <span>{{category.name}}</span>
      </div>
      <div class="background">
        <img :src="category.cover_url" width="100%" height="100%" alt="">
      </div>
  </div>
  </router-link>
</template>

<script>

  export default {
    name: 'category',
    props: {
      category: {
        type: Object
      }
    }
  }
</script>

<style scoped lang="scss">
  .category-wrapper {
    position: relative;
    box-sizing: border-box;
    border-radius: 10px;
    background: rgba(1, 1, 1, 0.4);
    .content {
      display: flex;
      width: 73px;
      height: 73px;
      overflow: hidden;
      span {
        margin: auto;
        font-size: 14px;
        font-weight: 700;
        color: $white;
      }
    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
</style>
