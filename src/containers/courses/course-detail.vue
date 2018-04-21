<template>
  <div>
    <course-header>
    </course-header>

    <div class="course-detail">
      <cube-scroll ref="scroll"
                   class="detail-content"
      >
        <div class="main" @touchmove.prevent>
          <!--写心得喜欢等-->
          <div class="actions-wrapper">
            <div>
              <new-topic-icon text="写心得"></new-topic-icon>
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
              <div class="lessons-arrow" @click.stop="showHideLessonList">
                <span class="icon-arrow-down"></span>
              </div>
              <div class="lessons-content">
                <lesson-list></lesson-list>
              </div>
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
      </cube-scroll>
      <!--隐藏的课时列表-->
      <hide-lesson-list ref="hidelessons"></hide-lesson-list>
    </div>
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
  import HideLessonList from 'components/lesson-list/hide-lesson-list'
  import TopicList from 'components/topic-list/topic-list.vue'
  import IPopup from 'base/i-popup/i-popup'

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
      TopicList,
      IPopup,
      HideLessonList
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

      showHideLessonList() {
        console.log('show ')
        this.$refs.hidelessons.show()
      },
      showPopup(refId) {
        const component = this.$refs[refId]
        component.show()
        setTimeout(() => {
          component.hide()
        }, 4000)
      }

    }
  }
</script>

<style scoped lang="scss">
  .course-detail {
    position: fixed;
    top: 217px;
    left: 0;
    right: 0;
    bottom: 0;
    .main {
      position: relative;
      padding: 17px 17.5px 17.5px 17.5px;
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
          padding-bottom: 17.5px;
          .intro {
            position: relative;
            /*float: left;*/
            font-size: 22px;
            font-weight: bolder;
          }
          .topics-count {
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
