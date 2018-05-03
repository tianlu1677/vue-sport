<template>
  <div class="lesson-detail">
    <div class="main">
      <cube-scroll ref="scroll">
        <!--内链iframe-->
        <div v-if="contentType === 'outside' ">
          <iframe-lesson :url="lessonDetail.outside_link"></iframe-lesson>
        </div>

        <!--富文本-->
        <div v-else-if="contentType === 'picture' ">
          <text-lesson :lessonDetail="lessonDetail"></text-lesson>
        </div>
        <!--视频-->
        <div v-else-if="contentType === 'video' ">
          <video-lesson :video="lessonDetail.video"></video-lesson>
        </div>
      </cube-scroll>
    </div>

    <div class="bottom-button">
      <div class="left">
        <span class="icon-list"></span>
        <span class="icon-arrow-right"></span>
      </div>

      <div class="right">
        <ul class="item-list">
          <li class="item">
            <new-topic-icon count="76"></new-topic-icon>
          </li>
          <li class="item">
            <praise-icon></praise-icon>
          </li>
          <li class="item">
            <star-icon></star-icon>
          </li>
          <li class="item">
            <share-icon></share-icon>
          </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<script>
  import ActionList from 'components/actions/action-list'
  import NewTopicIcon from 'components/actions/new-topic-icon'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import StarIcon from 'components/actions/star-icon'

  import IframeLesson from './iframe-lesson'
  import TextLesson from './text-lesson'
  import VideoLesson from './video-lesson'
  import {mapActions, mapGetters} from 'vuex'
  import {setLessonDetail} from "@/store/actions";

  export default {
    name: "lesson-detail",
    components: {
      NewTopicIcon,
      PraiseIcon,
      ShareIcon,
      StarIcon,
      ActionList,

      IframeLesson,
      TextLesson,
      VideoLesson
    },
    data() {
      return {
        lesson_id: this.$route.params.id,
      }
    },
    created() {
      this.setLessonDetail(this.lesson_id)
      this.courseCreateAction(this.lesson_id)
    },
    computed: {
      ...mapGetters({
        lessonDetail: 'lessonDetail'
      }),

      contentType() {
        if (this.lessonDetail.source_type === 'inside') {
          return this.lessonDetail.content_type
        } else {
          return 'outside'
        }
      }
    },

    methods: {
      ...mapActions([
        'setLessonDetail',
        'courseCreateAction'
      ])
    }

  }
</script>

<style scoped lang="scss">
  .lesson-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .main {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 50px;
    }
    .bottom-button {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      padding: 17px 17.5px;
      font-size: 17px;
      background-color: $white;
      .left {
        .icon-list {
          margin-right: 40px;
        }
      }
      .left {
        flex: 1;
      }
      .right {
        .item-list {
          display: flex;
          .item {
            margin-right: 10px;
          }
          .item:last-child {
            margin-right: 0;
          }
        }

      }
    }
  }
</style>
