<template>
  <div class="text-lesson">
    <div class="header">
      <h1 class="name">{{lessonDetail.name}}</h1>
      <div class="course">
        <div class="text">所在课程 [
          <span class="name" @click="goCourse">{{courseDetail.name}}</span>
          ]
        </div>
      </div>
    </div>
    <avatar :account="lessonDetail.account" :time="lessonDetail.published_at"></avatar>
    <div class="main-content" v-if="lessonDetail.content">
      <span v-html="lessonDetail.content">
      </span>
    </div>
  </div>

</template>
t
<script>
  import Avatar from 'components/avatar/avatar'

  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicListView from 'components/topic-list/topic-list-view'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import TopicList from 'components/topic-list/topic-list'
  import {getCourseTopics} from "@/api/course_api"

  export default {
    name: "text-lesson",
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
    },

    methods: {
      goCourse() {
        this.$router.push({path: `/courses/${this.lessonDetail.parent_id}`})
      }
    }
  }
</script>

<style scoped lang="scss">
  .text-lesson {
    height: 100%;
    padding: 17.5px 17.5px 17.5px 17.5px;
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
      font-size: 14px;
      line-height: 22px;
      word-break: break-word;
      word-wrap: break-word;
      > img {
        width: 100%;
      }
    }
  }
</style>
