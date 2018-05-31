<template>
  <div class="course-detail">
    <!--<cube-scroll ref="scroll"-->
    <!--class="detail-content"-->
    <!--:data="itemList"-->
    <!--:options="scrollOptions"-->
    <!--@pulling-up="onPullingUp"-->
    <!--&gt;-->
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
            <div v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="5"
                 class="scroll-content">

              <div class="topics-content">
                <topic-list :topicList="itemList" :show_course_name="false"></topic-list>
              </div>

              <loading v-if="busy"></loading>
              <empty message="暂时没有心得" v-if="!itemList.length && !busy"></empty>
            </div>

          </div>
        </div>
    <!--</cube-scroll>-->
      <transition name="fade">
        <course-info v-if="detailShow" @hideDetail="showDetail(false)">
        </course-info>
      </transition>
    </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  // import {paginationMixin} from "components/mixin/pagination_mixin"
  import {ScrollMixin} from "components/mixin/scroll_mixin"
  import {getCourseTopics} from "@/api/course_api"

  import CourseHeader from 'components/course-header/course-header'
  import CourseInfo from 'components/course-info/course-info'
  import CourseActions from 'components/course-actions/course-actions'
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import Avatar from 'components/avatar/avatar'
  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicList from 'components/topic-list/topic-list'
  // import Loading from 'base/loading/loading'
  // import Empty from 'components/empty/empty'

  export default {
    name: "course-detail",
    // mixins: [paginationMixin],
    mixins: [ScrollMixin],

    data() {
      return {
        lastLearnId: 1,
        course_id: parseInt(this.$route.params.id),
        detailShow: false,
      }
    },
    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail',
        lessonList: 'lessonList',
        learningStatus: 'learningStatus'
      })
    },

    components: {
      CourseHeader,
      CourseActions,
      NewTopicIcon,
      Avatar,
      LessonListView,
      TopicList,
      CourseInfo,
      // Empty,
      // Loading
    },

    async created() {
      await this.setCourseDetail(this.course_id)
      await this.setLessonList(this.course_id)
      await this.setLearningStatus(this.course_id)
      this._setShareInfo()
    },
    async activated() {
      // await this.setCourseDetail(this.course_id)
    },

    methods: {
      ...mapActions({
        setCourseDetail: 'setCourseDetail',
        courseCreateAction: 'courseCreateAction',
        setLessonList: 'setLessonList',
        setLearningStatus: 'setLearningStatus'
      }),
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.course_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      showDetail(status = true) {
        this.detailShow = status
      },
      _setShareInfo() {
        const path = window.location.href
        window.wechatShare({
          title: this.courseDetail.name,
          link: path,
          success: (res) => {
            this.courseCreateAction({course_id: this.course_id, type: 'share'})
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .course-detail {
    position: relative;
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*-webkit-transform: translateZ(0);*/
    .main {
      position: relative;
      .actions-wrapper {
        padding: 17.5px 17.5px 0 17.5px;
        display: flex;
        flex: 1;
        position: relative;
        .left-actions {
          margin-right: 70px;
        }
        .right-actions {
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

    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
      opacity: 0;
    }

  }
</style>
