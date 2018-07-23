<template>
  <div class="normal-notifies-list">
    <ul>
      <li v-for="(notify, index) in notifyList">
        <div class="notify">
          <avatar :account="notify.actor" :time="notify.created_at_text">
            <span slot="right" class="reply-action">
            </span>
          </avatar>
          <!--评论点赞-->
          <div class="reply-wrapper" v-if="notify.target_type === 'Comment' ">
            <div class="notify-content">
              <span>{{notify.message_detail}}</span>
            </div>
            <div class="reply">
              <span class="account-name">@{{currentAccount.nickname}}</span>
              <span class="text">{{notify.comment ? notify.comment.content : '该评论已删除'}}</span>
            </div>

          </div>
          <!--心得的赞/分享/收藏-->
          <div class="topic-notify-wrapper" v-if="notify.target_type === 'Topic' ">
            <div class="notify-content">
              {{notify.message_detail}}
            </div>
            <div class="reply" v-if="notify.topic && notify.topic.id">
              <div class="left" @click="goTopicDetail(notify)">
                <span class="account-name">@{{currentAccount.nickname}}</span>
                <span class="text" v-html="notify.topic.plain_content"></span>
              </div>
              <div class="right" v-if="notify.topic.medias[0]">
                <img :src="notify.topic.medias[0]" alt="img">
              </div>
            </div>

            <div class="reply" v-else>
              该心得已删除
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import Avatar from 'components/avatar/avatar'

  export default {
    name: "normal-notify",
    components: {
      Avatar
    },
    props: {
      notifyList: {
        type: Array
      },
      currentAccount: {
        type: Object
      }

    },
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {
      goTopicDetail(notify) {
        this.$router.push({path: `/topics/${notify.topic.id}`})
      },
    }

  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .normal-notifies-list {
    .notify {
      margin-bottom: 25px;
      .reply-action {
        display: flex;
        flex: 1;
        @include extend-click();

        .text {
          min-width: 10px;
          margin-left: 10px;
          font-size: 12px;
          text-align: center;
          color: $gray;
        }
      }
      .reply-wrapper {
        margin-left: 44px;
        word-break: break-word;
        .notify-content {
          margin-top: 14px;
          margin-bottom: 14px;
          font-size: 13px;
          line-height: 16px;
        }
        .reply {
          border-radius: 6px;
          border: 1px solid $light_gray;
          padding: 9px;
          font-size: 11px;
          line-height: 16px;
          .account-name {
            color: $blue;
          }
          .text {
            color: $gray;
          }
        }
      }

      .topic-notify-wrapper {
        margin-left: 44px;
        word-break: break-word;
        .notify-content {
          margin-top: 14px;
          margin-bottom: 14px;
          font-size: 13px;
          line-height: 16px;
        }
        .reply {
          position: relative;
          border-radius: 6px;
          border: 1px solid $light_gray;
          padding: 9px;
          font-size: 11px;
          line-height: 16px;
          display: flex;
          .left {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            @include multi-line-text(3);
            .account-name {
              color: $blue;
            }
            .text {
              color: $gray;
            }
          }
          .right {
            flex: 0 0 46px;
            line-height: 100%;
            margin-left: 17px;
            font-size: 0;
            > img {
              width: 46px;
              height: 46px;
              border-radius: 6px;
            }
          }
        }
      }
    }
  }

</style>
