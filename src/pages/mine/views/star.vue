<template>
  <div class="list-wrapper">
    <div class="top-tab">
      <base-tab>
        <tab-item :selected="tab === tabList[0]" v-for="(tab, index) in tabList"
                  @on-item-click="switchTab(tab, index)" :key="index">
          <h2>{{tab.txt}}</h2>
        </tab-item>
      </base-tab>
    </div>
    <div class="content">
      <scroll :busy="busy" @loadMore="loadMore">
        <course-list :courseList="itemList" v-if="currentTab === 'courses'"></course-list>
        <topic-list :topicList="itemList" v-if="currentTab==='topics'"></topic-list>
        <lesson-card-list :lessonList="itemList" v-if="currentTab==='lessons'"></lesson-card-list>
      </scroll>
    </div>
  </div>

</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {mapGetters} from 'vuex';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import CourseList from 'components/course-list/course-list';
  import TopicList from 'components/topic-list/topic-list';
  import LessonCardList from 'components/lesson-list/lesson-card-list';
  import {
    getAccountTopics,
    getAccountCourses,
    getAccountLessons,
  } from '@/api/account_api';

  import BaseTab from 'base/tab/tab';
  import {TabItem} from 'vux';

  const tabList = [
    {
      txt: '心得',
      type: 'topics',
    },
    {
      txt: '课程',
      type: 'courses',
    },
    {
      txt: '课时',
      type: 'lessons',
    },
  ];

  const types = {star: '收藏', learn: '学过', praise: '喜欢'};
  export default {
    name: 'mine-star',
    components: {
      CourseList,
      TopicList,
      LessonCardList,
      Scroll,
      BaseTab,
      TabItem,
    },
    mixins: [ScrollMixin],

    data() {
      return {
        tabList,
        currentTab: 'topics',
      };
    },
    computed: {
      ...mapGetters([
        'currentAccount',
      ]),
      type() {
        return this.$route.query.type;
      },
    },

    watch: {
      currentTab() {
        this.itemList = [];
        this.getItemList();
      },
    },
    async created() {
      this._setDocumentTitle();
    },
    methods: {
      switchTab(tab, index) {
        this.currentTab = tab.type;
      },
      _setDocumentTitle() {
        document.title = types[this.type];
      },
      async getItemList(params = {}) {
        let res = {};
        const accountId = this.currentAccount.id;
        switch (this.currentTab) {
          case 'topics':
            res = await getAccountTopics(accountId, this.type, params);
            this.itemList = this.itemList.concat(res.data.topics);
            break;
          case 'courses':
            res = await getAccountCourses(accountId, this.type, params);
            this.itemList = this.itemList.concat(res.data.courses);
            break;
          case 'lessons':
            res = await getAccountLessons(accountId, this.type, params);
            this.itemList = this.itemList.concat(res.data.lessons);
            break;
          default:
            res = await getAccountTopics(accountId, this.type, params);
            this.itemList = this.itemList.concat(res.data.topics);
      }
        this.pagination(res.headers);
      },
    },
  };
</script>

<style scoped lang="scss">
  .list-wrapper {
    padding: 0 17.5px;
    min-height: 220px;
    .top-tab {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: $white;
    }
    .content {
      margin-top: 70px;
    }
  }
</style>
