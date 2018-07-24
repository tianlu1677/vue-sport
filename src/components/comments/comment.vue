<template>
  <div class="comment" v-if="!deleted">
    <avatar :account="comment.account" :time="comment.created_at_text">
      <span slot="right" class="praise" @click="praise">
        <i :class="[comment.praise ? 'icon-praise-solid' : 'icon-praise' ]"></i>
        <span class="text">{{comment.praises_count}}</span>
      </span>
    </avatar>
    <div class="content" @click="commentAction(comment)">
      <div class="comment-content">
        {{comment.content}}
      </div>
      <div class="reply" v-if="comment.target_account_id">
        <span class="account-name">@{{comment.target_account_nickname}}: </span>
        <span class="text">{{comment.target_comment_content ? comment.target_comment_content : '评论已删除'}}</span>
      </div>
      <div class="reply-count">
        回复 {{comment.child_comments_count}}
      </div>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import Avatar from 'components/avatar/avatar'

  export default {
    name: "comment",
    components: {
      Avatar
    },
    props: {
      comment: {
        type: Object
      }
    },
    data() {
      return {
        deleted: false
      }
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount'
      })
    },
    created() {

    },
    methods: {
      ...mapActions({
        deleteComment: 'deleteComment',
        praiseComment: 'praiseComment',
        unpraiseComment: 'unpraiseComment'
      }),
      praise() {
        if (this.comment.praise) {
          //取消点赞
          this.unpraiseComment(this.comment.id)
        } else {
          console.log(this.comment)
          this.praiseComment(this.comment.id)
        }
      },
      commentAction(comment) {
        if (comment.account_id === this.currentAccount.id) {
          this.$createActionSheet({
            title: '',
            active: 0,
            data: [
              {
                content: '删除',
                text: 'delete',
                align: 'center'
              },
            ],
            onSelect: (item, index) => {
              console.log(item)
              if (item.text === 'reply') {
                console.log('回复')
              } else if (item.text === 'delete') {
                this.deleteComment(comment.id)
                this.deleted = true
                const toast = this.$createToast({
                  txt: '删除成功',
                  type: 'correct',
                  mask: false,
                  time: 1000,
                });
                toast.show();
              } else {
              }
            }
          }).show()
        } else {
          const pop = this.$createNewComment({comment: comment}, true)
          pop.show()
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .comment {
    /*margin-bottom: 25px;*/
    .praise {
      display: flex;
      flex: 1;
      align-items: center;
      //@include extend-click();
      .icon-praise, .icon-praise-solid {
        line-height: 36px;
        font-size: 16px;
      }
      .text {
        min-width: 10px;
        margin-left: 5px;
        font-size: 16px;
        text-align: center;
      }
    }
    .content {
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
      .reply-count {
        margin-top: 11px;
        font-size: 12px;
        color: $gray;
      }
    }
  }

</style>
