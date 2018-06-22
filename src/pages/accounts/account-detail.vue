<template>
  <div class="account-detail">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="account"></account-header>
    </div>
    <!--tab页面-->
    <div class="tabs-wrapper">
      <base-tab>
        <tab-item :selected="tab === tabList[0]" v-for="(tab, index) in tabList"
                  @on-item-click="switchTab(tab, index)" :key="index" :active-class="'active'">
          <h2>{{tab.txt}} {{account[tab.count]}}</h2>
        </tab-item>
      </base-tab>
    </div>
    <div class="content-list">
      <scroll :busy="busy" @loadMore="loadMore" :immediate_check="false" :empty="itemList.length < 1">
        <template v-if="currentTab ==='publish_topics'">
          <topic-list :topicList="itemList"></topic-list>
        </template>
        <template v-else>
          <course-list :courseList="itemList"></course-list>
        </template>

      </scroll>
    </div>
    <!--具体内容-->
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Scroll from 'base/scroll/scroll';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import AccountHeader from 'components/account-header/account-header';
  import TopicList from 'components/topic-list/topic-list';
  import CourseList from 'components/course-list/course-list';
  import BaseTab from 'base/tab/tab';
  import {TabItem} from 'vux';
  import Loading from 'base/loading/loading';
  import Empty from 'components/empty/empty';

  import {
    getAccount,
    getAccountTopics,
    getAccountCourses,
  } from '@/api/account_api';

  const tabList = [
    {
      txt: '心得',
      type: 'publish_topics',
      count: 'publish_topics_count',
    },
    {
      txt: '课程',
      type: 'publish_courses',
      count: 'publish_courses_count',
    },
    {
      txt: '学过',
      type: 'learn_courses',
      count: 'learn_courses_count',
    },
  ];
  export default {
    name: 'account-detail',
    mixins: [ScrollMixin],
    components: {
      AccountHeader,
      TopicList,
      CourseList,
      BaseTab,
      Scroll,
      TabItem,
      Empty,
      Loading,
    },
    data() {
      return {
        account: {},
        currentTab: 'publish_topics',
        tabList,
      };
    },
    async created() {
      await this._getAccount();
    },
    watch: {
      currentTab() {
        this.itemList = [];
        this.getItemList();
      },
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount',
      }),
      account_id() {
        return this.$route.params.id;
      },
    },

    methods: {
      ...mapActions({}),
      async _getAccount() {
        const response = await getAccount(this.account_id);
        this.account = response.account;
      },

      switchTab(tab = tabList[0], index = 0) {
        this.currentTab = tab.type;
      },

      async getItemList(params = {}) {
        switch (this.currentTab) {
          case 'publish_topics':
            this._getPublishTopics(params);
            break;
          case 'publish_courses':
            this._getPublishCourses(params);
            break;
          case 'learn_courses':
            this._getLearnCourses(params);
            break;
          default:
            this._getPublishTopics(params);
            break;
        }
      },

      async _getPublishTopics(params = {}) {
        const res = await getAccountTopics(this.account_id, 'publish', {...params, per_page: 6});
        this.itemList = this.itemList.concat(res.data.topics);
        this.pagination(res.headers);
      },
      async _getPublishCourses(params = {}) {
        const res = await getAccountCourses(this.account_id, 'publish', {...params, per_page: 6});
        this.itemList = this.itemList.concat(res.data.courses);
        this.pagination(res.headers);
      },
      async _getLearnCourses(params = {}) {
        const res = await getAccountCourses(this.account_id, 'learn', {...params, per_page: 6});
        this.itemList = this.itemList.concat(res.data.courses);
        this.pagination(res.headers);
      },
      _setShareInfo() {
        const path = window.location.href;
        window.wechatShare({
          link: path,
          imgUrl: this.accountDetail.avatar_url,
          success: (res) => {
          },
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .account-detail {
    margin-bottom: 40px;
    .header-wrapper {
      margin-bottom: 27.5px;
    }
    .tabs-wrapper {
      padding: 0 17.5px;
      color: $gray;
      font-weight: 900;
      .active {
        color: $blue
      }
    }
    .content-list {
      padding: 0 17.5px;
      min-height: 200px;
    }

  }

</style>
