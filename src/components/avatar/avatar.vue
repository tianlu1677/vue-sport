<template>
  <div class="avatar-wrapper">
    <router-link :to="{path: `/accounts/${account.id}`}" tag="div">
      <div class="avatar">
        <div class="icon">
          <img :src="account.avatar_url" alt="" height="36" width="36">
        </div>
        <div class="content">
          <span class="nickname">{{account.nickname}}</span>
          <span class="desc">{{desc}}</span>
        </div>
      </div>
    </router-link>

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
    position: relative;
    .avatar {
      display: flex;
      .icon {
        flex: 0 0 36px;
        vertical-align: top;
        > img {
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        padding-left: 10px;
        .nickname {
          font-size: 13px;
          line-height: 20px;
          font-weight: bold;
        }
        .desc {
          margin: auto;
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
