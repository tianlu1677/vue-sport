<template>
  <div class="lesson-detail">
    <template v-if="contentType === 'picture' ">
      <text-lesson :lessonDetail="lessonDetail"
                   :courseDetail="courseDetail">

      </text-lesson>
    </template>
    <!--视频-->
    <template v-else>
      <video-lesson @showCourseInfo="showDetail(true)">

      </video-lesson>
    </template>

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
        <scroll :busy="busy" :empty="itemList.length < 1" @loadMore="loadMore">
          <topic-list :topicList="itemList" :show_lesson_name="false"></topic-list>
        </scroll>
      </div>

    </div>

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
        <lesson-actions :courseDetail="lessonDetail"></lesson-actions>
      </div>
    </div>

    <transition name="fade">
      <course-info v-if="detailShow" @hideDetail="showDetail(false)" keep-alive>
      </course-info>
    </transition>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import NewTopicIcon from 'components/actions/new-topic-icon';
  import LessonActions from 'components/lesson-actions/lesson-actions';
  import LessonListView from 'components/lesson-list/lesson-list-view';
  import TopicList from 'components/topic-list/topic-list';
  import CourseInfo from 'components/course-info/course-info';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import {getLessonTopics} from '@/api/lesson_api';
  import {mapActions, mapGetters, mapMutations} from 'vuex';
  import TextLesson from './text-lesson';
  import VideoLesson from './video-lesson';

  export default {
    name: 'lesson-detail',
    mixins: [ScrollMixin],
    components: {
      Scroll,
      NewTopicIcon,
      TextLesson,
      VideoLesson,
      LessonActions,
      LessonListView,
      TopicList,
      CourseInfo,
    },
    data() {
      return {
        detailShow: false,
      };
    },
    async created() {
      await this.setLessonDetail(this.lesson_id);
      await this.setCourseDetail(this.lessonDetail.course_id);
      await this.learnCourse({lesson_id: this.lesson_id});
      this.lessonCreateAction({lesson_id: this.lesson_id, type: 'view'});
      await this.setLessonList(this.parentCourseId);
      await this.setLearningStatus(this.parentCourseId);
      this._setShareInfo();
      await this._setDocumentTitle();
    },

    async activated() {
    },

    watch: {
      async $route(to, from, next) {
        await this.setLessonDetail(this.lesson_id);
        await this.learnCourse({lesson_id: this.lesson_id});
        await this.setLessonList(this.parentCourseId);
        await this.setLearningStatus(this.parentCourseId);
        this.lessonCreateAction({lesson_id: this.lesson_id, type: 'view'});
        this.itemList = [];
        this.getItemList();
      },
    },

    async beforeRouteUpdate(to, from, next) {
      next();
    },
    async beforeRouteLeave(to, from, next) {
      next();
    },

    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
        courseDetail: 'courseDetail',
        lessonList: 'lessonList',
        learningStatus: 'learningStatus',
      }),
      ...mapMutations({
        updateLoading: 'UPDATE_LOADING',
      }),

      contentType() {
        if (this.lessonDetail.source_type === 'inside') {
          return this.lessonDetail.content_type;
        }
        return 'outside';
      },
      lesson_id() {
        return parseInt(this.$route.params.id);
      },
      parentCourseId() {
        return this.lessonDetail.course_id;
      },
    },

    methods: {
      ...mapActions([
        'setLessonDetail',
        'setCourseDetail',
        'courseCreateAction',
        'learnCourse',
        'lessonCreateAction',
        'setLessonList',
        'setLearningStatus',
      ]),
      async getItemList(params = {}) {
        const res = await getLessonTopics(this.lesson_id, params);
        this.itemList = this.itemList.concat(res.data.topics);
        this.pagination(res.headers);
      },
      showHideLessonList() {
        this.lessonListDialog = this.$createLessonListDialog({course_id: this.lessonDetail.course_id});
        this.lessonListDialog.show();
      },
      showDetail(status = false) {
        this.detailShow = status;
      },
      nextLesson() {
        const next_lesson_id = this.lessonDetail.next_lesson_id;
        if (next_lesson_id) {
          const toast = this.$createToast({
            txt: '进入到下一课',
            type: 'correct',
            mask: false,
            time: 500,
          });
          toast.show();
          this.$router.push({path: `/lessons/${this.lessonDetail.next_lesson_id}`});
        } else {
          const toast = this.$createToast({
            txt: '已经到最后一课了',
            type: 'correct',
            mask: false,
            time: 500,
          });
          toast.show();
        }
      },
      _setDocumentTitle() {
        document.title = `${this.lessonDetail.name}`;
      },
      _setShareInfo() {
        const path = window.location.href;
        window.wechatShare({
          title: this.lessonDetail.name,
          link: path,
          imgUrl: this.lessonDetail.cover_url,
          success: (res) => {
            this.lessonCreateAction({lesson_id: this.lesson_id, type: 'share'});
          },
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .lesson-detail {
    margin-bottom: 90px;
    position: relative;
    .lesson-list-view {
      position: relative;
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
        display: flex;
        flex: 1;
        margin: auto;
        position: relative;
        .icon-list {
          margin-right: 40px;
          position: relative;
        }
        .big {
          @include extend-click();
          .icon-arrow-right {
            font-size: 13px;
            font-weight: 900;
          }
        }
      }
      .right {
        display: flex;
      }
    }
  }
</style>
