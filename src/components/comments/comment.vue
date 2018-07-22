<template>
  <div class="comment">
    <avatar :account="comment.account" :time="comment.created_at_text">
      <span slot="right" class="praise">
        <i class="icon-praise"></i>
        <span class="text">{{comment.praises_count}}</span>
      </span>
    </avatar>
    <div class="content" @click="commentAction(comment)">
      <div class="comment-content">
        还不错还不错还不错还不错还不错还不错还不错还不错还不错
        还不错还不错还不错还不错还不错还不错还不错还不错还不错还不错还不错
        还不错还不错还不错还不错还不错还不错还不错还不错还不错还不错
      </div>
      <div class="reply">
        <span class="account-name">@张三</span>
        <span class="text">： 先学会用脚去点拍子。 这个时候一定要注意脚步要清晰，压拍要准确。</span>
      </div>
      <div class="reply-count">
        回复 {{comment.child_comments_count}}
      </div>
    </div>
  </div>
</template>

<script>
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
      return {}
    },
    computed: {},
    created() {
    },
    methods: {
      commentAction(comment) {
        if (comment.account_id === 1) {

        } else {
          this.$createActionSheet({
            title: '',
            active: 0,
            data: [
              // {
              //   content: '<i class="icon-write"></i> 回复',
              //   text: 'reply',
              //   class: 'cube-foo'
              // },
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
                console.log('delete')
              } else {

              }

            }
          }).show()
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .comment {
    margin-bottom: 25px;
    .praise {
      display: flex;
      flex: 1;
      .icon-praise {
        font-size: 16px;
      }
      .text {
        margin-left: 10px;
        font-size: 15px;
        text-align: center;
        line-height: 16px;
      }
    }
    .content {
      margin-left: 44px;
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
