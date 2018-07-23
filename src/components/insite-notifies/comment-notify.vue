<template>
  <div class="comment-notifies-list">
    <ul>
      <li v-for="(comment, index) in commentList">
        <div class="comment">
          <avatar :account="comment.account" :time="comment.created_at_text">
            <span slot="right" class="reply-action" @click="replyComment(comment)"
                  v-if="comment.account_id !== currentAccount.id">
              <span class="text">回复</span>
            </span>
          </avatar>
          <div class="reply-wrapper" v-if="comment.comment_type === 'comment' ">
            <!--评论了我的心得-->
            <div class="comment-content">
              <span>{{`回复了你${comment.content}`}}</span>
            </div>
            <div class="reply">
              <span class="account-name">@{{comment.target_account_nickname}}</span>
              <span class="text">：{{comment.target_comment_content ? comment.target_comment_content : '该评论已删除'}}</span>
            </div>
          </div>
          <!--回复了我的评论-->
          <div class="topic-comment-wrapper" v-if="comment.comment_type === 'topic'">
            <div class="comment-content">
              评论了你：{{comment.content}}
            </div>
            <div class="reply" v-if="comment.commentable.id">
              <div class="left" @click="goTopicDetail(comment)">
                <span class="account-name"></span>
                <span class="text" v-html="comment.commentable.plain_content.substring(0, 100)"></span>
              </div>
              <div class="right" v-if="comment.commentable.medias[0]">
                <img :src="comment.commentable.medias[0]" alt="img">
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
    name: "comment-notify",
    components: {
      Avatar
    },
    props: {
      commentList: {
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
      goTopicDetail(comment) {
        this.$router.push({path: `/topics/${comment.commentable_id}`})
      },
      replyComment(comment) {
        const pop = this.$createNewComment({comment: comment}, true)
        pop.show()
      },
    }

  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .comment-notifies-list {
    .comment {
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
        .comment-content {
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

      .topic-comment-wrapper {
        margin-left: 44px;
        word-break: break-word;
        .comment-content {
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
