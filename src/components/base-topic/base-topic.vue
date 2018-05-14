<template>
  <div class="topic-wrapper">
    <div class="account-wrapper">
      <avatar :account="baseTopic.account" :desc="desc"></avatar>
    </div>
    <div class="main">
      <h2 class="lesson-name" @click="goLesson" v-if="show_lesson_name">{{baseTopic.course_name}}</h2>
      <router-link :to="{path: `/topics/${baseTopic.id}` }" tag="div">
        <div class="content-wrapper">
          <div class="content" v-html="baseTopic.plain_content"></div>
          <div class="media" v-if="media_length > 0">
            <ul class="item-list">
              <li class="media-item" v-for="media in baseTopic.medias.slice(0,3)">
                <img :src="media" alt="" height="150" width="150" v-if="baseTopic.medias.length === 1">
                <img :src="media" alt="" height="110" width="110" v-else>
              </li>
              <li class="media-count" v-if="media_length">
                {{`${media_length} +`}}
              </li>
            </ul>
          </div>
        </div>
      </router-link>

      <h2 class="course-name" @click="goCourse()" v-if="show_course_name">
        {{baseTopic.parent_course_name}}
      </h2>
    </div>
    <div class="bottom">
      <ul class="actions">
        <li class="item">
          <topic-actions :topicDetail="baseTopic" :actions="{praise: true}">
          </topic-actions>
          <!--<praise-icon></praise-icon>-->
        </li>
        <li class="item">
          <comment-icon></comment-icon>
        </li>
        <li class="item">
          <topic-actions :topicDetail="baseTopic" :actions="{share: true}">
          </topic-actions>
          <!--<share-icon></share-icon>-->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar'
  import TopicActions from 'components/topic-actions/topic-actions'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import CommentIcon from 'components/actions/comment-icon'

  export default {
    name: "base-topic",
    components: {
      Avatar,
      PraiseIcon,
      ShareIcon,
      CommentIcon,
      TopicActions
    },
    props: {
      desc: {
        type: String,
        default: '发布了1篇心得'
      },
      show_course_name: {
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
      },
      show_lesson_name() {
        return this.baseTopic.type === 'clazz'
      }
    },
    methods: {
      goLesson() {
        this.$router.push({path: `/lessons/${this.baseTopic.course_id}`})
      },
      goCourse() {
        this.$router.push({path: `/courses/${this.baseTopic.parent_course_id}`})
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
        padding-bottom: 15px;
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
        line-height: 15px;
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
