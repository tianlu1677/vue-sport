<template>
  <div class="topic-scroll">
    <div class="topic-block">
      <div class="text" @click="handleEditText(true)">
        <p>
          {{ topicForm.text || '点击填写'}}
        </p>
      </div>
      <div class="media" v-if="topicForm.type === 'image'">
        <cube-upload
          ref="upload"
          v-model="files"
          :action="action"
          :auto="true"
          :simultaneous-uploads="1"
          @files-added="filesAdded"
          @file-submitted="fileSubmitted"
          @file-success="fileSuccess"
          @file-removed="fileRemove"
        >
          <div class="cube-upload-def clear-fix">
            <cube-upload-file v-for="(file, i) in files" :file="file" :key="i"></cube-upload-file>
            <cube-upload-btn :accept="accept" @fileClick="fileClick"></cube-upload-btn>
          </div>
        </cube-upload>
      </div>
    </div>
  </div>
</template>

<script>
  import {uploadAsset} from "@/api/topic_api";

  export default {
    name: "topic-block",
    components: {},
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
    mounted() {
    },
    watch: {
      topicForm() {
        this._setDefaultFile()
      }
    },
    created() {
      this._setDefaultFile()
    },
    data() {
      return {
        action: {
          target: 'https://xinxue.niubibeta.com/api/v1/assets',
          timeout: 10000,
          headers: {'token': localStorage.getItem('token')}
        },
        files: [],
        accept: "image/gif,image/jpeg,image/jpg,image/png,video/mp4",
      }
    },
    computed: {},
    methods: {
      filesAdded(files) {
        console.log('fileAdd', files)
        let hasIgnore = false
        const maxSize = 5 * 1024 * 1024 // 5M
        for (let k in files) {
          const file = files[k]
          if (file.size > maxSize) {
            file.ignore = true
            hasIgnore = true
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1000,
          txt: '最大上传5M的图片'
        }).show()
      },
      fileClick() {
        console.log('xxx')
      },

      fileSubmitted(file) {

      },
      fileSuccess(file) {
        this.topicForm.image_url = this.files[0].response.asset.url
        this.topicForm.video_url = this.files[0].response.asset.video_url
      },
      handleEditText() {
        this.$emit('handleEditText')
      },
      fileRemove(file) {
        this.topicForm.image_url = ''
        this.topicForm.video_url = ''
      },
      _setDefaultFile() {
        let url = this.topicForm.image_url
        if (!!url) {
          this.files = [{url: url}]
        } else {
          this.files = []
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../../common/styles/mixin";

  .topic-scroll {
    .topic-block {
      position: relative;
      border-radius: 5px;
      border: 1px solid $gray;
      display: flex;
      overflow: hidden;
      height: 100px;
      margin-bottom: 15px;
      .text {
        flex: 1;
        padding: 25px 0 25px 15px;
        font-size: 13px;
        line-height: 16px;
        color: $gray;
        min-width: 185px;
        p {
          @include multi-line-text(3);
        }
      }
      .media {
        flex: 0 0 80px;
        /*border-radius: 5px;*/
        border: 1px solid $gray;
        height: 80px;
        width: 80px;
        margin: 10px 10px 10px 48px;
      }
    }
  }

</style>
