<template>
  <div class="new-topic">
    <div class="topic">
      <cube-scroll ref="scroll"
                   :data="formData"
                   class="scroll-content">
        <div class="course-wrapper" @click="handleSearchBox">
          <!-- 课时或者课时 -->
          <chose-course :currentCourse.sync="currentCourse"></chose-course>
        </div>

        <div class="form-wrapper">
          <div class="content-wrapper">
            <cube-swipe>
              <div class="swipe-item-wrapper" v-for="(topicForm, index) in formData" :key="topicForm.index">
                <cube-swipe-item
                  ref="swipeItem"
                  :btns="deleteButton"
                  :index="index"
                  @btn-click="onBtnClick"
                  @active="onItemActive">
                  <topic-block :topicForm="topicForm"
                               @handleEditText="handleEditText(index)"
                  ></topic-block>
                </cube-swipe-item>
              </div>

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
          提交
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
  import {createTopic} from "@/api/topic_api";
  import TopicBlock from './coms/topic-block'
  import EditText from './coms/edit-text'
  import EditTag from './coms/edit-tag'
  import ChoseCourse from './coms/chose-course'
  import SearchCourse from './coms/search-course'

  export default {
    name: "new",
    components: {
      TopicBlock,
      EditText,
      EditTag,
      ChoseCourse,
      SearchCourse
    },
    data() {
      return {
        formData: [{
          text: '',
          type: 'image',
        },
        ],
        tag_list: [],
        currentCourse: {},
        scrollOptions: {
          scrollbar: {
            fade: true
          },
        },
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
        showSearchBox: false
      }
    },
    created() {
      this.activeIndex = -1
      this.syncRouteCourse()
    },
    computed: {
      firstFormTopicHasValue() {
        if (this.formData[0]) {
          return this.formData[0].text && this.formData[0].text.length > 1 && this.currentCourse.id
        } else {
          return false
        }
      }
    },
    mounted() {
    },
    methods: {
      // 根据路由获取数据
      syncRouteCourse() {
        if (this.$route.query) {
          this.currentCourse.id = this.$route.query.course_id
          this.currentCourse.type = this.$route.query.type
        }
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
          image_url: null
        });
        this.hideAddButton()
      },
      addMedia() {
        this.formData.push({
          type: 'image',
          text: '',
          image_url: null
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
        this._submitFormTopic()
      },

      // 心得块的左滑删除
      onBtnClick(btn, index) {
        if (btn.action === 'delete') {
          this.$createActionSheet({
            title: '确认要删除吗',
            active: 0,
            data: [
              {content: '删除'}
            ],
            onSelect: () => {
              this.formData.splice(index, 1)
            }
          }).show()
        } else {
          this.$refs.swipeItem[index].shrink()
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
          this.$router.push({path: `/topics/${topic.id}`})
        }, 1000)
      }
    }

  }
</script>

<style scoped lang="scss">
  .new-topic {
    /*position: fixed;*/
    /*top: 0;*/
    /*bottom: 0;*/
    /*right: 0;*/
    /*left: 0;*/
    .topic {
      position: fixed;
      top: 0;
      bottom: 50px;
      left: 0;
      right: 0;
      .scroll-content {
        width: 100%;
        .course-wrapper {

        }
        .form-wrapper {
          padding-top: 17.5px;
          .content-wrapper {
            padding: 0 17.5px;
            position: relative;
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
</style>
