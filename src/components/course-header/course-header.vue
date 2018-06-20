<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="main">
        <div class="cover">
          <img :src="courseDetail.cover_url">
        </div>
        <div class="content">
          <h2 class="name">{{courseDetail.name}}</h2>
          <div class="bottom-wrapper">
            <div class="count">
              <i class="icon icon-learn-count"></i>
              <span class="text">{{courseDetail.views_count}}</span>
            </div>
            <div class="datetime">
              <i class="icon icon-datetime"></i>
              <span class="text">
                {{courseDetail.published_at_text}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-wrapper">
        <div class="intro">
          <span v-if="courseDetail.intro">简介：{{courseDetail.intro}}
            <br>
          </span>
          <span v-if="courseDetail.course_info && courseDetail.course_info.info_type">课程类型：{{courseDetail.course_info.info_type}}</span>
          <span
            v-if="!courseDetail.intro && !(courseDetail.course_info && courseDetail.course_info.info_type)">暂无简介信息</span>
        </div>
        <div class="detail-arrow" @click="showDetail">
          <i class="icon-arrow-down"></i>
        </div>
      </div>

      <div class="start-learn" @click="starToLearn">
        <cube-button class="start-button">
          {{lastLearnLessonId ? '继续学习' : '开始学习'}}
        </cube-button>
      </div>
    </div>

    <div class="background">
      <img :src="courseDetail.cover_url" width="100%" height="100%" alt="">
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {courseDetail} from '@/store/getters';

  const EVENT_SHOW_DETAIL = 'showDetail';

  export default {
    name: 'course-header',
    components: {},

    data() {
      return {};
    },

    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail',
        learningStatus: 'learningStatus',
        lessonList: 'lessonList',
      }),
      lastLearnLessonId() {
        const startLearn = this.learningStatus.last_learn_course_id && this.lessonList.length > 0;
        if (startLearn) {
          return this.learningStatus.last_learn_course_id;
        }
      },
    },

    methods: {
      ...mapActions({
        courseCreateAction: 'courseCreateAction',
      }),
      showDetail() {
        this.$emit(EVENT_SHOW_DETAIL);
      },
      starToLearn() {
        if (this.lastLearnLessonId) {
          this._setViewCourseCount();
          this.$router.push({path: `/lessons/${this.lastLearnLessonId}`});
        } else if (this.lessonList.length > 0) {
          this._setViewCourseCount();
          this.$router.push({path: `/lessons/${this.lessonList[0].id}`});
        } else {
          const toast = this.$createToast({
            txt: '暂无课时',
            type: 'correct',
            mask: false,
            time: 500,
          });
          toast.show();
        }
      },
      _setViewCourseCount() {
        this.courseCreateAction({course_id: this.courseDetail.id, type: 'view'});
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .header {
    position: relative;
    height: 217px;
    background: rgba(1, 1, 1, 0.7);
    .header-wrapper {
      position: relative;
      padding: 17.5px;
      color: $white;
      overflow: hidden;
      text-overflow: ellipsis;
      .main {
        display: flex;
        margin-bottom: 16px;
        .cover {
          /*flex: 0 0 76px;*/
          width: 109px;
          font-size: 0;
          > img {
            width: 109px;
            height: 76px;
            border-radius: 8px;
          }
        }
        .content {
          position: relative;
          width: 100%;
          padding-left: 17.5px;
          .name {
            @include multi-line-text(2);
            font-size: 13px;
            line-height: 16px;
            font-weight: 700;
          }
          .bottom-wrapper {
            position: absolute;
            bottom: 0;
            overflow: hidden;
            padding: 1px;
            .count {
              margin-bottom: 5px;
            }
            .count, .datetime {
              color: $white;
              display: flex;
              .icon {
                margin-right: 5px;
                font-size: 16px;
              }
              .text {
                font-size: 11px;
                line-height: 16px;
              }
            }
          }
        }
      }
      .intro-wrapper {
        display: flex;
        position: relative;
        flex-direction: row;
        justify-content: baseline;

        .intro {
          flex: 0 0 298px;
          @include multi-line-text(2);
          position: relative;
          font-size: 12px;
          line-height: 16px;
          min-height: 30px;
          margin-right: 35px;
        }
        .detail-arrow {
          @include extend-click();
          position: absolute;
          top: 0;
          right: 0;
          font-size: 14px;
        }
      }

      .start-learn {
        position: relative;
        display: flex;
        margin-top: 16px;
        .start-button {
          height: 42px;
          background-color: $red;
          border-radius: 6px;
          font-size: 18px;
          padding: 0 0;
        }
      }

    }
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }
  }
</style>
