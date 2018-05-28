<template>
  <div class="empty">
    <cube-loading :size="24" class="loading" v-show="loading"></cube-loading>
    <div class="content" v-if="!loading">
      <img src="../../common/images/logo.jpg" class="logo"/>
      <p>{{message}}</p>
    </div>
  </div>
</template>

<script>

  export default {
    name: "empty",
    props: {
      message: {
        type: String,
        default: '还没有内容哦'
      }
    },
    data() {
      return {
        loading: true
      }
    },
    created() {
      setTimeout(() => {
        this.loading = false
      }, 800)
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .empty {
    display: flex;
    height: inherit;
    width: inherit;
    justify-content: center;
    text-align: center;
    .loading {
      position: relative;
      text-align: center;
    }
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
