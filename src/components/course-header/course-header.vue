<template>
  <div class="header">
    <div class="header-wrapper">
      <div class="main">
        <div class="cover">
          <img :src="courseDetail.cover_url" width="109" height="76" style="border-radius: 10px">
        </div>
        <div class="content">
          <h2 class="name">{{courseDetail.name}}</h2>
          <div class="bottom-wrapper">
            <div class="count">
              <i class="icon-learn-count"></i>
              <span class="text">{{courseDetail.views_count}}</span>
            </div>
            <div class="datetime">
              <i class="icon-datetime"></i>
              <span class="text">
                {{courseDetail.published_at_text}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="intro-wrapper">
        <div class="intro">
          <span v-if="courseDetail.intro">简介：{{courseDetail.intro}}</span>
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
  import {mapGetters} from 'vuex'
  import {courseDetail} from "@/store/getters";

  const EVENT_SHOW_DETAIL = 'showDetail'

  export default {
    name: "course-header",
    components: {},

    data() {
      return {}
    },

    computed: {
      ...mapGetters({
        courseDetail: 'courseDetail',
        learningStatus: 'learningStatus'
      }),
      lastLearnLessonId() {
        if (this.learningStatus && this.learningStatus.last_learn_course_id) {
          return this.learningStatus.last_learn_course_id
        }
      }
    },

    methods: {
      showDetail() {
        this.$emit(EVENT_SHOW_DETAIL)
      },
      starToLearn() {
        if (this.lastLearnLessonId) {
          this.$router.push({path: `/lessons/${this.lastLearnLessonId}`})
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .header {
    position: relative;
    height: 217px;
    background: rgba(1, 1, 1, 0.5);
    .header-wrapper {
      position: relative;
      padding: 17.5px;
      color: $white;
      overflow: hidden;
      text-overflow: ellipsis;
      .main {
        display: flex;
        margin-bottom: 16.5px;
        .cover {
          flex: 0 0 76px;
          width: 109px;
          padding-right: 17.5px;
        }
        .content {
          position: relative;
          width: 100%;
          .name {
            @include multi-line-text(2);
            font-size: 14px;
            line-height: 18px;
          }
          .bottom-wrapper {
            position: absolute;
            bottom: 0;
            overflow: hidden;
            .count {
              margin-bottom: 5px;
            }
            .count, .datetime {
              font-size: 16px;
              .text {
                font-size: 12px;
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
          line-height: 15px;
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
        margin: 16.5px 0px 16.5px 0px;
        display: flex;
        height: 42.5px;
        .start-button {
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
