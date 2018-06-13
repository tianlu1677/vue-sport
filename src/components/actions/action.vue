<template>
  <div class="icon-block" @click="clickAction">
    <div class="content">
      <i :class="icon"></i>
      <span class="text">{{count > 0 ? count : ''}}</span>
      <span class="text" v-if="desc">{{desc}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "action",
    props: {
      icon: {
        type: String,
        default: ''
      },
      desc: {
        type: String
      },
      count: {
        type: Number
      }
    },
    methods: {
      clickAction() {
        this.$emit('handleClick')
      }
    }
  }
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
        font-size: 12px;
        line-height: 21px;
        min-width: 7px;
      }
    }
  }
</style>
