<template>
  <div class="list-wrapper">
    <div class="top-tab">
      <cube-tab-bar
        class="tab-list"
        v-model="currentTabTxt"
        @click="switchTab"
        >
        <cube-tab v-for="(tab, index) in tabList" :label="tab.txt" :key="tab.txt">   <h2 class="tab">{{tab.txt}} {{tab.count}}</h2>
        </cube-tab>
      </cube-tab-bar>
      <div class="border-bottom-1px"></div>

    </div>
    <div class="content">
      <scroll :busy="busy" @loadMore="loadMore" :empty="itemList.length <= 0">
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
    getAccountCounts,
  } from '@/api/account_api';

  const types = {star: '收藏', learn: '学过', praise: '喜欢'};
  export default {
    name: 'mine-star',
    components: {
      CourseList,
      TopicList,
      LessonCardList,
      Scroll
    },
    mixins: [ScrollMixin],

    data() {
      return {
        currentTab: 'topics',
        currentTabTxt: '心得',
        counts: {}
      };
    },
    computed: {
      ...mapGetters([
        'currentAccount',
      ]),
      type() {
        return this.$route.query.type;
      },
      tabList() {
        return [{
          txt: '心得',
          type: 'topics',
          count: this.type === 'praise' ? this.counts.praise_topics : this.counts.star_topics
        },
          {
            txt: '课程',
            type: 'courses',
            count: this.type === 'praise' ? this.counts.praise_courses : this.counts.star_courses
          },
          {
            txt: '课时',
            type: 'lessons',
            count: this.type === 'praise' ? this.counts.praise_lessons : this.counts.star_lessons
          }]
      }
    },

    watch: {
      currentTab() {
        this.itemList = [];
        this.getItemList();
      },
    },
    async created() {
      this._setDocumentTitle();
      this.getCounts()
    },
    methods: {
      switchTab(label) {
        this.currentTab = this.tabList.find((tab) => tab.txt === label).type;
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

      async getCounts() {
        if (this.type === 'praise') {
          const types = "praise_topics,praise_courses,praise_lessons"
          const res = await getAccountCounts(this.currentAccount.id, {types: types})
          this.counts = res.counts
        } else if (this.type === 'star') {
          const types = "star_topics,star_courses,star_lessons"
          const res = await getAccountCounts(this.currentAccount.id, {types: types})
          this.counts = res.counts
        } else {
          this.counts = {}
        }
      }
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
      .tab-list {
        height: 43px;
        h2.tab {
          font-size: 16px;
        }
      }
    }
    .content {
      margin-top: 70px;
    }
  }
</style>
