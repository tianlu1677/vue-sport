<template>
  <cube-popup type="comment" ref="popup" :center="false" :mask-closable="true" position="bottom">
    <div class="new-comment-block">
      <div class="handle">
        <span class="clean" @click="cancel">取消</span>
        <span class="submit" @click="submitComment">发送</span>
      </div>

      <textarea :placeholder="tipText" v-model="content"></textarea>
    </div>
  </cube-popup>

</template>

<script>
  import {mapActions, mapMutations} from 'vuex';
  export default {
    name: "new-comment",
    components: {},
    props: {
      comment: {
        type: Object
      },
      topic: {
        type: Object
      }
    },
    data() {
      return {
        content: '',
        commentOpts: {}
      }
    },
    computed: {
      tipText() {
        if (this.comment || this.topic) {
          return this.comment ? ` 回复 @${this.comment.account.nickname} 的评论` :
            " 请输入评论内容 1-100 个字"
        }
      }
    },
    created() {

    },
    methods: {
      ...mapActions({
        createComment: 'createComment'
      }),

      show() {
        this.$refs.popup.show()
      },
      hide() {
        this.$refs.popup.hide()
        this.content = ''
        this.$emit('hide')
      },
      cancel() {
        this.hide()
      },
      submitComment() {
        if (this.comment && this.comment.id) {
          this.commentOpts = {
            comment: {
              commentable_id: this.comment.commentable_id,
              commentable_type: this.comment.commentable_type,
              content: this.content,
              comment_type: 'comment',
              target_comment_id: this.comment.id
            }
          }
        } else if (this.topic && this.topic.id) {
          this.commentOpts = {
            comment: {
              commentable_id: this.topic.id,
              commentable_type: 'Topic',
              content: this.content,
              comment_type: 'topic',
            }
          }
        } else {
          console.log('评论的内容不存在')
        }
        // 如果传递过来topic，则是对topic
        // 如果传递过来频率，则是对评论
        if (this.commentOpts && this.content && this.content.length <= 100) {
          this.createComment(this.commentOpts)
          this.content = ''
          this.hide()
          const toast = this.$createToast({
            txt: '评论成功',
            type: 'correct',
            mask: false,
            time: 1000,
          });
          toast.show();
        } else {
          console.log(this.commentOpts)
        }
      }
    }

  }
</script>

<style lang="scss">
  .cube-comment {
    .cube-popup-mask {
      opacity: 0.6;
    }
    .cube-popup-content {
    }
  }

  .new-comment-block {
    background: $white;
    padding: 17.5px;
    box-sizing: border-box;
    width: 100%;
    textarea {
      height: 200px;
      width: 100%;
      padding: 10px;
      margin-bottom: 150px;
      box-sizing: border-box;
      background: #e8e8e9;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      border: none;
    }
    .handle {
      padding: 3px 6px 16px 6px;
      zoom: 1;
      &:after {
        clear: both;
        display: block;
        content: "\20";
      }
      .clean {
        float: left;
        font-size: 15px;
        color: $gray;
      }
      .submit {
        float: right;
        font-size: 15px;
        color: $blue;
      }
    }
  }

</style>
