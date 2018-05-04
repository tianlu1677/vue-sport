<template>
  <div class="avatar-wrapper">
    <div class="avatar">
      <router-link :to="{path: `/accounts/${account.id}`}" tag="div" class="avatar">
        <div class="icon">
          <img :src="account.avatar_url" alt="" height="36" width="36">
        </div>
      </router-link>
      <div class="content">
        <span class="nickname">{{account.nickname}}</span>
        <span class="desc">{{desc}}</span>
      </div>
    </div>
    <div class="follow" @click="handleFollow">
      <span class="follow-text" v-if="!account.followed">关注</span>
      <span class="followed-text" v-else>已关注</span>
    </div>
  </div>
</template>

<script>
  import {followAccount, unfollowAccount} from "@/api/account_api";

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
    },

    methods: {
      handleFollow() {
        if (this.account.followed) {
          this._unfollowAccount()
          this.account.followed = false
        } else {
          this._followAccount()
          this.account.followed = true
        }
      },

      async _followAccount() {
        await followAccount(this.account.id)
      },

      async _unfollowAccount() {
        await unfollowAccount(this.account.id)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .avatar-wrapper {
    height: 36px;
    position: relative;
    .avatar {
      display: flex;
      .icon {
        flex: 0 0 36px;
        @include extend-click();
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
        @include extend-click();
        line-height: 36px;
        font-size: 13px;
        font-weight: bold;
        color: $blue;
      }
      .followed-text {
        @include extend-click();
        line-height: 36px;
        font-size: 13px;
        font-weight: bold;
        color: $gray;
      }
    }
  }
</style>
