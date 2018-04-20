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
      StarIcon
    },

    created() {
      this._getCourseDetail()
    },

    methods: {
      async _getCourseDetail() {
        const response = await getCourse(this.course_id)
        this.course = response.course
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
    }

  }
</style>
