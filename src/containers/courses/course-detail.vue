<template>
  <div class="course-detail">
    <!--顶部header-->
    <div class="header-wrapper">
      <course-header :course="course"></course-header>
    </div>

    <div class="main">
      <!--写心得喜欢等-->
      <div class="actions-wrapper">
        <div>
          <new-topic-icon></new-topic-icon>
        </div>
        <ul class="actions">
          <li class="item">
            <praise-icon></praise-icon>
          </li>
          <li class="item">
            <star-icon></star-icon>
          </li>
          <li class="item">
            <share-icon></share-icon>
          </li>
        </ul>

      </div>
      <!--用户信息-->
      <div class="account-wrapper">
        <avatar :account="course.account" :desc="'发布者'"></avatar>
      </div>

      <div class="lessons-wrapper">
        <div class="content">
          <h2 class="intro">课时</h2>
          <span class="lessons-count">13</span>
        </div>
        <div class="lessons-arrow" @click="showLessons">
          <span class="icon-arrow-down"></span>
        </div>
        <div class="lessons-content">
          <lesson-list></lesson-list>
        </div>

      </div>
      <!--课时列表-->
      <!--心得列表-->

    </div>

  </div>
</template>

<script>
  import CourseHeader from 'components/course-header/course-header'
  import {getCourse, createAction, destroyAction} from "@/api/course_api"
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import StarIcon from 'components/actions/star-icon'
  import Avatar from 'components/avatar/avatar'
  import LessonList from 'components/lesson-list/lesson-list'

  export default {
    name: "course-detail",
    data() {
      return {
        course_id: this.$route.params.id,
        course: {},
      }
    },

    components: {
      CourseHeader,
      NewTopicIcon,
      PraiseIcon,
      ShareIcon,
      StarIcon,
      Avatar,
      LessonList
    },

    created() {
      this._getCourseDetail()
    },

    methods: {
      async _getCourseDetail() {
        const response = await getCourse(this.course_id)
        this.course = response.course
      },

      showLessons() {
        console.log('show ')
      }
    }
  }
</script>

<style scoped lang="scss">
  .course-detail {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    .header-wrapper {
    }
    .main {
      padding: 17px 17.5px 0 17.5px;
      .actions-wrapper {
        position: relative;
        .actions {
          position: absolute;
          display: flex;
          top: 0;
          right: 20.5px;
          .item {
            margin: 0 20px 0 0;
          }
          .item:last-child {
            margin: 0;
          }
        }
      }
      .account-wrapper {
        position: relative;
        margin-top: 22.5px;
      }
      .lessons-wrapper {
        display: flex;
        position: relative;
        margin-top: 27.5px;
        .content {
          .intro {
            position: relative;
            float: left;
            font-size: 22px;
            font-weight: bolder;
          }
          .lessons-count {
            position: absolute;
            bottom: 0;
            float: right;
            padding-left: 7.5px;
            color: $gray;
            font-size: 12px;
          }
        }
        .lessons-arrow {
          flex: 1;
          position: absolute;
          right: 0;
          top: 0;
          font-size: 15px;
        }
        .lessons-content {
          margin-top: 16.5px;
        }

      }
    }

  }
</style>
