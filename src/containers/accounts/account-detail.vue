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
      <!--<cube-slide-->
      <!--ref="slide"-->
      <!--:data="tabList"-->
      <!--:initialIndex="currentPage"-->
      <!--:loop="false"-->
      <!--:autoPlay="false"-->
      <!--:threshold="0.1"-->
      <!--@change="slideChange"-->
      <!--&gt;-->
      <!--<cube-slide-item v-for="(tab, index) in tabList" :key="index">-->
      <!--<div class="match-list-wrapper">-->
      <!--&lt;!&ndash;<match-list :type="tab.type"></match-list>&ndash;&gt;-->
      <!--</div>-->
      <!--</cube-slide-item>-->
      <!--<div slot="dots"></div>-->
      <!--</cube-slide>-->
    </div>
    <!--具体内容-->
  </div>
</template>

<script>
  import {getCurrentAccount} from "@/api/mine_api";
  import AccountHeader from 'components/account-header/account-header'
  import BaseCourse from 'components/base-course/base-course'

  import {
    getAccountPublishTopics,
    getAccountPublishCourses,
    getAccountLearnCourses
  } from "@/api/account_api"

  export default {
    name: "account-detail",
    components: {
      BaseCourse,
      AccountHeader,
    },

    data() {
      return {
        account_id: this.$route.params.id,
        currentPage: 0,
        tabList: [{
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
        ],
        account: {}
      }
    },

    created() {
      this._getAccount()
    },

    methods: {
      async _getAccount() {
        const response = await getCurrentAccount(this.account_id)
        this.account = response.account
      },
      slideChange(index) {
        this.currentPage = index
      },
      switchTab(tab, index) {
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
