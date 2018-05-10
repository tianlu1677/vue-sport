<template>
  <div class="topic-detail">
    <div class="avatar-wrapper">
      <avatar :account="topicDetail.account">
      </avatar>
    </div>
    <div class="topic-course">
      <div class="course-card">
        <h1>{{topicDetail.course_name}}</h1>
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
  import Avatar from 'components/avatar/avatar'
  import {currentAccount} from "../../store/getters";

  export default {
    name: "topic-detail",
    components: {
      Avatar
    },
    data() {
      return {
        topic_id: this.$route.params.id,
      }
    },
    created() {
      this.setTopicDetail(this.topic_id)
    },
    computed: {
      ...mapGetters({
        topicDetail: 'topicDetail',
        currentAccount: 'currentAccount'
      }),
      showEditButton() {
        return this.topicDetail.account_id === currentAccount.id
      }

    },
    methods: {
      ...mapActions({
        setTopicDetail: 'setTopicDetail'
      }),
      goEditTopic() {

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
