<template>
  <div class="account-header">
    <div class="content-wrapper">
      <div class="cover">
        <img :src="account.avatar_url" :alt="account.id">
      </div>
      <div class="content">
        <h1 class="nickname">{{account.nickname}}</h1>
        <h2 class="uid">ID:{{account.uid}}</h2>
        <div class="numbers">
          <h2 class="praise-count">{{account.get_praises_count | format_number}}获赞数</h2>
          <h2 class="following-count">{{account.following_count | format_number}}关注数</h2>
          <h2 class="follower-count">{{account.followers_count | format_number}}粉丝数</h2>
        </div>
      </div>
    </div>

    <div class="extra">
      <div class="left">
        <span class="icon-gender-man item" v-show="account.gender === 'man'"></span>
        <span class="icon-gender-woman item" v-show="account.gender === 'woman'"></span>
        <span class="age item" v-show="account.age">{{account.age}}岁</span>
        <span class="city item" v-show="account.city">{{account.city}}</span>
      </div>
      <!--关注按钮-->
      <div class="follow-button" v-if="!showEdit">
        <div class="follow" :class="{active: account.followed}" @click="handleFollow">
          <span class="text" v-if="!account.followed">
            <i class="icon icon-topic-add-photo"></i>关注
          </span>
          <span class="text" v-else>已关注</span>
        </div>
      </div>
      <!--个人是显示-->
      <router-link to="/mine/edit" tag="div" class="edit-button" v-if="showEdit">
        <div class="follow" style="background-color: white">
          <i class="icon icon-topic-add-photo"></i>
          <span class="text">
            <i class="icon icon-pencel"></i>编辑
          </span>
        </div>
      </router-link>
    </div>
    <div class="intro">
      {{account.intro || '还没有填写个人简介'}}
    </div>

  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {followAccount, unfollowAccount} from "@/api/account_api";

  export default {
    name: "account-header",
    props: {
      account: {
        type: Object
      }
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount'
      }),
      showEdit() {
        if (!!this.currentAccount) {
          return this.account.id === this.currentAccount.id
        } else {
          return false
        }
      }
    },
    methods: {
      async handleFollow() {
        if (this.account.followed) {
          await unfollowAccount(this.account.id)
          this.account.followed = false
        } else {
          await followAccount(this.account.id)
          this.account.followed = true
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .account-header {
    position: relative;
    padding: 17.5px;
    .content-wrapper {
      display: flex;
      .cover {
        display: flex;
        flex: 0 0 55.5px;
        > img {
          height: 55.5px;
          width: 55.5px;
          border-radius: 50%;
        }
      }
      .content {
        position: relative;
        display: flex;
        flex-direction: column;
        height: 55.5px;
        margin-left: 10px;
        margin-top: 4px;
        .nickname {
          font-size: 16px;
          font-weight: bolder;
        }
        .uid {
          margin-top: 5px;
          font-size: 9px;
          color: $gray;
        }
        .numbers {
          display: flex;
          margin: auto;
          vertical-align: bottom;
          h2 {
            display: inline-block;
            font-size: 15px;
            font-weight: 500;
            margin-right: 18.5px;
          }
        }
      }
    }
    .extra {
      position: relative;
      margin-top: 29px;
      font-size: 0;
      display: flex;
      height: 33px;

      .left {
        flex: 1;
        text-align: left;
        position: absolute;
        bottom: 5px;
        .item {
          margin-right: 7px;
          font-size: 13px;
          color: $gray;
        }
      }
      .follow-button {
        position: absolute;
        right: 0;
        top: 0;
        .follow {
          display: flex;
          height: 33px;
          width: 88px;
          border-radius: 6px;
          background-color: $blue;
          .text {
            flex: 1;
            margin: auto;
            text-align: center;
            color: $white;
            font-size: 15px;
            .icon {
              font-weight: 800;
              margin-right: 7px;
            }
          }
        }
        .active {
          background-color: $light_gray;
        }
      }
      .edit-button {
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        flex: 1;
        .follow {
          display: flex;
          height: 33px;
          width: 88px;
          border: 1px solid $black;
          border-radius: 10px;
          .text {
            flex: 1;
            margin: auto;
            text-align: center;
            font-size: 15px;
            .icon {
              font-weight: 800;
              margin-right: 7px;
            }
          }
        }
      }
    }
    .intro {
      margin-top: 27.5px;
      font-size: 13px;
    }
  }
</style>
