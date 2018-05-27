<template>
  <div class="new-topic">
    <div class="topic">
      <cube-scroll ref="scroll"
                   :data="formData"
                   :options="scrollOptions"
                   class="scroll-wrapper">
        <div class="course-wrapper" @click="handleSearchBox">
          <!-- 课时或者课时 -->
          <chose-course :currentCourse.sync="currentCourse"></chose-course>
        </div>

        <div class="form-wrapper">
          <div class="content-wrapper">
            <cube-swipe>
              <transition-group name="swipe" tag="div">
                <div class="swipe-item-wrapper" v-for="(topicForm, index) in formData" :key="index">
                  <cube-swipe-item
                    ref="swipeItem"
                    :btns="topicForm.btn"
                    :index="index"
                    @btn-click="onBtnClick"
                    @active="onItemActive">
                    <topic-block :topicForm.sync="topicForm"
                                 @handleEditText="handleEditText(index)"
                                 class="item-inner"
                    ></topic-block>
                  </cube-swipe-item>
                </div>
              </transition-group>
            </cube-swipe>

            <div class="border-top-1px"></div>
            <div class="tag-wrapper" @click="handleShowEditTag">
              <div class="icon">
                <i class="icon-tag"></i>
                <span class="text">标签</span>
              </div>
              <span class="tag-list">
              <span class="tag" v-for="tag in tag_list">{{tag}}</span>
            </span>
              <i class="icon-arrow-right"></i>
            </div>
            <div class="border-bottom-1px"></div>
          </div>
        </div>
      </cube-scroll>
    </div>
    <div class="add-content">
      <transition name="slide-fade">
        <div class="content-button" v-show="showAddButton">
          <i class="icon-topic-add-text" @click="addText"></i>
          <span class="text">文字</span>
          <i class="icon-topic-add-media" @click="addMedia"></i>
          <span class="text">图片</span>
        </div>
      </transition>
      <i class="icon-topic-add" v-show="!showAddButton" @click="handleAddButton"></i>
      <i class="icon-topic-close" v-show="showAddButton" @click="handleAddButton"></i>
    </div>
    <div class="button-wrapper" @click.once="submitHandler">
      <cube-form-group>
        <cube-button :disabled="!firstFormTopicHasValue">
          打卡
        </cube-button>
      </cube-form-group>
    </div>

    <!--编辑文字-->
    <edit-text :topicForm.sync="currentEditForm"
               v-show="showEditText"
               @hideEdit="handleHideEdit"
    ></edit-text>
    <!--编辑标签-->
    <edit-tag :tag_list="tag_list"
              v-show="showEditTag"
              @hideEditTag="handleHideEditTag"
              @submitTag="refreshTag"
    >
    </edit-tag>
    <div v-if="showSearchBox">
      <search-course :currentCourse="currentCourse"
                     @hideSearchBox="hideSearchBox"
      ></search-course>
    </div>

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {Dialog} from '@/base/dialog/dialog'
  import {createTopic, updateTopic} from "@/api/topic_api";
  import TopicBlock from './coms/topic-block'
  import EditText from './coms/edit-text'
  import EditTag from './coms/edit-tag'
  import ChoseCourse from './coms/chose-course'
  import SearchCourse from './coms/search-course'
  import {verifyInviteCode} from '@/api/mine_api'

  export default {
    name: "new",
    components: {
      TopicBlock,
      EditText,
      EditTag,
      ChoseCourse,
      SearchCourse,
      // Confirm
    },
    data() {
      return {
        scrollOptions: {
          bounce: {
            top: false,
          },
          bounceTime: 300,
          scrollbar: {
            fade: true
          },
        },
        formData: [{
          text: '',
          type: 'image',
        }],
        topic_id: undefined,
        tag_list: [],
        currentCourse: {},
        valid: true,
        showAddButton: false,
        deleteButton: [
          {
            action: 'delete',
            text: '删除',
            color: '#ff3a32'
          }
        ],
        currentEditForm: {},
        showEditText: false,
        showEditTag: false,
        showSearchBox: false,
        verifyCode: '',
        activeIndex: -1
      }
    },
    created() {
      this.syncRouteCourse()
    },
    beforeDestroy() {
      console.log('提示是否跳转')
    },
    computed: {
      ...mapGetters({
        topicDetail: 'topicDetail',
        currentAccount: 'currentAccount'
      }),
      firstFormTopicHasValue() {
        if (this.formData[0]) {
          return this.formData[0].text && this.formData[0].text.length > 1 && this.currentCourse.id
        } else {
          return false
        }
      }
    },
    mounted() {
      this.canNewTopic()
    },
    beforeRouteEnter(to, from, next) {
      next()
    },

    beforeRouteLeave(to, from, next) {
      console.log('to', to)
      if (to.name !== 'topicDetail') {
        next(false)
        this.showSaveTip(next)
      } else {
        next()
      }
    },

    methods: {
      ...mapActions({
        setTopicDetail: 'setTopicDetail'
      }),

      // 根据路由获取数据
      async syncRouteCourse() {
        const query = this.$route.query
        const params = this.$route.params
        if (query && query.course_id) {
          this.currentCourse.id = query.course_id
          this.currentCourse.type = query.type
        }
        if (params && params.id) {
          await this.setTopicDetail(params.id)
          this.topic_id = params.id
          this.formData = this.topicDetail.raw_content
          this.tag_list = this.topicDetail.tag_list
          this.currentCourse = this.topicDetail.course || this.topicDetail.lesson
        }

        this.formData = this.formData.map((data) => {
          return {...data, btn: this.deleteButton}
        })
      },
      //处理搜索框
      handleSearchBox() {
        this.showSearchBox = true
      },
      hideSearchBox(item) {
        this.showSearchBox = false
        this.currentCourse = item
      },

      // 添加图文或者文字
      handleAddButton() {
        this.showAddButton = !this.showAddButton
      },
      hideAddButton() {
        if (this.showAddButton) {
          this.showAddButton = false
        }
      },
      addText() {
        this.formData.push({
          type: 'text',
          text: '',
          image_url: '',
          btn: this.deleteButton
        });
        this.hideAddButton()
      },
      addMedia() {
        this.formData.push({
          type: 'image',
          text: '',
          image_url: '',
          btn: this.deleteButton
        });

        this.hideAddButton()
      },
      // 编辑标签
      handleShowEditTag() {
        this.showEditTag = true
        this.hideAddButton()
      },
      // 编辑内容
      handleEditText(index) {
        this.showEditText = true
        this.currentEditForm = this.formData[index]
        this.hideAddButton()
      },
      handleHideEdit() {
        this.showEditText = false
      },

      // 更新标签
      refreshTag(labelList) {
        let tags = [].concat(labelList)
        this.tag_list = Array.from(new Set(tags))
      },
      handleHideEditTag() {
        this.showEditTag = false
      },
      // 提交整体数据
      submitHandler(e) {
        e.preventDefault()
        if (this.topic_id) {
          this._updateFormTopic()
        } else {
          this._submitFormTopic()
        }
      },

      // 心得块的左滑删除
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗?',
            data: [
              {content: '删除'}
            ],
            active: 0,
            onSelect: () => {
              this.$refs.swipeItem[index].shrink()
              this.formData.splice(index, 1)
            },
            onCancel: () => {
              this.$refs.swipeItem[index].shrink()
            }
          }).show()
        } else {
          // this.$refs.swipeItem[index].shrink()
        }
      },
      onItemActive(index) {
        this.hideAddButton()
        if (index === this.activeIndex) {
          return
        }
        if (this.activeIndex !== -1) {
          const activeItem = this.$refs.swipeItem[this.activeIndex]
          activeItem.shrink()
        }
        this.activeIndex = index
      },

      async _submitFormTopic() {
        const response = await createTopic({
          course_id: this.currentCourse.id,
          raw_content: this.formData,
          tag_list: this.tag_list
        })
        const topic = response.topic
        this.$createToast({
          type: 'correct',
          txt: '创建成功',
          time: 2000
        }).show()

        setTimeout(() => {
          this.$router.replace({path: `/topics/${topic.id}`})
        }, 1000)
      },

      async _updateFormTopic() {
        const response = await updateTopic(this.topic_id, {
          id: this.topic_id,
          course_id: this.currentCourse.id,
          raw_content: this.formData,
          tag_list: this.tag_list
        })
        const topic = response.topic
        this.$createToast({
          type: 'correct',
          txt: '更新成功',
          time: 2000
        }).show()

        setTimeout(() => {
          this.$router.replace({path: `/topics/${topic.id}`})
        }, 1000)
      },

      showSaveTip(next) {
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '您当前内容还未保存，确认离开',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: (e) => {
            console.log(e)
            next()
          },
        }).show()
      },

      canNewTopic() {
        console.log(this.currentAccount)
        if (this.currentAccount.role !== 'invite') {
          this._showVerifyCodeDialog()
        }
      },

      _showVerifyCodeDialog() {
        this.dialog = this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          title: '请输入邀请验证码',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onCancel: (e) => {
            this.$router.back()
          },
          onConfirm: async (e) => {
            if (this.verifyCode && this.verifyCode.length >= 4) {
              try {
                const res = await verifyInviteCode({code: this.verifyCode})
                if (res) {
                  this.$createToast({txt: '验证码正确, 将要刷新', time: 1000}).show()
                  window.location.reload()
                } else {
                  this.dialog.show()
                }
              } catch (e) {
                this.$createToast({txt: '验证码错误', time: 1000}).show()
                this.dialog.show()
              }
            } else {
              this.dialog.show()
            }
          },
        }, (createElement) => {
          var self = this

          return [
            createElement('cube-input', {
              'class': {
                'verify-code-input': true
              },
              style: {},
              attrs: {
                placeholder: '请输入验证码',
                autofouces: true
              },
              domProps: {
                verifyCode: self.verifyCode
              },
              on: {
                input: (value) => {
                  self.verifyCode = value
                }
              },
              ref: 'verifyCode',
              slot: 'content'
            })
          ]
        })
        this.dialog.show()
      }
    }

  }
