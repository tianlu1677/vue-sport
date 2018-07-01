<template>
  <div class="topic-scroll">
    <div class="topic-block">
      <div class="text" @click="handleEditText(true)">
        <p v-if="topicForm.text">{{topicForm.text}}</p>
        <p class="gray" v-else>{{'填写学习过程和见解、展示学习成果，会让你的学习更上一层楼哦~'}}</p>
      </div>

      <template v-if="isWechat">
        <div class="wechat-media" :class="{'border-1px': localImages.length === 0}" v-if="topicForm.type === 'image'">
          <div class="upload-button" @click="chooseImage" v-if="localImages.length <= 0">
            <i class="icon-topic-add-photo"></i>
            <p>添加照片</p>
          </div>
          <div class="cover" v-if="localImages.length > 0">
            <img :src="localImages[0]" alt="" width="100%" height="100%">
            <i class="cubeic-wrong" @click="removeImage"></i>
          </div>
        </div>

        <div class="media" :class="{'border-1px': files.length === 0}" v-if="topicForm.type === 'video'">
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
            @file-click="fileClick"
          >
            <div class="cube-upload-def clear-fix">
              <cube-upload-file v-for="(file, i) in files" :file="file" :key="i" @click="prevFile"></cube-upload-file>
              <cube-upload-btn :accept="accept" :multiple="false">
                <div class="upload-button">
                  <i class="icon-topic-add-photo"></i>
                  <p>添加视频</p>
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
      </template>
      <template v-else>
        <div class="media" :class="{'border-1px': files.length === 0}" v-if="topicForm.type !== 'text'">
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
            @file-click="fileClick"
          >
            <div class="cube-upload-def clear-fix">
              <cube-upload-file v-for="(file, i) in files" :file="file" :key="i" @click="prevFile"></cube-upload-file>
              <cube-upload-btn :accept="accept" :multiple="false">
                <div class="upload-button">
                  <i class="icon-topic-add-photo"></i>
                  <p>添加照片</p>
                </div>
              </cube-upload-btn>
            </div>
          </cube-upload>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import {wechatImage, setConfig} from '@/common/js/wx_config'
  import {createAsset, uploadWechatMedia} from '@/api/asset_api';

  export default {
    name: 'topic-block',
    components: {},
    props: {
      topicForm: {
        type: Object,
        default() {
          return {
            index: 1,
            type: 'text',
            text: '',
          };
        },
      },
    },
    mounted() {
    },
    watch: {
      topicForm() {
        this._setDefaultFile();
      },
    },
    created() {
      this._setDefaultFile();
      if (this.isWechat) {
        // this.initWechatConfig()
      }
    },
    data() {
      return {
        action: {
          target: process.env.API_HOST + 'api/v1/assets',
          // target: 'https://xinxue.niubibeta.com/' + 'api/v1/assets',
          timeout: 30000,
          headers: {token: localStorage.getItem('token')},
        },
        files: [],
        accept: 'image/gif,image/jpeg,image/jpg,image/png,video/mp4,video/quicktime',

        localImages: [],
        imagesServerIds: [],
        imagesMaxLength: 1
      };
    },
    computed: {
      isWechat() {
        let isWechat = navigator.userAgent.indexOf('MicroMessenger') > -1
        return isWechat
      }
    },
    methods: {
      // 微信图片上传
      // initWechatConfig() {
      //   const API_LIST = ["chooseImage", "uploadImage", "downloadImage", "getLocalImgData"]
      //   setConfig(API_LIST)
      // },
      chooseImage() {
        // this.initWechatConfig()
        let _this = this
        wx.chooseImage({
          count: _this.imagesMaxLength, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            let localIds = res.localIds
            if (window.wxjs_is_wkwebview) {
              // alert('wk')
              _this.getLocalImage(localIds)
            } else {
              _this.localImages = localIds
            }
            // _this.localImages = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            _this.uploadImage(localIds)
          }
        });
      },
      async uploadImage(localIds) {
        let _this = this;
        let localId = localIds[0];
        if (window.wxjs_is_wkwebview) {
          if (localId.indexOf("wxlocalresource") !== -1) {
            localId = localId.replace("wxlocalresource", "wxLocalResource");
          }
        }
        wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            const serverId = res.serverId; // 返回图片的服务器端ID
            //立刻上传服务器
            uploadWechatMedia({media_id: serverId}).then((response) => {
              _this.topicForm.image_url = response.file
            })
          },
          fail: function (error) {
            alert('上传失败')
          }
        })
      },

      removeImage() {
        this.localImages = [];
        this.topicForm.image_url = '';
        this.topicForm.video_url = '';
      },

      getLocalImage(localIds = []) {
        let _this = this;
        let i = 0;
        let length = localIds.length;
        wx.getLocalImgData({
          localId: localIds[i], // 图片的localID
          success: function (res) {
            let localData = res.localData; // localData是图片的base64数据，可以用img标签显示
            localData = localData.replace('jgp', 'jpeg');
            _this.localImages = localData
            // if( _this.localIdImgs.length >= _this.imgaesMaxLenght ){
            //   _this.imgLenght = false
            // }
            // i++;
            // i < length && upload();
          }
        });

      },

      // 普通图片上传
      filesAdded(files) {
        let hasIgnore = false;
        const maxSize = 10 * 1024 * 1024; // 5M
        for (const k in files) {
          const file = files[k];
          if (file.size > maxSize) {
            file.ignore = true;
            hasIgnore = true;
          }
        }
        hasIgnore && this.$createToast({
          type: 'warn',
          time: 1500,
          txt: '最大上传10M',
        }).show();
      },
      fileClick(file) {
        console.log('xxx');
      },
      prevFile() {

      },

      fileSubmitted(file) {

      },
      fileSuccess(file) {
        this.topicForm.image_url = this.files[0].response.asset.url;
        this.topicForm.video_url = this.files[0].response.asset.video_url;
        if (this.topicForm.video_url) {
          this.files[0].url = this.topicForm.image_url;
        }
      },
      handleEditText() {
        this.$emit('handleEditText');
      },
      fileRemove(file) {
        this.topicForm.image_url = '';
        this.topicForm.video_url = '';
      },
      _setDefaultFile() {
        const url = this.topicForm.image_url;
        if (url) {
          this.files = [{url}];
          this.localImages = [url]
        } else {
          this.files = [];
        }
      },
    },
  };
