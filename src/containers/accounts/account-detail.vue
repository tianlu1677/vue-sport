<template>
  <div class="account-detail">
    <!--顶部位置-->
    <div class="account-header">
      <div class="content-wrapper">
        <div class="icon">
          <img :src="account.avatar_url" alt="" height="55.5" width="55.5">
        </div>
        <div class="content">
          <h1 class="nickname">{{account.nickname}}</h1>
          <span class="uid">ID：{{account.uid}}</span>
          <div class="numbers">
            <h2 class="praise-count">3.5获赞数</h2>
            <h2 class="following-count">50关注数</h2>
            <h2 class="follower-count">30粉丝数</h2>
          </div>
        </div>
      </div>

      <div class="extra">
        <div class="left">
          <span class="icon-gender-man item"></span>
          <span class="age item">{{'25'}}岁</span>
          <span class="city item">{{account.city}}</span>
        </div>
        <div class="follow-button">
          <cube-button :inline="true" class="follow">
            <span class=""></span>
            关注
          </cube-button>
        </div>

      </div>
      <div class="intro">
        {{account.intro}}
      </div>

    </div>
    <!--tab页面-->
    <div class="tab">
      <div class="tab-item">
        <h2>心得 20</h2>
      </div>
      <div class="tab-item">
        <h2>心得 20</h2>
      </div>
      <div class="tab-item">
        <h2>心得 20</h2>
      </div>
    </div>

    <!--通过子路由来显示-->
    <div class="content-list">
      <router-view/>
    </div>

    <!--具体内容-->
  </div>
</template>

<script>
  import {getCurrentAccount} from "@/api/account_api";
  import BaseCourse from 'components/base-course/base-course'

  export default {
    name: "account-detail",
    components: {
      BaseCourse
    },

    data() {
      return {
        account: {}
      }
    },

    created() {
      this._getAccount(1)
    },

    methods: {
      async _getAccount(account_id) {
        const response = await getCurrentAccount(account_id)
        this.account = response.account
      }
    }

  }
</script>

<style lang="scss" scoped>
  .account-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .account-header {
      position: relative;
      height: 234px;
      padding: 17.5px 17.5px 0 17.5px;
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
            height: 33px;
            width: 88px;
            border-radius: 10px;
            background-color: $blue;
            font-size: 15px;
            color: $white;
          }
        }
      }
      .intro {
        margin-top: 28.5px;
        font-size: 13px;
      }
    }

    .tab {
      margin: 0 17.5px 0 17.5px;
      display: flex;
      height: 45.5px;
      line-height: 45.5px;
      border-top: solid 1px $gray;
      border-bottom: solid 1px $gray;
      .tab-item {
        flex: 1;
        font-size: 13px;
        font-weight: bold;
        text-align: center;
      }
    }
  }

</style>
