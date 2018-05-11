<template>
  <div class="topic-detail">
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
        <lesson-card :baseLesson="topicDetail.course"
                     v-if="topicDetail.topic_type==='clazz'"
                     :learning="learning"
        ></lesson-card>
        <course-card :baseCourse="topicDetail.course"
                     v-if="topicDetail.topic_type==='course'"
                     :learning="learning"
        >

        </course-card>
      </div>
    </div>
    <div class="topic-content">
      <div class="content-block" v-for="(content, index) in topicDetail.raw_content">
        <img :src="content.image_url" class="image" height="100%" width="100%" alt="" v-if="content.image_url">
        <p class="text">
          {{content.text}}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import LessonCard from 'components/lesson-card/lesson-card'
  import CourseCard from 'components/course-card/course-card'
  import Avatar from 'components/avatar/avatar'
  import {currentAccount} from "@/store/getters";
  import {getLessonBase} from "@/api/lesson_api";
  import {getCourseLearning} from "@/api/learning_api";

  export default {
    name: "topic-detail",
    components: {
      Avatar,
      LessonCard,
      CourseCard
    },
    data() {
      return {
        topic_id: this.$route.params.id,
        learning: {},
      }
    },
    async created() {
      await this.setTopicDetail(this.topic_id)
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
        setTopicDetail: 'setTopicDetail'
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
    padding: 17.5px 17.5px 17.5px 17.5px;
    .avatar-wrapper {
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
        margin-bottom: 29px;
        .text {
          margin-top: 16.5px;
          line-height: 18px;
          font-size: 14px;
        }
        .image {

        }
      }
    }

  }
</style>
