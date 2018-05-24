<template>
  <div class="account-detail">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp"
    >
      <!--顶部位置-->
      <div class="header-wrapper">
        <account-header :account="account"></account-header>
      </div>
      <!--tab页面-->
      <div class="tabs-wrapper">
        <div class="border-top-1px"></div>
        <ul class="tab">
          <li v-for="(tab, index) in tabList" :key="tab.text" @click="switchTab(tab, index)"
              :class="{active: currentTab === tab.type}" class="tab-item">
            <h2>{{tab.txt}}</h2>
          </li>
        </ul>
        <div class="border-top-1px"></div>
      </div>
      <!--通过子路由来显示-->
      <div class="content-list">
        <transition name="fade">
          <div class="list">
            <topic-list :topicList="itemList" v-if="currentTab ==='publish_topics'">

            </topic-list>
            <course-list :courseList="itemList" v-if="currentTab ==='publish_courses'"></course-list>
            <course-list :courseList="itemList" v-if="currentTab ==='learn_courses'"></course-list>
          </div>
        </transition>
        <empty v-if="itemList.length <=0"></empty>
      </div>
    </cube-scroll>
    <!--具体内容-->
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import {getAccount} from "@/api/account_api"
  import {paginationMixin} from "components/mixin/pagination_mixin"

  import AccountHeader from 'components/account-header/account-header'
  import BaseCourse from 'components/base-course/base-course'
  import TopicList from 'components/topic-list/topic-list'
  import CourseList from 'components/course-list/course-list'
  import Empty from 'components/empty/empty'

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
      TopicList,
      CourseList,
      Empty
    },
    mixins: [paginationMixin],

    data() {
      return {
        account_id: this.$route.params.id,
        account: {},
        currentTab: 'publish_topics',
        tabList: tabList
      }
    },
    created() {
      this._getAccount()
      this.switchTab()
      this.getItemList()
    },
    watch: {
      currentTab() {
        this.itemList = []
        this.getItemList()
      }
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
        const res = await getAccountPublishTopics(this.account_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      async _getPublishCourses(params = {}) {
        const res = await getAccountPublishCourses(this.account_id, params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      },
      async _getLearnCourses(params = {}) {
        const res = await getAccountLearnCourses(this.account_id, params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
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
      .list {
        height: 90%;
      }
    }
  }

</style>
