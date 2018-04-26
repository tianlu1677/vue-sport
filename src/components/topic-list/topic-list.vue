<template>
  <div class="topics">
    <div class="topic-list">
      <ul>
        <li class="item" v-for="topic in topics">
          <div class="account-wrapper">
            <avatar :account="topic.account" :desc="'发布了一篇心得'"></avatar>
          </div>
          <div class="main">
            <h2 class="lesson-name">基本动作20</h2>
            <div class="content-wrapper">
              <div class="content">哈哈哈</div>
              <div class="media">ssss</div>
            </div>
            <h2 class="course-name">这就是街舞</h2>
          </div>
          <div class="bottom">
            <ul class="actions">
              <li class="item">
                <praise-icon></praise-icon>
              </li>
              <li class="item">
                <comment-icon></comment-icon>
              </li>
              <li class="item">
                <share-icon></share-icon>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import Avatar from 'components/avatar/avatar'
  import PraiseIcon from 'components/actions/praise-icon'
  import ShareIcon from 'components/actions/share-icon'
  import CommentIcon from 'components/actions/comment-icon'

  import {getTopicList} from "@/api/topic_api"

  export default {
    name: "topic-list",
    components: {
      Avatar,
      PraiseIcon,
      ShareIcon,
      CommentIcon
    },
    props: {
      course_id: {
        type: Number,
        default: 1,
      },

      // topics: {
      //   type: Array,
      //   default: function () {
      //     return []
      //   }
      // }
    },

    data: function () {
      return {
        topics: [],
        options: {}
      }
    },

    created() {
      this._getTopicList()
    },

    methods: {
      async _getTopicList() {
        const response = await getTopicList(this.course_id)
        this.topics = response.topics
      }
    }

  }
</script>

<style lang="scss">
  .topics {
    position: relative;
    .topic-list {
      .item {
        margin-bottom: 27.5px;
        .main {
          padding-top: 17.5px;
          .lesson-name {
            padding-bottom: 15px;
            font-size: 15px;
            font-weight: bold;
          }
          .content-wrapper {
            .content {
              font-size: 14px;
              line-height: 22.5px;
            }
            .media {
              padding-top: 15px;
            }
            .course-name {
              padding-top: 15px;
              font-size: 13px;
              font-weight: bold;
            }
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
    }

  }

</style>
