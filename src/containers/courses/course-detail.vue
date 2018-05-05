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
          <topic-list-view :course_id="courseDetail.id"
                           :topics_count="courseDetail.topics_count"></topic-list-view>
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
  import LessonListView from 'components/lesson-list/lesson-list-view'
  import TopicListView from 'components/topic-list/topic-list-view'

  export default {
    name: "course-detail",

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
      LessonListView,
      TopicListView
    },

    async created() {
      await this.setCourseDetail(this.course_id)
      await this.getItemList()
    },

    methods: {
      ...mapActions({
        setCourseDetail: 'setCourseDetail'
      }),
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
    }

  }
</style>
