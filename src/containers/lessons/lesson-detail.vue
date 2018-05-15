<template>
  <div class="lesson-detail">
    <div class="main">
      <cube-scroll ref="scroll"
                   :data="itemList"
                   :options="scrollOptions"
                   @pulling-up="onPullingUp"

      >
        <!--内链iframe-->
        <div v-if="contentType === 'outside' ">
          <iframe-lesson :url="lessonDetail.outside_link"></iframe-lesson>
        </div>

        <!--富文本-->
        <div v-else-if="contentType === 'picture' " class="text-lesson-wrapper">
          <text-lesson :lessonDetail="lessonDetail" :courseDetail="courseDetail"></text-lesson>
        </div>
        <!--视频-->
        <div v-else-if="contentType === 'video' ">
          <video-lesson :video="lessonDetail.video"></video-lesson>
        </div>

        <div class="common">
          <lesson-list-view :course_id="courseDetail.id"
                            :lessons_count="courseDetail.lessons_count"
          ></lesson-list-view>

          <div class="topics-wrapper">
            <div class="content">
              <h2 class="intro">心得</h2>
              <span class="topics-count">{{lessonDetail.topics_count}}</span>
            </div>
            <div class="topics-content">
              <topic-list :topicList="itemList"></topic-list>
            </div>
          </div>
        </div>


      </cube-scroll>
    </div>

    <div class="bottom-button">
      <div class="left">
        <span class="icon-list" @click="showHideLessonList"></span>
        <span class="icon-arrow-right" @click="nextLesson"></span>
      </div>

      <div class="right">
        <ul class="item-list">
          <li class="item">
            <new-topic-icon count="76"></new-topic-icon>
          </li>
          <lesson-actions :courseDetail="lessonDetail"></lesson-actions>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import LessonActions from 'components/lesson-actions/lesson-actions'

  import LessonListView from 'components/lesson-list/lesson-list-view'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import TopicList from 'components/topic-list/topic-list'

  import {getCourseTopics} from "@/api/course_api"

  import IframeLesson from './iframe-lesson'
  import TextLesson from './text-lesson'
  import VideoLesson from './video-lesson'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "lesson-detail",
    mixins: [paginationMixin],
    components: {
      NewTopicIcon,
      IframeLesson,
      TextLesson,
      VideoLesson,
      LessonActions,
      LessonListView,
      TopicList
    },
    data() {
      return {
        lesson_id: this.$route.params.id,
      }
    },
    async created() {
      await this.setLessonDetail(this.lesson_id)
      await this.setCourseDetail(this.lessonDetail.parent_id)
      this.courseCreateAction({course_id: this.lesson_id, type: 'view'})
      this.learnCourse({course_id: this.lesson_id})
      this.getItemList()
    },
    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
        courseDetail: 'courseDetail'
      }),

      contentType() {
        if (this.lessonDetail.source_type === 'inside') {
          return this.lessonDetail.content_type
        } else {
          return 'outside'
        }
      }
    },

    methods: {
      ...mapActions([
        'setLessonDetail',
        'setCourseDetail',
        'courseCreateAction',
        'learnCourse'
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
      nextLesson() {
        let next_lesson_id = this.lessonDetail.next_lesson_id
        if (next_lesson_id) {
          this.$router.push({path: '/lessons/' + this.lessonDetail.next_lesson_id})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .lesson-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
      /*.text-lesson-wrapper {*/
      /*height: 100%;*/
      /*}*/
      .common {
        padding: 0 17.5px;
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
    .bottom-button {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      padding: 17px 17.5px;
      font-size: 17px;
      background-color: $white;
      .left {
        .icon-list {
          margin-right: 40px;
        }
      }
      .left {
        flex: 1;
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
