<template>
  <router-link :to="{path: categoryPath}" exact class="category-wrapper" :class="categorySize" tag="div">
    <div class="content">
      <span>{{category.name}}</span>
    </div>
    <div class="background">
      <img :src="category.cover_url" width="100%" height="100%" alt="">
    </div>
  </router-link>
</template>

<script>
  export default {
    name: 'category',
    props: {
      category: {
        type: Object,
      },
      size: {
        type: String,
        default: 'normal'
      }
    },
    computed: {
      categorySize() {
        return this.size === 'normal' ? 'normal-size' : 'middle-size'
      },
      categoryPath() {
        let path = `/categories/${this.category.id}`
        if (this.category.id === 0) {
          path = '/categories'
        }
        return path
      }
    },
    watch: {},

    methods: {}
  }
</script>

<style scoped lang="scss">
  .category-wrapper {
    position: relative;
    box-sizing: border-box;
    background: rgba(1, 1, 1, 0.4);
    display: inline-block;
    border-radius: 10px;
    .content {
      text-align: center;
      font-size: 14px;
      span {
        text-align: center;
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
      > img {
        border-radius: 10px;
      }
    }
  }

  .normal-size {
    width: 73px;
    height: 73px;
    line-height: 73px;
  }

  .middle-size {
    width: 65px;
    height: 65px;
    line-height: 65px;
  }
</style>
