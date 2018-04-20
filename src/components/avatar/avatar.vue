<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      <img :src="account.avatar_url" alt="" height="36" width="36" style="border-radius: 50%">
      <div class="content">
        <span class="nickname">{{account.nickname}}</span>
        <span class="desc">{{desc}}</span>
      </div>
    </div>

    <div class="follow">
      <span class="follow-text">关注</span>
    </div>

  </div>
</template>

<script>
  export default {
    name: "avatar",
    props: {
      desc: {
        type: String,
        default: ''
      },
      account: {
        type: Object,
        default: function () {
          return {
            id: 0,
            nickname: '张三',
            avatar_url: ''
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .avatar-wrapper {
    height: 36px;
    display: flex;
    position: relative;
    .avatar {
      .content {
        display: inline-block;
        padding-left: 10px;
        .nickname {
          position: absolute;
          top: 0;
          vertical-align: text-top;
          font-size: 13px;
          line-height: 20px;
          font-weight: bold;
        }
        .desc {
          position: absolute;
          bottom: 0;
          font-size: 10px;
          color: $gray;
        }
      }

    }
    .follow {
      flex: 1;
      position: absolute;
      right: 0;
      top: 0;
      .follow-text {
        line-height: 36px;
        font-size: 13px;
        font-weight: bold;
        color: $blue;
      }
    }
  }
</style>
