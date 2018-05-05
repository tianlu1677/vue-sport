<template>
  <div class="text-lesson">
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

    <div>
      <lesson-list-view :course_id="courseDetail.id"
                        :lessons_count="courseDetail.lessons_count"
      ></lesson-list-view>
    </div>
    <div>
      <topic-list-view :course_id="lessonDetail.id"
                       :topics_count="lessonDetail.topics_count">

      </topic-list-view>

    </div>

  </div>

</template>

<script>
  import Avatar from 'components/avatar/avatar'

  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicListView from 'components/topic-list/topic-list-view'

  export default {
    name: "text-lesson",
    components: {
      Avatar,
      LessonListView,
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

    methods: {}
  }
</script>

<style scoped lang="scss">
  .text-lesson {
    padding: 17.5px;
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

  }
</style>
