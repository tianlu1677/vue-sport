<template>
  <div class="course-detail">

    <course-header @showDetail="showDetail(true)">
    </course-header>

    <div class="main">
      <!--写心得,喜欢等-->
      <div class="actions-wrapper">
        <div class="left-actions">
          <new-topic-icon text="写心得"
                          :course_id="courseDetail.id"
                          :course_type="courseDetail.type"
          ></new-topic-icon>
        </div>
        <div class="right-actions">
          <course-actions :courseDetail="courseDetail"></course-actions>
        </div>
      </div>
      <!--用户信息-->
      <div class="account-wrapper">
        <avatar :account="courseDetail.account" desc='发布者'></avatar>
      </div>
      <!--课时列表-->
      <lesson-list-view :courseId="courseDetail.id"
                        :learningStatus="learningStatus"
                        :lessonList="lessonList"
                        style="padding: 0"
      ></lesson-list-view>
      <div class="topics-wrapper">
        <div class="content">
          <h2 class="intro">心得</h2>
          <span class="topics-count">{{courseDetail.topics_count}}</span>
        </div>

        <div class="topics-content">
          <scroll :busy="busy" @loadMore="loadMore">
            <topic-list :topicList="itemList" :show_course_name="false"></topic-list>
          </scroll>
        </div>

      </div>
    </div>
    <transition name="fade">
      <course-info v-if="detailShow" @hideDetail="showDetail(false)">
      </course-info>
    </transition>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {mapActions, mapGetters} from 'vuex';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import {getCourseTopics} from '@/api/course_api';

  import CourseHeader from 'components/course-header/course-header';
  import CourseInfo from 'components/course-info/course-info';
  import CourseActions from 'components/course-actions/course-actions';
  import NewTopicIcon from 'components/actions/new-topic-icon';
  import Avatar from 'components/avatar/avatar';
  import LessonListView from 'components/lesson-list/lesson-list-view';
  import TopicList from 'components/topic-list/topic-list';

  export default {
    name: 'course-detail',
    mixins: [ScrollMixin],

    data() {
      return {
        lastLearnId: 1,
        course_id: parseInt(this.$route.params.id),
        detailShow: false,
      };
    },
    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail',
        lessonList: 'lessonList',
        learningStatus: 'learningStatus',
      }),
    },

    components: {
      CourseHeader,
      CourseActions,
      NewTopicIcon,
      Avatar,
      LessonListView,
      TopicList,
      Scroll,
      CourseInfo,
    },

    async created() {
      await this.setCourseDetail(this.course_id);
      await this.setLessonList(this.course_id);
      await this.setLearningStatus(this.course_id);
      await this._setDocumentTitle();
      this._setShareInfo();
    },
    activated() {
      // await this.setCourseDetail(this.course_id)
    },

    methods: {
      ...mapActions({
        setCourseDetail: 'setCourseDetail',
        setLessonList: 'setLessonList',
        setLearningStatus: 'setLearningStatus',
      }),
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.course_id, params);
        this.itemList = this.itemList.concat(res.data.topics);
        this.pagination(res.headers);
      },
      showDetail(status = true) {
        this.detailShow = status;
      },
      _setDocumentTitle() {
        document.title = `${this.courseDetail.name}`;
      },
      _setShareInfo() {
        const path = window.location.href;
        window.wechatShare({
          title: this.courseDetail.name,
          link: path,
          success: (res) => {
            this.courseCreateAction({course_id: this.course_id, type: 'share'});
          },
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .course-detail {
    position: relative;
    .main {
      position: relative;
      .actions-wrapper {
        padding: 17.5px 17.5px 0 17.5px;
        display: flex;
        flex: 1;
        position: relative;
        .left-actions {
        }
        .right-actions {
          position: absolute;
          right: 17.5px;
        }
      }
      .account-wrapper {
        padding: 0 17.5px 0 17.5px;
        position: relative;
        margin-top: 22.5px;
      }
      .topics-wrapper {
        position: relative;
        margin-top: 27.5px;
        padding: 0 17.5px 0 17.5px;
        .content {
          display: flex;
          align-items: flex-end;
          /*padding-bottom: 17.5px;*/
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

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }

  }
</style>
