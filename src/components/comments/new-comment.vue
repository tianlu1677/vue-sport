<template>
  <cube-popup type="comment" ref="popup" :center="false" position="bottom">
    <div class="new-comment-block">
      <div class="handle">
        <span class="clean" @click="cancel">取消</span>
        <span class="submit" @click="createComment">发送</span>
      </div>
      <textarea placeholder="请输入评论内容 1-50 个字" v-model="content"></textarea>
    </div>
  </cube-popup>

</template>

<script>
  export default {
    name: "new-comment",
    components: {},
    props: {},
    data() {
      return {
        content: ''
      }
    },
    computed: {},
    created() {

    },
    methods: {
      show() {
        this.$refs.popup.show()
      },
      hide() {
        this.$refs.popup.hide()
        this.$emit('hide')
      },
      cancel() {
        this.$refs.popup.hide()
      },
      createComment() {

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
      /*top: 150px;*/
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
