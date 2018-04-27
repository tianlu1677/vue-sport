<template>
  <div class="account-detail">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="account"></account-header>
    </div>

    <!--tab页面-->
    <div class="tabs-wrapper">
      <div class="border-top-1px"></div>
      <div class="tab">
        <div class="border-top-1px"></div>
        <div class="tab-item">
          <h2>心得 20</h2>
        </div>
        <div class="tab-item active">
          <h2>心得 20</h2>
        </div>
        <div class="tab-item">
          <h2>心得 20</h2>
        </div>

      </div>
      <div class="border-top-1px"></div>
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
  import AccountHeader from 'components/account-header/account-header'
  import BaseCourse from 'components/base-course/base-course'

  export default {
    name: "account-detail",
    components: {
      BaseCourse,
      AccountHeader
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
    .tabs-wrapper {
      margin-top: 27.5px;
      padding: 0 17.5px;
      .tab {
        display: flex;
        height: 45.5px;
        line-height: 45.5px;
        .tab-item {
          flex: 1;
          font-size: 13px;
          font-weight: bold;
          text-align: center;
        }
        .active {
          color: $blue;
        }
      }
    }

  }

</style>
