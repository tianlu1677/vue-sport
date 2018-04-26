<template>
  <router-link :to="{path: '/topics/new'}" tag="div">
    <div class="icon-block">
      <div class="content">
        <i :class="icon"></i>
        <span class="text" v-if="text">{{text}}</span>
        <span class="count" v-if="count">{{count}}</span>
      </div>
    </div>
  </router-link>
</template>

<script>

  export default {
    name: "new-topic-icon",
    components: {

    },
    props: {
      icon: {
        type: String,
        default: 'icon-write'
      },
      text: {
        type: String,
        default: ''
      },
      count: {
        type: String,
        default: ''
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
        margin: auto 11px;
        font-size: 11px;
      }
      .count {
        margin: auto 5px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>