</script>

<style lang="scss">
  @import "../../../common/styles/mixin";

  .topic-scroll {
    .topic-block {
      position: relative;
      border-radius: 8px;
      border: 1px solid $light_gray;
      display: flex;
      overflow: hidden;
      height: 100px;
      margin-bottom: 15px;
      .text {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-left: 15px;
        font-size: 13px;
        line-height: 16px;
        min-width: 185px;
        word-break: break-all;
        p {
          min-height: 48px;
          width: 100%;
          @include multi-line-text(3);
        }
        .gray {
          color: $gray;
        }
      }
      .media, .wechat-media {
        flex: 0 0 80px;
        border-radius: 6px; /* off */
        margin: 10px 10px 10px 48px;
        .cube-upload {
          .cube-upload-file {
            .cube-upload-file-status.cubeic-right {
              color: $blue;
            }
            .cube-upload-file-def {
              border-radius: 2px; /* off */
            }
          }

          .cubeic-wrong {
            font-size: 12px;
            color: rgba(0, 0, 0, 1);
          }
          .upload-button {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            height: 80px;
            width: 80px;
            color: $gray;
            i {
              margin-bottom: 10px;
              font-size: 14px;
              font-weight: 700;
            }
            p {
              font-size: 12px;
            }
          }
        }
      }
      .border-1px {
        border: 1px solid $light_gray;
      }
      .wechat-media {
        flex: 0 0 80px;
        border-radius: 6px; /* off */
        margin: 10px 10px 10px 48px;
        .upload-button {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 80px;
          width: 80px;
          color: $gray;
          i {
            margin-bottom: 10px;
            font-size: 14px;
            font-weight: 700;
          }
          p {
            font-size: 12px;
          }
        }
        .cover {
          height: 80px;
          width: 80px;
          border-radius: 2px;
          .cubeic-wrong {
            position: absolute;
            top: 5px;
            right: 5px;
            z-index: 2;
            font-size: 20px;
            background-color: $white;
            border-radius: 50%;
          }

        }
      }
    }
  }

</style>
