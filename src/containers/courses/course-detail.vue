<template>
  <div>
    <div class="course-detail">
      <cube-scroll ref="scroll"
                   class="detail-content"
                   :data="itemList"
                   :options="scrollOptions"
                   @pulling-up="onPullingUp"
      >
        <course-header @showDetail="showDetail(true)">
        </course-header>

        <div class="main" @touchmove.prevent>
          <!--写心得,喜欢等-->
          <div class="actions-wrapper">
            <new-topic-icon text="写心得"
                            :course_id="courseDetail.id"
                            :course_type="courseDetail.type"
            ></new-topic-icon>
            <div class="right-actions">
              <course-actions :courseDetail="courseDetail"></course-actions>
            </div>
          </div>
          <!--用户信息-->
          <div class="account-wrapper">
            <avatar :account="courseDetail.account" desc='发布者'></avatar>
          </div>
          <!--课时列表-->
          <lesson-list-view :course_id="courseDetail.id"
                            :lessons_count="courseDetail.lessons_count"
          ></lesson-list-view>
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

      <course-info v-if="detailShow" @hideDetail="showDetail(false)">
      </course-info>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import CourseHeader from 'components/course-header/course-header'
  import CourseInfo from 'components/course-info/course-info'
  import CourseActions from 'components/course-actions/course-actions'
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import Avatar from 'components/avatar/avatar'
  import LessonListView from 'components/lesson-list/lesson-list-view'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import TopicList from 'components/topic-list/topic-list'
  import {getCourseTopics} from "@/api/course_api"

  export default {
    name: "course-detail",
    mixins: [paginationMixin],

    data() {
      return {
        course_id: parseInt(this.$route.params.id),
        detailShow: false,
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
      LessonListView,
      TopicList,
      CourseInfo
    },

    async created() {
      await this.setCourseDetail(this.course_id)
      await this.getItemList()
    },

    methods: {
      ...mapActions({
        setCourseDetail: 'setCourseDetail'
      }),
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.course_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
      showDetail(status = true) {
        this.detailShow = status
      },
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
        display: flex;
        position: relative;
        .right-actions {
          flex: 1;
          position: absolute;
          top: 0;
          right: 20.5px;
        }
      }
      .account-wrapper {
        position: relative;
        margin-top: 22.5px;
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
