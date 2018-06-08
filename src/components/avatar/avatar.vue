<template>
  <div class="avatar-wrapper">
    <div class="avatar" @click="goAccount">
      <div class="cover">
        <img :src="account.avatar_url" :alt="account.nickname">
      </div>

      <div class="content">
        <span class="nickname">{{account.nickname}}</span>
        <span class="desc">{{desc}}</span>
        <span class="desc" v-if="time && !desc">{{time}}</span>
      </div>
    </div>
    <div class="right-content">
      <slot name="right">
        <div @click="handleFollow"
             v-if="showFollowButton"
        >
          <span class="follow-text" v-if="!account.followed">关注</span>
          <span class="followed-text" v-if="account.followed">已关注</span>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {followAccount, unfollowAccount} from "@/api/account_api";

  export default {
    name: "avatar",
    components: {},
    props: {
      desc: {
        type: String,
      },
      time: {
        type: String
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
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount'
      }),
      showFollowButton() {
        return false//this.currentAccount && this.currentAccount.id !== this.account.id
      }
    },

    methods: {
      handleFollow() {
        if (this.account.followed) {
          this._unfollowAccount()
          this.account.followed = false
          const toast = this.$createToast({
            txt: '已取消关注',
            type: 'correct',
            mask: false,
            time: 1000
          })
          toast.show()
          // 弹框显示已关注
        } else {
          this._followAccount()
          this.account.followed = true
          const toast = this.$createToast({
            txt: '已关注',
            type: 'correct',
            mask: false,
            time: 500
          })
          toast.show()
        }
      },

      async _followAccount() {
        await followAccount(this.account.id)
      },

      async _unfollowAccount() {
        await unfollowAccount(this.account.id)
      },
      goAccount() {
        this.$router.push({path: `/accounts/${this.account.id}`})
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
      width: 50%;
      .cover {
        flex: 0 0 36px;
        @include extend-click();
        > img {
          height: 36px;
          width: 36px;
          border-radius: 50%;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        margin: auto auto auto 10px;
        font-size: 0;
        .nickname {
          font-size: 12px;
          font-weight: 400;
        }
        .desc {
          margin-top: 6px;
          font-size: 10px;
          color: $gray;
        }
      }

    }
    .right-content {
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
