<template>
  <div>
    <div class="topic-detail">
      <cube-scroll ref="scroll"
                   :data="[topicDetail]"
      >
        <div class="avatar-wrapper">
          <avatar :account="topicDetail.account" :desc="topicDetail.published_at">
          <span class="follow-text"
                slot="right"
                v-if="showEditButton"
                @click="goEditTopic"
          >
            编辑
          </span>
          </avatar>
        </div>
        <div class="topic-course">
          <div class="course-card">
            <lesson-card :baseLesson="topicDetail.lesson"
                         v-if="topicDetail.lesson"
                         :learning="learning"
            ></lesson-card>
            <course-card :baseCourse="topicDetail.course"
                         v-if="topicDetail.course"
                         :learning="learning"
            >
            </course-card>
          </div>
        </div>
        <div class="topic-content">
          <div class="content-block" v-for="(content, index) in topicDetail.raw_content">
            <p class="text">
              {{content.text}}
            </p>

            <img :src="content.image_url" class="image" height="100%" width="100%" alt="" v-if="content.image_url">
          </div>
          <div class="tag-list">
            <ul class="item-list">
              <li class="item" v-for="tag in topicDetail.tag_list">
                <tag :tag="tag"></tag>
              </li>
            </ul>
          </div>
      </div>
      </cube-scroll>
    </div>

    <div class="topic-bottom border-top-1px">
      <div class="new-comment"></div>
      <div class="actions">
        <topic-actions :topicDetail.sync="topicDetail"></topic-actions>
      </div>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import LessonCard from 'components/lesson-card/lesson-card'
  import CourseCard from 'components/course-card/course-card'
  import Avatar from 'components/avatar/avatar'
  import TopicActions from 'components/topic-actions/topic-actions'
  import Tag from 'base/tag/tag'
  import {currentAccount} from "@/store/getters";
  import {getLessonBase} from "@/api/lesson_api";
  import {getCourseLearning} from "@/api/learning_api";

  export default {
    name: "topic-detail",
    components: {
      Avatar,
      LessonCard,
      CourseCard,
      Tag,
      TopicActions
    },
    data() {
      return {
        topic_id: this.$route.params.id,
        learning: {},
      }
    },
    async created() {
      //获取详情
      await this.setTopicDetail(this.topic_id)
      //浏览页面
      this.topicCreateAction({topic_id: this.topic_id, type: 'view'})
      this._getLearningStatus()
    },
    computed: {
      ...mapGetters({
        topicDetail: 'topicDetail',
        currentAccount: 'currentAccount'
      }),
      showEditButton() {
        return this.topicDetail.account_id === this.currentAccount.id
      }

    },
    methods: {
      ...mapActions({
        setTopicDetail: 'setTopicDetail',
        topicCreateAction: 'topicCreateAction'
      }),
      goEditTopic() {
        this.$router.push({path: `/topics/${this.topicDetail.id}/edit`})
      },
      async _getLearningStatus() {
        const res = await getCourseLearning(this.topicDetail.course_id)
        this.learning = res.learning
      }

    },

  }
</script>

<style scoped lang="scss">
  .topic-detail {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 17.5px;
    .avatar-wrapper {
      margin-top: 17.5px;
      .edit-topic-button {
        float: right;
      }
    }
    .topic-course {
      margin-top: 16.5px;
      margin-bottom: 16.5px;
      min-height: 81px;
      padding: 10px;
      border: 1px solid $gray;
      border-radius: 5px;
    }
    .topic-content {
      .content-block {
        margin-top: 16.5px;
        .text {
          margin-bottom: 16.5px;
          line-height: 18px;
          font-size: 14px;
        }
        .image {

        }
      }
      .tag-list {
        margin-top: 27.5px;
        .item-list {
          display: inline-block;
          .item {
            display: inline-block;
          }
        }

      }
    }
  }

  .topic-bottom {
    position: fixed;
    height: 50px;
    width: 100%;
    line-height: 50px;
    bottom: 0;
    display: flex;
    .new-comment {
      flex: 1;
      width: 50%;
    }
    .actions {
      width: 50%;
      margin: auto;
    }
    left: 0;
    right: 0;
  }
</style>
