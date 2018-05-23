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


    <div class="video-wrapper">
      <video :src="lessonDetail.video.video_url"
             controls
             muted
             height="212px"
             width="100%"
             :poster="lessonDetail.video.cover_url"
      >
      </video>
    </div>

    <div class="video-detail">

      <h1 class="name">{{lessonDetail.name}}</h1>
      <div class="numbers">
        <div class="topic-count">
          <i class="icon-topic-count icon"></i>
          <span class="text">{{lessonDetail.topics_count}}</span>
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
      })
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
    #video {
      width: 100%;
      height: 212px;
      overflow: hidden;
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

  /*
  Player Skin Designer for Video.js
  http://videojs.com

  To customize the player skin edit
  the CSS below. Click "details"
  below to add comments or questions.
  This file uses some SCSS. Learn more
  at http://sass-lang.com/guide)

  This designer can be linked to at:
  https://codepen.io/heff/pen/EarCt/left/?editors=010
*/
  .video-js {
    /* The base font size controls the size of everything, not just text.
       All dimensions use em-based sizes so that the scale along with the font size.
       Try increasing it to 15px and see what happens. */
    font-size: 14px;
    /* The main font color changes the ICON COLORS as well as the text */
    color: #fff;
  }

  /* The "Big Play Button" is the play button that shows before the video plays.
     To center it set the align values to center and middle. The typical location
     of the button is the center, but there is trend towards moving it to a corner
     where it gets out of the way of valuable content in the poster image.*/
  .vjs-default-skin .vjs-big-play-button {
    /* The font size is what makes the big play button...big.
       All width/height values use ems, which are a multiple of the font size.
       If the .video-js font-size is 10px, then 3em equals 30px.*/
    font-size: 3em;
    /* We're using SCSS vars here because the values are used in multiple places.
       Now that font size is set, the following em values will be a multiple of the
       new font size. If the font-size is 3em (30px), then setting any of
       the following values to 3em would equal 30px. 3 * font-size. */
    /* 1.5em = 45px default */
    line-height: 1.5em;
    height: 1.5em;
    width: 3em;
    /* 0.06666em = 2px default */
    border: 0.06666em solid #fff;
    /* 0.3em = 9px default */
    border-radius: 0.3em;
    /* Align top left. 0.5em = 15px default */
    left: 5em;
    top: 5em;
  }

  /* The default color of control backgrounds is mostly black but with a little
     bit of blue so it can still be seen on all-black video frames, which are common. */
  .video-js .vjs-control-bar,
  .video-js .vjs-big-play-button,
  .video-js .vjs-menu-button .vjs-menu-content {
    /* IE8 - has no alpha support */
    background-color: #2B333F;
    /* Opacity: 1.0 = 100%, 0.0 = 0% */
    background-color: rgba(43, 51, 63, 0.7);
  }

  /* Slider - used for Volume bar and Progress bar */
  .video-js .vjs-slider {
    background-color: #73859f;
    background-color: rgba(115, 133, 159, 0.5);
  }

  /* The slider bar color is used for the progress bar and the volume bar
     (the first two can be removed after a fix that's coming) */
  .video-js .vjs-volume-level,
  .video-js .vjs-play-progress,
  .video-js .vjs-slider-bar {
    background: #fff;
  }

  /* The main progress bar also has a bar that shows how much has been loaded. */
  .video-js .vjs-load-progress {
    /* For IE8 we'll lighten the color */
    background: #bfc7d3;
    /* Otherwise we'll rely on stacked opacities */
    background: rgba(115, 133, 159, 0.5);
  }

  /* The load progress bar also has internal divs that represent
     smaller disconnected loaded time ranges */
  .video-js .vjs-load-progress div {
    /* For IE8 we'll lighten the color */
    background: white;
    /* Otherwise we'll rely on stacked opacities */
    background: rgba(115, 133, 159, 0.75);
  }


</style>
