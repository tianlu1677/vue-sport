<template>
  <div class="video-lesson">

    <!--使用video.js-->
    <!--<video id="video" class="video-js"-->
    <!--controls-->
    <!--preload="auto"-->
    <!--width="100%"-->
    <!--height="212"-->
    <!--:poster="lessonDetail.video.cover_url"-->
    <!--data-setup="{}"-->
    <!--&gt;-->
    <!--<source :src="lessonDetail.video.video_url" type='video/mp4'>-->
    <!--&lt;!&ndash;<source src="MY_VIDEO.webm" type='video/webm'>&ndash;&gt;-->
    <!--<p class="vjs-no-js">-->
    <!--当前不支持视频播放，请刷重试-->
    <!--<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>-->
    <!--</p>-->
    <!--</video>-->

    <div class="out-link-wrapper" v-if="lessonDetail.source_type === 'outside'">
      <div class="content">
        <a :href="lessonDetail.outside_link" target="_blank">
          <cube-button class="start-button">
            立即查看
          </cube-button>
        </a>
      </div>
      <div class="background">
        <img :src="lessonDetail.cover_url" width="100%" height="100%" alt="">
      </div>
    </div>
    <div class="video-wrapper" v-else>
      <video webkit-playsinline playsinline :src="videoUrl"
             controls
             width="100%"
             class="mobile-video"
             :poster="coverUrl"
      >
      </video>
    </div>

    <div class="video-detail">
      <h1 class="name">{{lessonDetail.name}}</h1>
      <div class="numbers">
        <div class="topic-count">
          <i class="icon-learn-count icon"></i>
          <span class="text">{{lessonDetail.views_count}}</span>
        </div>
        <div class="datetime">
          <i class="icon-datetime icon"></i>
          <span class="text">{{lessonDetail.published_at_text}}</span>
        </div>
      </div>

      <div class="lesson-intro">
        <div class="left-content">
          <div class="course-name">
            <span class="text">所在课程：</span>
            <span class="course-link" @click="goCourse">{{lessonDetail.parent_course_name}}</span>
          </div>
          <div class="intro" v-show="courseDetail.intro">
            简介：{{courseDetail.intro}}
          </div>
        </div>
        <div class="course-detail-arrow" @click="showDetail">
          <i class="icon-arrow-down"></i>
        </div>
      </div>

      <avatar :account="courseDetail.account" desc='发布者'></avatar>
    </div>
    <!--<div class="course-detail-arrow">-->
    <!--<i class="icon-arrow-down"></i>-->
    <!--</div>-->
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar';
  import {mapGetters} from 'vuex';

  export default {
    name: 'video-lesson',
    components: {
      Avatar,
    },
    data() {
      return {
        detailShow: false,
      };
    },

    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
        courseDetail: 'courseDetail',
      }),
      videoUrl() {
        if (this.lessonDetail.video) {
          return this.lessonDetail.video.video_url;
        }
      },
      coverUrl() {
        if (this.lessonDetail.video) {
          return this.lessonDetail.video.cover_url;
        }
      },

    },
    methods: {
      goCourse() {
        this.$router.push({path: `/courses/${this.lessonDetail.parent_id}`});
      },
      showDetail() {
        console.log('showCourseInfo');
        this.$emit('showCourseInfo');
      },
    },
  };
</script>

<style lang="scss">
  @import "../../common/styles/mixin";

  .video-lesson {
    .out-link-wrapper {
      position: relative;
      height: 217px;
      box-sizing: border-box;
      background: rgba(1, 1, 1, 0.6);
      .content {
        position: relative;
        height: 217px;
        display: flex;
        justify-content: center;
        align-items: center;

        .start-button {
          height: 42px;
          width: 126px;
          border-radius: 6px;
          font-size: 18px;
          padding: 0 0;
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

    .video-wrapper {
      .mobile-video {
        width: 100%;
        max-height: 240px;
        min-height: 240px;
      }
    }
    .video-detail {
      margin-top: 15px;
      padding-left: 17.5px;
      padding-right: 58px;
      .name {
        font-size: 14px;
        font-weight: normal;
        line-height: 17px;
      }
      .numbers {
        display: flex;
        margin-top: 11px;
        color: $gray;
        .topic-count, .datetime {
          display: flex;
          margin-right: 16px;
          font-size: 0;
          .icon-learn-count:before, .icon-datetime:before {
            color: #9e9e9e;
          }
          .icon {
            margin-right: 4.5px;
            font-size: 16px;
          }
          .text {
            font-size: 12px;
            margin: auto;
          }
        }
      }

      .lesson-intro {
        display: flex;
        position: relative;
        margin-top: 14px;
        margin-bottom: 20px;
        font-size: 12px;
        color: $gray;
        line-height: 19px;
        .left-content {
          .course-name {
            @include multi-line-text(1);
            .course-link {
              color: $blue;
            }
          }
          .intro {
            @include multi-line-text(2);
          }
        }
        .course-detail-arrow {
          position: absolute;
          top: 0;
          right: -40.5px;
          font-size: 16px;
          color: $black;
          .icon-arrow-down {
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
    }

  }
</style>
