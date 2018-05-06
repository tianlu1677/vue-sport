<template>
  <div class="text-lesson">
    <cube-scroll ref="scroll"
                 class="detail-content"
                 :data="itemList"
                 :options="scrollOptions"
                 @pulling-up="onPullingUp"
    >
      <div class="header">
        <h1 class="name">{{lessonDetail.name}}</h1>
        <div class="course">
          <div class="text">所在课程 [
            <span class="name">{{courseDetail.name}}</span>
            ]
          </div>
        </div>
      </div>
      <div class="account-wrapper">
        <avatar :account="lessonDetail.account" :desc="lessonDetail.published_at"></avatar>
      </div>
      <div class="main-content">
      <span v-html="lessonDetail.content">
      </span>
      </div>
      <div class="topics-wrapper">
        <div class="content">
          <h2 class="intro">心得</h2>
          <span class="topics-count">{{courseDetail.topics_count}}</span>
        </div>
        <div class="topics-content">
          <topic-list :topicList="itemList"></topic-list>
        </div>
      </div>
      <div>
      </div>
    </cube-scroll>
  </div>

</template>

<script>
  import Avatar from 'components/avatar/avatar'

  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicListView from 'components/topic-list/topic-list-view'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import TopicList from 'components/topic-list/topic-list'
  import {getCourseTopics} from "@/api/course_api"

  export default {
    name: "text-lesson",
    mixins: [paginationMixin],
    components: {
      Avatar,
      LessonListView,
      TopicList,
      TopicListView
    },
    props: {
      lessonDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
      courseDetail: {
        type: Object,
        default: function () {
          return {}
        }
      }
    },
    created() {
      this.getItemList()
    },

    methods: {
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.lessonDetail.id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">
  .text-lesson {
    height: 100%;
    .detail-content {
      padding: 17.5px;
    }
    .header {
      padding-right: 83.5px;
      margin-bottom: 15px;
      .name {
        font-size: 18px;
        font-weight: bolder;
      }
      .course {
        display: flex;
        margin-top: 18.5px;
        .text {
          font-size: 12px;
          color: $gray;
        }
        .name {
          font-size: 12px;
          color: $blue;
        }
      }
    }
    .main-content {
      margin-top: 21px;
      margin-bottom: 29px;
      font-size: 14px;
      line-height: 22px;
      word-break: break-word;
      word-wrap: break-word;
      > img {
        width: 100%;
      }
    }
    .topics-wrapper {
      position: relative;
      margin-top: 27.5px;
      .content {
        display: flex;
        align-items: flex-end;
        padding-bottom: 17.5px;
        .intro {
          font-size: 22px;
          font-weight: bolder;
        }
        .topics-count {
          padding-left: 7.5px;
          color: $gray;
          font-size: 12px;
        }
      }
    }
  }
</style>
