<template>
  <div>
    <div class="topic-detail">
      <cube-scroll ref="scroll"
                   :data="[topicDetail]"
      >
        <div class="avatar-content">
          <avatar :account="topicDetail.account" :time="topicDetail.published_at_text">
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
          <div class="content-block" v-for="(content, index) in topicDetail.raw_content"
               v-if="content.text || content.image_url">
            <p class="text" v-if="content.text">
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
      <div class="comment-button" @click="newComment">
        <div class="new-comment">
          <i class="icon-write"></i>
          <span class="text">写评论</span>
        </div>


      </div>
      <div class="actions">
        <topic-actions :topicDetail="topicDetail"></topic-actions>
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
      this._setShareInfo()
      if (this.$refs.scroll) {
        this.$refs.scroll.refresh()
      }
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
      },
      newComment() {
        const toast = this.$createToast({
          txt: '敬请期待',
          type: 'correct',
          mask: false,
          time: 1000
        })
        toast.show()
      },
      _setShareInfo() {
        const path = window.location.href
        const title = `${this.currentAccount.nickname}的每日学习心得`
        window.wechatShare({
          title: title,
          link: path,
          success: (res) => {
            this.topicCreateAction({topic_id: this.topic_id, type: 'share'})
          }
        });
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
    .avatar-content {
      .edit-topic-button {
        float: right;
      }
      padding-top: 17.5px;
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
        box-sizing: padding-box;
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

    .comment-button {
      padding-left: 17.5px;
      display: flex;
      width: 50%;
      margin-right: 60px;
      .new-comment {
        flex: 1;
        display: flex;
        margin: auto;
        height: 23px;
        line-height: 23px;
        border: 1px solid $gray;
        border-radius: 30px;
        i {
          margin: auto;
          margin-left: 9px;
          margin-right: 4px;
        }
        span.text {
          font-size: 10px;
        }
      }
    }
    .actions {
      padding-right: 17.5px;
      margin: auto;
    }
  }
</style>
