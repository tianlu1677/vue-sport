<template>
  <div class="learning-course-card" @click="goToCourseDetail">
    <div class="cover"><img :src="baseCourse.cover_url" :alt="baseCourse.id"></div>
    <div class="course-content">
      <h2 class="name" :class="courseNameLine">{{baseCourse.name}}</h2>
      <h2 class="course-name" v-if="baseCourse.type==='clazz'">{{baseCourse.parent_course_name}}</h2>
      <div class="bottom-wrapper">
        <span class="text">{{baseCourse.views_count | format_number}} 人学过</span>
        <span>{{baseCourse.topics_count | format_number}} 篇心得</span>
      </div>
    </div>
    <div class="learn-status">
      <div class="learned" v-if="learning.id">
        <i class="icon-learned"></i>
        <span class="text">已学过</span>
      </div>

      <div class="no-learned" v-if="!learning.id">
        <i class="icon-no-learn"></i>
        <span class="text">去学习</span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  const EVENT_SELECT = 'select'
  export default {
    name: 'learning-course-card',
    props: {
      link: {
        type: Boolean,
        default: true
      },
      learning: {
        type: Object,
        default() {
          return {}
        }
      },
    },
    computed: {
      ...mapGetters({
        topicDetail: 'topicDetail',
        currentAccount: 'currentAccount'
      }),
      baseCourse() {
        return this.topicDetail.lesson || this.topicDetail.course
      },
      courseNameLine() {
        return this.courseType === 'clazz' ? 'single-line' : 'multi-line'
      },
      courseType() {
        return this.baseCourse.type
      }
    },
    methods: {
      goToCourseDetail() {
        if (this.courseType === 'course') {
          this.$router.push({
            path: `/courses/${this.baseCourse.id}`
          })
        } else {
          this.$router.push({
            path: `/lessons/${this.baseCourse.id}`
          })
        }

        this.$emit(EVENT_SELECT, this.baseCourse)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .learning-course-card {
    display: flex;
    padding: 10px;
    border: 1px solid $light_gray; /* off */
    border-radius: 6px;
    .cover {
      flex: 0 0 87px;
      font-size: 0;
      box-sizing: border-box;
      margin-right: 10px;
      img {
        width: 87px;
        height: 60px;
        border-radius: 6px;
      }
    }
    .course-content {
      flex: 1;
      position: relative;
      .name {
        line-height: 16px;
        font-size: 13px;
        font-weight: bold;
      }
      .single-line {
        @include multi-line-text(1);
      }
      .multi-line {
        @include multi-line-text(2);
      }
      .course-name {
        @include multi-line-text(1);
        margin-top: 8px;
        font-size: 12px;
        line-height: 18px;
        color: $gray;
      }
      .bottom-wrapper {
        position: absolute;
        bottom: 0;
        line-height: 16px;
        font-size: 12px;
        color: $blue;
        span:first-child {
          margin-right: 20px;
        }
        .text {

        }
      }

    }
    .learn-status {
      margin-top: 9px;
      margin-left: 20px;
      margin-right: 15px;
      text-align: center;
      font-size: 26px;
      .learned, .no-learned {
        display: flex;
        flex-direction: column;
        .text {
          margin-top: 7.5px;
          font-size: 10px;
        }
        .icon-learned, .icon-learned {
          font-weight: 700;
        }
      }
      .learned {
        color: $gray;
      }
      .no-learned {
        color: $blue;
      }
    }
  }
</style>
