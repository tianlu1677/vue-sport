<template>
  <div class="edit-topic-modal">
    <div class="handle-modal">
      <a href="javaScript:;" class="clean" @click="cleanText">取消</a>
      <a href="javaScript:;" class="submit" @click="submitText">完成</a>
    </div>
    <textarea placeholder="请输入心得内容1-5000个字" v-model="content"></textarea>
  </div>
</template>

<script>
  export default {
    name: "edit-text",
    props: {
      topicForm: {
        type: Object,
        default: function () {
          return {
            index: 1,
            type: 'text',
            text: ''
          }
        }
      }
    },
    data() {
      return {
        content: '',
      }
    },
    watch: {
      topicForm() {
        this.content = this.topicForm.text
      }
    },
    computed: {},
    methods: {
      cleanText() {
        this.content = this.topicForm.text
        this.hideEdit()
      },
      submitText() {
        this.topicForm.text = this.content
        this.hideEdit()
      },
      hideEdit() {
        this.$emit('hideEdit')
      }
    }
  }
</script>

<style scoped lang="scss">
  .edit-topic-modal {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    padding: 10px;
    box-sizing: border-box;
    textarea {
      width: 100%;
      padding: 10px;
      height: 200px;
      box-sizing: border-box;
      background: #e8e8e9;
      border-radius: 8px;
      outline: none;
      font-size: 14px;
      border: none;
    }
    .handle-modal {
      padding: 6px 6px 16px 6px;
      zoom: 1;
      &:after {
        clear: both;
        display: block;
        content: "\20";
      }
      .clean {
        float: left;
        font-size: 15px;
      }
      .submit {
        float: right;
        font-size: 15px;
        color: $blue;
      }
    }
  }

</style>
