<template>
  <div class="video-lesson">

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
      <video :src="lessonDetail.video.video_url"
             controls
             muted
             height="212px"
             width="100%"
             poster="//vjs.zencdn.net/v/oceans.png"
             style="object-fit: fill"
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
          <span class="text">{{lessonDetail.published_at}}</span>
        </div>
      </div>

      <div class="lesson-intro">
        <div class="left-content">
          <div class="course-name">
            <span class="text">所在课程：</span>
            <span class="course-link" @click="goCourse">{{lessonDetail.parent_course_name}}</span>
          </div>
          <div class="intro">
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

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .video-lesson {
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
