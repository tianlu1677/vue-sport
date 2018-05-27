<template>
  <div>
    <div class="list-wrapper">
      <base-tab>
        <tab-item :selected="tab === tabList[0]" v-for="(tab, index) in tabList"
                  @on-item-click="switchTab(tab, index)" :key="index">
          <h2>{{tab.txt}}</h2>
        </tab-item>
      </base-tab>
      <cube-scroll
        ref="scroll"
        :data="itemList"
        :options="scrollOptions"
        @pulling-up="onPullingUp"
        v-if="itemList.length > 0"
      >
        <course-list :courseList="itemList" v-if="currentTab === 'courses'"></course-list>
        <topic-list :topicList="itemList" v-if="currentTab==='topics'"></topic-list>
        <lesson-list-card :lessonList="itemList" v-if="currentTab==='lessons'"></lesson-list-card>
      </cube-scroll>
    </div>
  </div>

</template>

<script>
  import List from 'base/list/list'
  import {mapGetters} from 'vuex'
  import CourseList from 'components/course-list/course-list'
  import TopicList from 'components/topic-list/topic-list'
  import LessonListCard from 'components/lesson-list/lesson-list-card'

  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getCurrentAccountCourses,
    getCurrentAccountTopics,
    getCurrentAccountLessons
  } from "@/api/mine_api"

  import BaseTab from 'base/tab/tab'
  import {TabItem} from 'vux'

  const tabList = [
    {
      txt: '心得',
      type: 'topics'
    },
    {
      txt: '课程',
      type: 'courses'
    },
    {
      txt: '课时',
      type: 'lessons'
    }
  ]

  export default {
    name: "mine-star",
    components: {
      CourseList,
      TopicList,
      LessonListCard,
      List,
      BaseTab,
      TabItem
    },
    mixins: [paginationMixin],
    props: {
      account_id: {
        type: String,
        default: '1'
      }
    },
    data() {
      return {
        type: this.$route.query.type,
        tabList: tabList,
        currentTab: 'topics'
      }
    },
    computed: {
      ...mapGetters([
        'currentAccount'
      ]),
      // type() {
      //   return
      // }
    },

    watch: {
      currentTab() {
        this.itemList = []
        this.getItemList()
        // this.$refs.scroll.refresh()
      }
    },
    async created() {
      // await this.getItemList()
    },
    methods: {
      switchTab(tab, index) {
        this.currentTab = tab.type
      },
      async getItemList(params = {}) {
        let res = {}
        switch (this.currentTab) {
          case 'topics':
            res = await getCurrentAccountTopics(this.type, params)
            this.itemList = this.itemList.concat(res.data.topics)
            break
          case 'courses':
            res = await getCurrentAccountCourses(this.type, params)
            this.itemList = this.itemList.concat(res.data.courses)
            break
          case 'lessons':
            res = await getCurrentAccountLessons(this.type, params)
            this.itemList = this.itemList.concat(res.data.lessons)
            break
          default:
            res = await getCurrentAccountTopics(this.type, params)
            this.itemList = this.itemList.concat(res.data.topics)
        }
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    background-color: $white;
    display: inline-block;
    padding: 0 17.5px 0 17.5px;
    min-height: 220px;
    .list {
      /*height: 100%;*/
    }
  }
</style>
