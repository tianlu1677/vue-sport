<template>
  <div class="text-lesson">
    <div class="header">
      <h1 class="name">{{lessonDetail.name}}</h1>
      <div class="course">
        <div class="text">所在课程「
          <span class="name" @click="goCourse">{{courseDetail.name}}</span>
          」
        </div>
      </div>
    </div>
    <avatar :account="lessonDetail.account" :time="lessonDetail.created_at_text"></avatar>
    <div class="main-content" v-if="lessonDetail.content" v-html="lessonDetail.content">
    </div>
  </div>

</template>

<script>
  import Avatar from 'components/avatar/avatar';
  import LessonListView from 'components/lesson-list/lesson-list-view';
  // import { paginationMixin } from 'components/mixin/pagination_mixin';
  import TopicList from 'components/topic-list/topic-list';
  // import { getCourseTopics } from '@/api/course_api';

  export default {
    name: 'text-lesson',
    components: {
      Avatar,
      LessonListView,
      TopicList,
    },
    props: {
      lessonDetail: {
        type: Object,
        default() {
          return {};
        },
      },
      courseDetail: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    created() {
    },

    methods: {
      goCourse() {
        this.$router.push({path: `/courses/${this.lessonDetail.course_id}`});
      },
    },
  };
</script>

<style lang="scss">
  .text-lesson {
    height: 100%;
    padding: 17.5px 17.5px 0 17.5px;
    .header {
      padding-right: 83.5px;
      margin-bottom: 14px;
      .name {
        font-size: 18px;
        font-weight: normal;
      }
      .course {
        display: flex;
        margin-top: 16px;
        .text {
          font-size: 12px;
          color: $gray;
        }
        .name {
          font-size: 12px;
          line-height: 15px;
          color: $blue;
        }
      }
    }
    .main-content {
      margin-top: 17.5px;
      font-size: 14px;
      line-height: 22px;
      word-break: break-word;
      word-wrap: break-word;
      .fr-inner {
        display: block;
        text-align: center;
        font-size: 12px;
        color: $gray;
      }
      img {
        width: 100%;
      }
    }
  }
</style>
