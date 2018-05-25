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

    <div class="video-wrapper" v-if="lessonDetail.source_type === 'outside'">
      <div class="out-link">
        <a :href="lessonDetail.outside_link" class="link">
          点击查看
        </a>
      </div>
    </div>
    <div class="video-wrapper" v-else>
      <video :src="videoUrl"
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
    <div class="course-detail-arrow">
      <i class="icon-arrow-down"></i>
    </div>
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar'
  import {mapActions, mapGetters} from 'vuex'

  export default {
    name: "video-lesson",
    components: {
      Avatar,
    },
    data() {
      return {
        detailShow: false
      }
    },

    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail',
        courseDetail: 'courseDetail'
      }),
      videoUrl() {
        if (this.lessonDetail.video) {
          return this.lessonDetail.video.video_url
        }
      },
      coverUrl() {
        if (this.lessonDetail.video) {
          return this.lessonDetail.video.cover_url
        }
      },

    },
    methods: {
      goCourse() {
        this.$router.push({path: `/courses/${this.lessonDetail.parent_id}`})
      },
      showDetail() {
        console.log('showCourseInfo')
        this.$emit('showCourseInfo')
      },
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/mixin";

  .video-lesson {
    .video-wrapper {
      .mobile-video {
        width: 100%;
        max-height: 240px;
      }
      .out-link {
        display: flex;
        margin: 17.5px;
        height: 100px;
        border: 1px solid $gray;
        border-radius: 10px;

        .link {
          flex: 1;
          margin: auto;
          text-align: center;
        }

      }
    }
    .video-detail {
      margin-top: 15px;
      padding-left: 17.5px;
      padding-right: 58px;
      .name {
        font-size: 14px;
        font-weight: bolder;
        line-height: 17px;
      }
      .numbers {
        display: flex;
        margin-top: 11px;
        .topic-count, .datetime {
          display: flex;
          margin-right: 16px;
          font-size: 0;
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
        margin-top: 15px;
        margin-bottom: 22px;
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
        }
      }
    }
    .course-detail-arrow {
      position: absolute;
      z-index: 1;
      top: 0;
      right: -17.5px;
    }
  }
</style>
