<template>
  <div class="video-lesson">
    <div class="header-wrapper">
      <!--使用video.js-->
      <!--<video-->
      <!--id="my-player"-->
      <!--class="video-js"-->
      <!--controls-->
      <!--preload="auto"-->
      <!--width="100%"-->
      <!--height="212px"-->
      <!--poster="//vjs.zencdn.net/v/oceans.png"-->
      <!--data-setup='{}'>-->
      <!--&lt;!&ndash;<source :src="video.video_url" type="video/wmv"></source>&ndash;&gt;-->
      <!--<source src="http://vjs.zencdn.net/v/oceans.mp4" type="video/mp4">-->
      <!--</video>-->

      <div class="video-wrapper">
        <video :src="video.video_url"
               controls
               muted
               height="212px"
               width="100%"
               style="object-fit: fill"

        >

        </video>
      </div>

      <div class="lesson-detail">

        <h1 class="name">基本动作快乐教育快乐教育快乐教育快乐教育快乐教育快乐教育</h1>
        <div class="numbers">
          <div class="topic-count">
            <i class="icon-topic-count icon"></i>
            <span class="text">567</span>
          </div>
          <div class="datetime">
            <i class="icon-datetime icon"></i>
            <span class="text">6小时前</span>
          </div>
        </div>

        <div class="lesson-intro">
          <div class="left-content">
            <div class="course-name">
              <span class="text">所在课程：</span>
              <a href="" class="course-link">快乐教育</a>
            </div>
            <div class="intro">
              简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介
            </div>
          </div>

          <div class="course-detail-arrow">
            <i class="icon-arrow-down"></i>
          </div>
        </div>

      </div>
      <div class="course-detail-arrow">
        <i class="icon-arrow-down"></i>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "video-lesson",
    props: {
      video: {
        type: Object,
        default: function () {
          return {
            id: 0,
            title: '',
            video_url: '',
            cover_url: '',
            seconds: 0
          }
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .video-lesson {
    .header-wrapper {
      .video-wrapper {

      }

      .lesson-detail {
        margin-top: 15px;
        padding-left: 17.5px;
        /*padding-right: 17.5px;*/
        padding-right: 58px;
        /*margin-right: 40.5px;*/
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
            @include multi-line-text(1);
            .course-name {
              .course-link {
                color: $blue;
              }
            }
            .intro {

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

  }

</style>
