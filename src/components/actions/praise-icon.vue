<template>
  <div class="icon-block">
    <div class="content">
      <i :class="icon"></i>
      <span class="text">{{count}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'praise-icon',
    props: {
      count: {
        type: Number,
        default: 0,
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
    computed: {
      icon() {
        return this.active ? 'icon-praise-solid' : 'icon-praise';
      },
    },
  };
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
        margin: auto 5px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>
