<template>
  <div class="topic-wrapper">
    <div class="account-wrapper">
      <avatar :account="baseTopic.account" :desc="account_desc"
              :followButton="false"></avatar>
    </div>
    <div class="main">
      <h2 class="lesson-name" @click="goLesson" v-if="show_lesson_name && baseTopic.topic_type ==='lesson'">
        {{baseTopic.lesson_name}}</h2>
      <div class="content-wrapper" @click="goTopic">
        <div class="content" v-html="baseTopic.plain_content"></div>
        <div class="media" v-if="baseTopic.medias.length > 0">
          <ul class="item-list">
            <li class="media-item" v-for="media in baseTopic.medias.slice(0,3)">
              <img :src="media" alt="" class="media-single" v-if="baseTopic.medias.length === 1">
              <img :src="media" alt="" class="media-multi" v-else>
            </li>
            <li class="media-count" v-if="media_length > 0">
              <strong>{{media_length}}+</strong>
            </li>
          </ul>
        </div>
      </div>
      <h2 class="course-name" @click="goCourse()" v-if="show_course_name">
        {{baseTopic.course_name}}
      </h2>
    </div>
    <div class="bottom">
      <ul class="actions">
        <li class="item">
          <topic-actions :topicDetail="baseTopic" :actions="{praise: true}">
          </topic-actions>
        </li>
        <li class="item" @click="goTopic">
          <action icon="icon-comments" :count="baseTopic.comments_count"></action>
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
  import Avatar from 'components/avatar/avatar';
  import Action from 'components/actions/action';
  import TopicActions from 'components/topic-actions/topic-actions';
  import CommentIcon from 'components/actions/comment-icon';

  export default {
    name: 'base-topic',
    components: {
      Avatar,
      CommentIcon,
      TopicActions,
      Action,
    },
    props: {
      desc: {
        type: String,
      },
      show_course_name: {
        type: Boolean,
        default: true,
      },
      show_lesson_name: {
        type: Boolean,
        default: true,
      },
      baseTopic: {
        type: Object,
      },
    },
    computed: {
      media_length() {
        return this.baseTopic.medias.length - 3;
      },
      account_desc() {
        const topics_count = this.baseTopic.check_topics_count
        if (topics_count > 0) {
          const type = this.baseTopic.topic_type
          const check_desc = type === 'course' ? `打卡该课程${topics_count}次` : `打卡该课时${topics_count}次`
          return [(this.desc || this.baseTopic.published_at_text), check_desc].join(' · ')
        } else {
          return this.desc || this.baseTopic.published_at_text
        }
      }
    },
    methods: {
      goLesson() {
        this.$router.push({path: `/lessons/${this.baseTopic.lesson_id}`});
      },
      goCourse() {
        this.$router.push({path: `/courses/${this.baseTopic.course_id}`});
      },
      goTopic() {
        this.$router.push({path: `/topics/${this.baseTopic.id}`});
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .topic-wrapper {
    .main {
      padding-top: 17px;
      .lesson-name {
        @include multi-line-text(1);
        margin-bottom: 11px;
        font-size: 14.5px;
        font-weight: 500;
      }
      .content-wrapper {
        .content {
          @include multi-line-text(5);
          font-size: 14px;
          line-height: 20px;
        }
        .media {
          position: relative;
          padding-top: 11px;
          .item-list {
            position: relative;
            display: flex;
            /*justify-content: space-around;*/
            flex-flow: row wrap;
            align-items: flex-start;
            /*align-item:;*/
            /*display: grid;*/
            /*grid-template-columns: 1fr 1fr 1fr;*/
            /*grid-column-gap: 5px;*/
            .media-item {
              font-size: 0;
              position: relative;
              display: inline-block;
              margin-right: 5px;
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
            .media-item:last-child {
              margin-right: 0;
            }
            .media-count {
              position: absolute;
              /*top: 86px;*/
              right: 10px;
              bottom: 10px;
              z-index: 100;
              color: $white;
              font-size: 14px;
              font-weight: bolder;
            }
          }
        }

      }
      .course-name {
        @include multi-line-text(1);
        margin-top: 12px;
        color: $blue;
        font-size: 13px;
        line-height: 1.2;
        /*font-weight: bold;*/
      }
    }
    .bottom {
      padding-top: 18px;
      height: 22px;
      .actions {
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
        align-item: center;
        .item {
        }
      }
    }
  }

</style>
