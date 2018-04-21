<template>
  <div class="course-detail">
    <cube-scroll ref="scroll"
                 class="detail-content"
    >
      <!--顶部header-->
      <div class="header-wrapper">
        <course-header>

        </course-header>
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
          <avatar :account="courseDetail.account" :desc="'发布者'"></avatar>
        </div>
        <!--课时列表-->
        <div class="lessons-wrapper">
          <div class="content-wrapper">
            <div class="content">
              <h2 class="intro">课时</h2>
              <span class="lessons-count">13</span>
            </div>
            <div class="lessons-arrow" @click="showLessons">
              <span class="icon-arrow-down"></span>
            </div>
          </div>

          <div class="lessons-content">
            <lesson-list></lesson-list>
          </div>
        </div>

        <!--心得列表-->
        <div class="topics-wrapper">
          <div class="content">
            <h2 class="intro">心得</h2>
            <span class="topics-count">43</span>
          </div>

          <div class="topics-content">
            <topic-list></topic-list>
          </div>
        </div>
      </div>
      <!--</cube-scroll>-->
    </cube-scroll>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import CourseHeader from 'components/course-header/course-header'
  import {getCourse, createAction, destroyAction} from "@/api/course_api"
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import StarIcon from 'components/actions/star-icon'
  import Avatar from 'components/avatar/avatar'
  import LessonList from 'components/lesson-list/lesson-list'
  import TopicList from 'components/topic-list/topic-list.vue'

  export default {
    name: "course-detail",
    data() {
      return {
        course_id: this.$route.params.id,
      }
    },
    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail'
      })
    },

    components: {
      CourseHeader,
      NewTopicIcon,
      PraiseIcon,
      ShareIcon,
      StarIcon,
      Avatar,
      LessonList,
      TopicList
    },

    async created() {
      await this.getCourseDetail(this.course_id)
    },

    methods: {
      ...mapActions({
        getCourseDetail: 'setCourseDetail'
      }),

      // async _getCourseDetail() {
      //   const response = await getCourse(this.course_id)
      //   this.course = response.course
      // },

      showLessons() {
        console.log('show ')
      }
    }
  }
</script>

<style scoped lang="scss">
  .course-detail {
    height: 667px;
    .detail-content {

    }
    .header-wrapper {
    }
    .main {
      position: relative;
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
        position: relative;
        margin-top: 27.5px;
        .content-wrapper {
          display: flex;
          .content {
            .intro {
              position: relative;
              float: left;
              font-size: 22px;
              font-weight: bolder;
            }
            .lessons-count {
              bottom: 0;
              padding-left: 7.5px;
              color: $gray;
              font-size: 12px;
            }
          }
          .lessons-arrow {
            /*flex: 1;*/
            position: absolute;
            right: 0;
            top: 0;
            bottom: 0;
            font-size: 15px;
          }

        }
        .lessons-content {
          padding-top: 16.5px;
        }

      }
      .topics-wrapper {
        position: relative;
        margin-top: 27.5px;
        .content {
          display: flex;
          .intro {
            position: relative;
            float: left;
            font-size: 22px;
            font-weight: bolder;
          }
          .topics-count {
            bottom: 0;
            padding-left: 7.5px;
            color: $gray;
            font-size: 12px;
          }
        }

        .topics-content {
          /*padding-top: 16.5px;*/
        }
      }
    }

  }
</style>