</script>

<style lang="scss">
  .new-topic {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .topic {
      position: fixed;
      width: 100%;
      top: 0;
      bottom: 50px;
      left: 0;
      right: 0;
      .scroll-wrapper {
        width: 100%;
        .form-wrapper {
          padding-top: 17.5px;
          padding-bottom: 25px;
          .content-wrapper {
            padding: 0 17.5px;
            position: relative;

            .swipe-item-wrapper {
              overflow: hidden;
              .swipe-enter-active, .swipe-leave-active {
                transition: all .3s;
                .item-inner {
                  transition: all .3s;
                }
              }
              .swipe-enter, .swipe-leave-to {
                .item-inner {
                  height: 0;
                }

              }
            }

            .tag-wrapper {
              display: flex;
              box-sizing: padding-box;
              min-height: 60.5px;
              line-height: 60.5px;
              font-size: 14px;
              .icon {
                .icon-tag {
                  margin-left: 5px;
                }
                .text {
                  margin-left: 8px;
                }
              }
              .tag-list {
                flex: 1;
                margin-left: 27.5px;
                margin-right: 10px;
                margin-top: 16px;
                margin-bottom: 16px;
                line-height: 30px;
                font-size: 12px;
                color: $blue;
                .tag {
                  border: 1px solid $blue;
                  border-radius: 5px;
                  padding: 3px;
                  margin-right: 10px;
                  margin-bottom: 10px;
                }
              }
              .icon-arrow-right {
                top: 0;
                right: 17.5px;
                line-height: 60.5px;
              }
            }
          }
        }
      }
    }

    .add-content {
      position: fixed;
      bottom: 150px;
      padding: 0 17.5px;
      font-size: 43px;
      right: 0;
      z-index: 10;
      i {
        background-color: $white;
        border-radius: 50%;
      }
      .slide-fade-enter-active {
        transition: all .3s ease;
      }
      .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
      }
      .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
      {
        transform: translateY(10px);
        opacity: 0;
      }
      .content-button {

        display: flex;
        flex-direction: column;
        margin-bottom: 17.5px;
        .item-button {
          flex: 1;
        }
        .icon-topic-add-media {
          margin-top: 17.5px;
        }
        .text {
          margin-top: 7px;
          font-size: 13px;
          text-align: center;
        }

      }
    }
    .button-wrapper {
      padding: 0;
      position: fixed;
      bottom: 0;
      margin: 0;
      width: 100%;
      .submit-button {
        padding: 17px 16px;
        text-align: center;
        white-space: nowrap;
        font-size: 16px;
        color: $white;
      }
    }
  }

  .verify-code-input {
    > input {
      text-align: center;
    }
  }
</style>
