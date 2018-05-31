<template>
  <div class="lesson-detail">
    <cube-scroll ref="scroll"
                 :data="itemList"
                 :options="scrollOptions"
                 @pulling-up="onPullingUp"
                 class="scroll-wrapper"
    >
      <!--富文本-->
      <div v-if="contentType === 'picture' " class="text-lesson-wrapper">
        <text-lesson :lessonDetail="lessonDetail"
                     :courseDetail="courseDetail">

        </text-lesson>
      </div>
      <!--视频-->
      <div v-else>
        <video-lesson :lessonDetail="lessonDetail"
                      :courseDetail="courseDetail"
                      @showCourseInfo="showDetail(true)">

        </video-lesson>
      </div>

      <lesson-list-view :courseId="parentCourseId"
                        :learningStatus="learningStatus"
                        :lessonList="lessonList"
                        class="lesson-list-view"
      ></lesson-list-view>

      <div class="topics-wrapper">
        <div class="content">
          <h2 class="intro">心得</h2>
          <span class="topics-count">{{lessonDetail.topics_count}}</span>
        </div>
        <div class="topics-content">
          <topic-list :topicList="itemList" :show_lesson_name="false"></topic-list>
        </div>
        <empty message="暂时没有心得" v-if="!itemList.length && !paginate.hasMore"></empty>
      </div>
    </cube-scroll>

    <div class="bottom-button border-top-1px">
      <div class="left">
        <span class="big" @click="showHideLessonList">
          <i class="icon-list"></i>
        </span>
        <span class="big" @click="nextLesson">
          <i class="icon-arrow-right"></i>
        </span>
      </div>

      <div class="right">
        <ul class="item-list">
          <li class="item">
            <new-topic-icon :count="lessonDetail.topics_count"
                            :course_id="lessonDetail.id"
                            :course_type="lessonDetail.type">

            </new-topic-icon>
          </li>
          <lesson-actions :courseDetail="lessonDetail"></lesson-actions>
        </ul>

      </div>
    </div>

    <transition name="fade">
      <course-info v-if="detailShow" @hideDetail="showDetail(false)" keep-alive>
      </course-info>
    </transition>
  </div>
</template>

<script>
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import LessonActions from 'components/lesson-actions/lesson-actions'
  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicList from 'components/topic-list/topic-list'
  // import IframeLesson from './iframe-lesson'
  import TextLesson from './text-lesson'
  import VideoLesson from './video-lesson'
  import CourseInfo from 'components/course-info/course-info'
  import Empty from 'components/empty/empty'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getCourseTopics} from "@/api/course_api"
  import {mapActions, mapGetters, mapMutations} from 'vuex'

  export default {
    name: "lesson-detail",
    mixins: [paginationMixin],
    components: {
      NewTopicIcon,
      TextLesson,
      VideoLesson,
      LessonActions,
      LessonListView,
      TopicList,
      CourseInfo,
      Empty
    },
    data() {
      return {
        detailShow: false
      }
    },
    async created() {
      await this.setLessonDetail(this.lesson_id)
      await this.setCourseDetail(this.lessonDetail.parent_id)
      await this.learnCourse({course_id: this.lesson_id})
      this.courseCreateAction({course_id: this.lesson_id, type: 'view'})
      await this.setLessonList(this.parentCourseId)
      await this.setLearningStatus(this.parentCourseId)
      this._setShareInfo()
    },

    async activated() {
    },

    watch: {
      async '$route'(to, from, next) {
        // this.$refs.scroll.scrollTo(0, 0)
        await this.setLessonDetail(this.lesson_id)
        await this.learnCourse({course_id: this.lesson_id})
        await this.setLessonList(this.parentCourseId)
        await this.setLearningStatus(this.parentCourseId)
        this.courseCreateAction({course_id: this.lesson_id, type: 'view'})
        this.itemList = []
        this.getItemList()
      }
    },

    async beforeRouteUpdate(to, from, next) {
      next()
    },
    async beforeRouteLeave(to, from, next) {
      next()
    },

    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
        courseDetail: 'courseDetail',
        lessonList: 'lessonList',
        learningStatus: 'learningStatus'
      }),
      ...mapMutations({
        updateLoading: 'UPDATE_LOADING'
      }),

      contentType() {
        if (this.lessonDetail.source_type === 'inside') {
          return this.lessonDetail.content_type
        } else {
          return 'outside'
        }
      },
      lesson_id() {
        return parseInt(this.$route.params.id)
      },
      parentCourseId() {
        return this.lessonDetail.parent_id
      }
    },

    methods: {
      ...mapActions([
        'setLessonDetail',
        'setCourseDetail',
        'courseCreateAction',
        'learnCourse',
        'lessonCreateAction',
        'setLessonList',
        'setLearningStatus'
      ]),
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.lesson_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      showHideLessonList() {
        this.lessonListDialog = this.$createLessonListDialog({course_id: this.lessonDetail.parent_id})
        this.lessonListDialog.show()
      },
      showDetail(status = false) {
        this.detailShow = status
      },
      nextLesson() {
        let next_lesson_id = this.lessonDetail.next_lesson_id
        if (next_lesson_id) {
          const toast = this.$createToast({
            txt: '进入到下一课',
            type: 'correct',
            mask: false,
            time: 500
          })
          toast.show()
          this.$router.push({path: '/lessons/' + this.lessonDetail.next_lesson_id})
        } else {
          const toast = this.$createToast({
            txt: '已经到最后一课了',
            type: 'correct',
            mask: false,
            time: 500
          })
          toast.show()
        }
      },
      _setShareInfo() {
        const path = window.location.href
        window.wechatShare({
          title: this.lessonDetail.name,
          link: path,
          success: (res) => {
            this.lessonCreateAction({lesson_id: this.lesson_id, type: 'share'})
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .lesson-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /*bottom: 60px;*/
    .scroll-wrapper {
      .lesson-list-view {
        position: relative;
        /*padding: 0 17.5px;*/
      }
      .topics-wrapper {
          position: relative;
          padding: 0 17.5px;
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
    .bottom-button {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 100;
      display: flex;
      padding: 17px 17.5px;
      font-size: 17px;
      background-color: $white;
      .left {
        flex: 1;
        display: flex;
        margin: auto;
        position: relative;
        .icon-list {
          margin-right: 40px;
          position: relative;
        }
        .big {
          @include extend-click();
        }
      }
      .right {
        .item-list {
          display: flex;
          .item {
            margin-right: 10px;
          }
          .item:last-child {
            margin-right: 0;
          }
        }
      }
    }
  }
</style>
