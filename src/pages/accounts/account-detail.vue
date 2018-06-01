<template>
  <div class="account-detail">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="account"></account-header>
    </div>
    <!--tab页面-->
    <div class="tabs-wrapper">
      <div class="border-top-1px"></div>
      <base-tab>
        <tab-item :selected="tab === tabList[0]" v-for="(tab, index) in tabList"
                  @on-item-click="switchTab(tab, index)" :key="index">
          <h2>{{tab.txt}}</h2>
        </tab-item>
      </base-tab>
      <div class="border-top-1px"></div>
    </div>
    <!--通过子路由来显示-->
    <div class="content-list">
      <transition name="fade">
        <!--<scroll :busy="busy" @loadMore="loadMore">-->
        <!--<topic-list :topicList="itemList" v-if="currentTab ==='publish_topics'">-->
        <!--</topic-list>-->
        <!--<course-list :courseList="itemList" v-if="currentTab ==='publish_courses'"></course-list>-->
        <!--<course-list :courseList="itemList" v-if="currentTab ==='learn_courses'"></course-list>-->
        <!--</scroll>-->
      </transition>
    </div>
    <!--具体内容-->
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll'

  import {mapActions, mapGetters} from 'vuex'
  import {getAccount} from "@/api/account_api"
  import {ScrollMixin} from "components/mixin/scroll_mixin"


  import AccountHeader from 'components/account-header/account-header'
  import BaseCourse from 'components/base-course/base-course'
  import TopicList from 'components/topic-list/topic-list'
  import CourseList from 'components/course-list/course-list'
  import BaseTab from 'base/tab/tab'
  import {TabItem} from 'vux'

  import {
    getAccountTopics,
    getAccountCourses,
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
    mixins: [ScrollMixin],
    components: {
      BaseCourse,
      AccountHeader,
      TopicList,
      CourseList,
      BaseTab,
      Scroll,
      TabItem
    },
    data() {
      return {
        account: {},
        currentTab: 'publish_topics',
        tabList: tabList
      }
    },
    created() {
      this._getAccount()
    },
    watch: {
      currentTab() {
        this.itemList = []
        this.getItemList()
      },
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount'
      }),
      account_id() {
        return this.$route.params.id
      },
    },

    methods: {
      ...mapActions({
        // setCurrentAccount: 'setCurrentAccount'
      }),
      async _getAccount() {
        const response = await getAccount(this.account_id)
        this.account = response.account
      },

      switchTab(tab = tabList[0], index = 0) {
        this.currentTab = tab.type
      },

      async getItemList(params = {}) {
        switch (this.currentTab) {
          case 'publish_topics':
            this._getPublishTopics(params)
            break;
          case 'publish_courses':
            this._getPublishCourses(params)
            break;
          case 'learn_courses':
            this._getLearnCourses(params)
            break;
          default:
            this._getPublishTopics(params)
        }
      },

      async _getPublishTopics(params = {}) {

        const res = await getAccountTopics(this.account_id, 'publish', {...params, per_page: 3})
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      async _getPublishCourses(params = {}) {
        const res = await getAccountCourses(this.account_id, 'publish', {...params, per_page: 3})
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      },
      async _getLearnCourses(params = {}) {
        const res = await getAccountCourses(this.account_id, 'learn', {...params, per_page: 3})
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .account-detail {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    .header-wrapper {
      margin-bottom: 27.5px;
    }
    .tabs-wrapper {
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
