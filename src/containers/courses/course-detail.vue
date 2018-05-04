<template>
  <div>
    <div class="course-detail">

      <cube-scroll ref="scroll"
                   class="detail-content"
                   :data="itemList"
                   :options="scrollOptions"
                   @pulling-down="onPullingDown"
                   @pulling-up="onPullingUp"
      >
        <course-header>
        </course-header>

        <div class="main" @touchmove.prevent>
          <!--写心得,喜欢等-->
          <div class="actions-wrapper">
            <div>
              <new-topic-icon text="写心得"></new-topic-icon>
            </div>
            <div class="right-actions">
              <course-actions></course-actions>
            </div>
          </div>
          <!--用户信息-->
          <div class="account-wrapper">
            <avatar :account="courseDetail.account" desc='发布者'></avatar>
          </div>
          <!--课时列表-->
          <div class="lessons-wrapper">
            <div class="content-wrapper">
              <div class="content">
                <h2 class="text">课时</h2>
                <span class="lessons-count">{{courseDetail.lessons_count}}</span>
              </div>
              <div class="lessons-arrow" @click.stop="showHideLessonList">
                <span class="icon-arrow-down"></span>
              </div>
              <div class="lessons-content">
                <lesson-list :course_id="courseDetail.id"></lesson-list>
              </div>
            </div>
          </div>
          <!--心得列表-->
          <div class="topics-wrapper">
            <div class="content">
              <h2 class="intro">心得</h2>
              <span class="topics-count">{{courseDetail.topics_count}}</span>
            </div>
            <div class="topics-content">
              <topic-list :topicList="itemList"></topic-list>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  import CourseHeader from 'components/course-header/course-header'
  import CourseActions from 'components/course-actions/course-actions'
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import Avatar from 'components/avatar/avatar'
  import LessonList from 'components/lesson-list/lesson-list'
  import TopicList from 'components/topic-list/topic-list.vue'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getCourseTopics} from "@/api/course_api"

  export default {
    name: "course-detail",
    mixins: [paginationMixin],

    data() {
      return {
        course_id: parseInt(this.$route.params.id),
      }
    },
    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail'
      })
    },

    components: {
      CourseHeader,
      CourseActions,
      NewTopicIcon,
      Avatar,
      LessonList,
      TopicList,
    },

    async created() {
      await this.setCourseDetail(this.course_id)
      await this.getItemList()
    },

    methods: {
      ...mapActions({
        setCourseDetail: 'setCourseDetail'
      }),
      showHideLessonList() {
        this.lessonListDialog = this.$createLessonListDialog({course_id: this.course_id})
        this.lessonListDialog.show()
      },
      // 获取心得列表
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.courseDetail.id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .course-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .main {
      position: relative;
      padding: 17px 17.5px 17.5px 17.5px;
      .actions-wrapper {
        position: relative;
        .right-actions {
          position: absolute;
          top: 0;
          right: 20.5px;
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
            display: flex;
            align-items: flex-end;
            .text {
              font-size: 22px;
              font-weight: bolder;
              vertical-align: baseline;
            }
            .lessons-count {
              flex: 1;
              padding-left: 7.5px;
              color: $gray;
              font-size: 12px;
            }
          }
          .lessons-arrow {
            @include extend-click();
            position: absolute;
            right: 0;
            top: 0;
            font-size: 14px;
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

  }
</style>
