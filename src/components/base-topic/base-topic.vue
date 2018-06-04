<template>
  <div class="topic-wrapper">
    <div class="account-wrapper">
      <avatar :account="baseTopic.account" :desc="desc" :time="baseTopic.published_at_text"></avatar>
    </div>
    <div class="main">
      <h2 class="lesson-name" @click="goLesson" v-if="show_lesson_name">{{baseTopic.course_name}}</h2>
      <div class="content-wrapper" @click="goTopic">
        <div class="content" v-html="baseTopic.plain_content"></div>
        <div class="media" v-if="media_length > 0">
          <ul class="item-list">
            <li class="media-item" v-for="media in baseTopic.medias.slice(0,3)">
              <img :src="media" alt="" class="media-single" v-if="baseTopic.medias.length === 1">
              <img :src="media" alt="" class="media-multi" v-else>
            </li>
            <li class="media-count" v-if="media_length">
              {{`${media_length} +`}}
            </li>
          </ul>
        </div>
      </div>
      <h2 class="course-name" @click="goCourse()" v-if="show_course_name">
        {{baseTopic.parent_course_name}}
      </h2>
    </div>
    <div class="bottom">
      <ul class="actions">
        <li class="item">
          <topic-actions :topicDetail="baseTopic" :actions="{praise: true}">
          </topic-actions>
        </li>
        <li class="item" @click="goTopic">
          <comment-icon></comment-icon>
        </li>
        <li class="item">
          <topic-actions :topicDetail="baseTopic" :actions="{share: true}" :shareUrl="`/topics/${baseTopic.id}`">
          </topic-actions>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar'
  import TopicActions from 'components/topic-actions/topic-actions'
  import CommentIcon from 'components/actions/comment-icon'

  export default {
    name: "base-topic",
    components: {
      Avatar,
      CommentIcon,
      TopicActions
    },
    props: {
      desc: {
        type: String
      },
      show_course_name: {
        type: Boolean,
        default: true
      },
      show_lesson_name: {
        type: Boolean,
        default: true
      },
      baseTopic: {
        type: Object
      }
    },
    computed: {
      media_length() {
        return this.baseTopic.medias.length
      }
    },
    methods: {
      goLesson() {
        this.$router.push({path: `/lessons/${this.baseTopic.course_id}`})
      },
      goCourse() {
        this.$router.push({path: `/courses/${this.baseTopic.parent_course_id}`})
      },
      goTopic() {
        this.$router.push({path: `/topics/${this.baseTopic.id}`})
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .topic-wrapper {
    .main {
      padding-top: 17.5px;
      .lesson-name {
        @include multi-line-text(1);
        margin-bottom: 15px;
        height: 17px;
        line-height: 17px;
        font-size: 15px;
        font-weight: bold;
      }
      .content-wrapper {
        .content {
          @include multi-line-text(5);
          font-size: 14px;
          line-height: 20px;
        }
        .media {
          position: relative;
          padding-top: 15px;
          .item-list {
            position: relative;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            /*justify-items: center;*/
            grid-column-gap: 5px;
            .media-item {
              position: relative;
              display: inline-block;
              .media-single {
                width: 150px;
              }
              .media-multi {
                height: 110px;
                width: 110px;
              }
              img {
                border-radius: 5px;
              }
            }
            .media-count {
              position: absolute;
              top: 86px;
              right: 10px;
              z-index: 100;
              color: $white;
              font-size: 16px;
              font-weight: bolder;

            }
          }
          .media-count {
            z-index: 10;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
          }
        }

      }
      .course-name {
        @include multi-line-text(1);
        margin-top: 14px;
        color: $blue;
        font-size: 13px;
        line-height: 16px;
        font-weight: bold;
      }
    }
    .bottom {
      padding-top: 20px;
      height: 22px;
      .actions {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: center;
        .item {
        }
      }
    }
  }

</style>
