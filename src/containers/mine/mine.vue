<template>
  <div class="mine">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="currentAccount"></account-header>
    </div>
    <!--心得-->
    <div class="content-wrapper">
      <div class="border-top-1px"></div>
      <div class="topic item">
        <h1 class="text"> 心得 </h1>
        <i class="icon-arrow-right"></i>
      </div>

      <div class="learn item">
        <h1 class="text"> 学过 </h1>
        <i class="icon-arrow-right"></i>
      </div>

      <div class="border-top-1px"></div>
      <div class="like item">
        <h1 class="text"> 喜欢 </h1>
        <i class="icon-arrow-right"></i>
      </div>

      <div class="star item">
        <h1 class="text"> 收藏 </h1>
        <i class="icon-arrow-right"></i>
      </div>
      <div class="border-top-1px"></div>

      <div class="feedback item">
        <h1 class="text"> 反馈 </h1>
        <i class="icon-arrow-right"></i>
      </div>

      <div class="border-top-1px"></div>
    </div>

    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import {getCurrentAccount} from "@/api/account_api";
  import AccountHeader from 'components/account-header/account-header'
  import BottomNav from 'components/bottom-nav/bottom-nav'

  export default {
    name: "mine",
    components: {
      AccountHeader,
      BottomNav
    },

    data() {
      return {
        currentAccount: {}
      }
    },

    created() {
      this._getCurrentAccount()
    },

    methods: {
      async _getCurrentAccount() {
        const response = await getCurrentAccount()
        this.currentAccount = response.account
      }
    }

  }
</script>

<style lang="scss" scoped>
  .mine {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .content-wrapper {
      margin-top: 27.5px;
      padding: 0 17.5px;
      display: flex;
      flex-direction: column;
      .item {
        position: relative;
        display: flex;
        padding-top: 17.5px;
        padding-bottom: 17.5px;
        .text {
          font-size: 14px;
          font-weight: bolder;
        }
        i {
          position: absolute;
          right: 0;
          font-size: 12px;
        }
      }

    }

  }

</style>
