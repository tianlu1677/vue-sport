<template>
  <div class="account-header">
    <div class="content-wrapper">
      <div class="icon">
        <img :src="account.avatar_url" alt="" height="55.5" width="55.5">
      </div>
      <div class="content">
        <h1 class="nickname">{{account.nickname}}</h1>
        <span class="uid">ID：{{account.uid}}</span>
        <div class="numbers">
          <h2 class="praise-count">{{account.get_praises_count}}获赞数</h2>
          <h2 class="following-count">{{account.following_count}}关注数</h2>
          <h2 class="follower-count">{{account.followers_count}}粉丝数</h2>
        </div>
      </div>
    </div>

    <div class="extra">
      <div class="left">
        <span class="icon-gender-man item" v-if="account.gender === 'man'"></span>
        <span class="icon-gender-woman item" v-if="account.gender === 'woman'"></span>

        <span class="age item">{{12}}岁</span>
        <span class="city item">{{account.city}}</span>
      </div>
      <!--关注按钮-->
      <div class="follow-button" v-if="!showEdit">
        <div class="follow" :class="{active: account.followed}" @click="handleFollow">
          <i class="icon-topic-add-photo"></i>
          <span class="text" v-if="!account.followed">关注</span>
          <span class="text" v-else>已关注</span>
        </div>
      </div>
      <!--个人是显示-->
      <router-link to="/mine/edit" tag="div" class="follow-button" v-if="showEdit">
        <div class="follow">
          <i class="icon-topic-add-photo"></i>
          <span class="text">编辑</span>
        </div>
      </router-link>
    </div>
    <div class="intro">
      {{account.intro}}
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
      ...mapGetters([
        'currentAccount'
      ]),
      showEdit() {
        if (!!this.currentAccount) {
          console.log('2222', this.account.id, this.currentAccount)
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
      align-items: flex-end;
      .icon {
        > img {
          border-radius: 50%;
        }
      }
      .content {
        margin-left: 10px;
        .nickname {
          font-size: 16px;
          line-height: 12.5px;
          font-weight: bolder;
        }
        .uid {
          margin-top: 4.5px;
          font-size: 12px;
          color: $gray;
        }
        .numbers {
          display: flex;
          margin-top: 10.5px;
          h2 {
            font-size: 15px;
            margin-right: 18.5px;
          }
        }
      }
    }
    .extra {
      position: relative;
      margin-top: 29px;
      font-size: 0;
      .left .item {
        margin-right: 10px;
        font-size: 13px;
        color: $gray;
      }
      .follow-button {
        position: absolute;
        right: 0;
        top: 0;
        .follow {
          display: flex;
          height: 33px;
          width: 88px;
          border-radius: 10px;
          background-color: $blue;
          .text {
            flex: 1;
            margin: auto;
            text-align: center;
            color: $white;
            font-size: 15px;
          }
        }
        .active {
          background-color: $gray;
        }
      }
    }
    .intro {
      margin-top: 27.5px;
      font-size: 13px;
    }
  }
</style>
