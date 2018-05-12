<template>
  <div class="account-detail">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="account"></account-header>
    </div>
    <!--tab页面-->
    <div class="tabs-wrapper">
      <div class="border-top-1px"></div>
      <ul class="tab">
        <li v-for="(tab, index) in tabList" :key="tab.text" @click="switchTab(tab, index)"
            :class="{active: currentPage === index}" class="tab-item">
          <h2>{{tab.txt}}</h2>
        </li>
      </ul>
      <div class="border-top-1px"></div>
    </div>
    <!--通过子路由来显示-->
    <div class="content-list">
      <transition name="fade">
        <router-view :account_id="account_id"/>
      </transition>
    </div>
    <!--具体内容-->
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {getAccount} from "@/api/account_api"
  import AccountHeader from 'components/account-header/account-header'
  import BaseCourse from 'components/base-course/base-course'

  import {
    getAccountPublishTopics,
    getAccountPublishCourses,
    getAccountLearnCourses
  } from "@/api/account_api"

  const tabList = [
    {
      txt: '心得',
      type: 'publish_topics'
    },
    {
      txt: '课程',
      type: 'publish_courses'
    },
    {
      txt: '学过',
      type: 'learn_courses'
    }
  ]
  export default {
    name: "account-detail",
    components: {
      BaseCourse,
      AccountHeader,
    },

    data() {
      return {
        account_id: this.$route.params.id,
        account: {},
        currentPage: 0,
        tabList: tabList
      }
    },
    created() {
      this.setCurrentAccount()
      this._getAccount()
      this.switchTab()
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount'
      })
    },

    methods: {
      ...mapActions({
        setCurrentAccount: 'setCurrentAccount'
      }),
      async _getAccount() {
        const response = await getAccount(this.account_id)
        this.account = response.account
      },

      switchTab(tab = tabList[0], index = 0) {
        this.currentPage = index
        this.$router.push({path: `/accounts/${this.account_id}/${tab.type}`})
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
    .content-list {
      padding: 17.5px;
      overflow: hidden;
      height: 100%;
    }
  }

</style>
