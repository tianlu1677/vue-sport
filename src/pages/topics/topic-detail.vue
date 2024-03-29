<template>
  <div>
    <div class="topic-detail">
      <div class="avatar-content">
        <avatar :account="topicDetail.account" :time="topicDetail.published_at_text">
          <span class="follow-text"
                slot="right"
                v-if="showEditButton"
                @click="goEditTopic"
          >
            编辑
          </span>
        </avatar>
      </div>
      <div class="topic-course">
        <learning-course-card :learning="learning">
        </learning-course-card>
      </div>
      <div class="topic-content">
        <div class="content-block" v-for="(content, index) in topicDetail.raw_content"
             v-if="content.text || content.image_url">
          <p class="text" v-if="content.text"
             v-html="content.text.replace(/\n/g, '<br/>')"
          >

          </p>
          <img :src="content.image_url" class="image" height="100%" width="100%" alt=""
               v-if="content.image_url && !content.video_url">

          <div class="video-wrapper" v-if="content.video_url">
            <video webkit-playsinline playsinline :src="content.video_url"
                   controls
                   class="mobile-video"
                   style="width: 100%;height: 100%;background-color: black"
                   :poster="content.image_url"

            >
            </video>
          </div>
        </div>
        <div class="tag-list" v-if="topicDetail.tag_list && topicDetail.tag_list.length > 0">
          <ul class="item-list">
            <li class="item" v-for="tag in topicDetail.tag_list">
              <tag :tag="tag"></tag>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-top-1px"></div>
      <div class="comment-content">
        <scroll :busy="busy" @loadMore="loadMore" :empty="commentList.length <= 0">
          <comment-list :commentList="commentList" :comments_count="topicDetail.comments_count"></comment-list>
        </scroll>
        <!--<infinite-loading force-use-infinite-wrapper="true"-->
        <!--@infinite="infiniteHandler"-->
        <!--&gt;-->
        <!--<span slot="no-more">-->
        <!--</span>-->
        <!--</infinite-loading>-->
      </div>
    </div>

    <div class="topic-bottom border-top-1px">
      <div class="comment-button" @click="newComment">
        <div class="new-comment">
          <i class="icon-pencel"></i>
          <span class="text">写评论</span>
        </div>
      </div>
      <div class="actions">
        <topic-actions :topicDetail="topicDetail"></topic-actions>
      </div>
    </div>
    <go-home></go-home>
  </div>
</template>

<script>
  import {mapGetters, mapActions, mapMutations} from 'vuex';
  import InfiniteLoading from 'vue-infinite-loading';
  import Scroll from 'base/scroll/scroll';
  import Action from 'components/actions/action';
  import LearningCourseCard from 'components/course-card/learning-course-card';
  import Avatar from 'components/avatar/avatar';
  import TopicActions from 'components/topic-actions/topic-actions';
  import Tag from 'base/tag/tag';
  import CommentList from 'components/comments/comment-list'
  import NewComment from 'components/comments/new-comment'
  import GoHome from 'components/actions/go-home';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  // import {InfiniteMixin} from 'components/mixin/infinite_mixin';
  import {currentAccount} from '@/store/getters';
  import {getLessonBase} from '@/api/lesson_api';
  import {getCourseLearning} from '@/api/learning_api';
  import {wechatShare} from '@/common/js/wx_config';
  import {getTopicCommentList, createComment, deleteComment, praiseComment, unpraiseComment} from "@/api/comment_api";

  export default {
    name: 'topic-detail',
    // mixins: [InfiniteMixin],
    mixins: [ScrollMixin],
    components: {
      Avatar,
      LearningCourseCard,
      Action,
      Tag,
      TopicActions,
      CommentList,
      NewComment,
      InfiniteLoading,
      Scroll,
      GoHome
    },
    data() {
      return {
        learning: {},
      };
    },
    async created() {
      await this.setTopicDetail(this.topic_id);
      this.topicCreateAction({topic_id: this.topic_id, type: 'view'});
      this._getLearningStatus();
      this._setShareInfo();
    },

    async activated() {
    },

    // beforeRouteUpdate(to, from, next) {
    //   // console.log('beforeRouteUpdate', to)
    //   // 在当前路由改变，但是该组件被复用时调用
    //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    //   // 可以访问组件实例 `this`
    // },
    beforeRouteLeave(to, from, next) {
      this.emptyTopicDetail({})
      next();
    },

    computed: {
      ...mapGetters({
        topicDetail: 'topicDetail',
        currentAccount: 'currentAccount',
        commentList: 'commentList'
      }),

      showEditButton() {
        return this.topicDetail.account_id === this.currentAccount.id;
      },
      topic_id() {
        return this.$route.params.id
      }
    },
    methods: {
      ...mapActions({
        setTopicDetail: 'setTopicDetail',
        topicCreateAction: 'topicCreateAction',
      }),
      ...mapMutations({
        emptyTopicDetail: 'SET_TOPIC_DETAIL',
        setCommentList: 'SET_COMMENT_LIST'
      }),

      goEditTopic() {
        this.$router.push({path: `/topics/${this.topicDetail.id}/edit`});
      },
      async _getLearningStatus() {
        const res = await getCourseLearning(this.topicDetail.course_id);
        this.learning = res.learning;
      },
      newComment() {
        const pop = this.$createNewComment({topic: this.topicDetail}, false)
        pop.show()
      },
      async infiniteHandler($state) {
        if (this.paginate.hasMore) {
          await this.getItemList({page: this.paginate.nextPage})
          $state.loaded()
        } else {
          $state.complete();
        }
      },

      async getItemList(params) {
        const res = await getTopicCommentList(this.topic_id, params);
        this.itemList = this.itemList.concat(res.data.comments);
        this.setCommentList(this.itemList)
        this.pagination(res.headers);
      },

      _setShareInfo() {
        const path = window.location.href;
        const title = `${this.topicDetail.account_nickname}的每日学习心得`;
        window.wechatShare({
          title,
          link: path,
          success: (res) => {
            this.topicCreateAction({topic_id: this.topic_id, type: 'share'});
          },
        });
      },
    },
  };
</script>

<style scoped lang="scss">
  .topic-detail {
    padding: 17.5px 17.5px;
    margin-bottom: 70px;
    .avatar-content {
      .edit-topic-button {
        float: right;
      }
    }
    .topic-course {
      margin-top: 16.5px;
      margin-bottom: 16.5px;
    }
    .topic-content {
      font-size: 0;
      .content-block {
        margin-top: 16.5px;
        .text {
          margin-bottom: 16.5px;
          line-height: 18px;
          font-size: 14px;
        }
        .video-wrapper {
          font-size: 0;
          height: 240px;
        }
      }

      .tag-list {
        margin-top: 20px;
        margin-bottom: 20px;
        color: $gray;
        .item-list {
          display: inline-block;
          .item {
            display: inline-block;
          }
        }

      }
    }
    .comment-content {
      padding-top: 20px;
    }
  }

  .topic-bottom {
    position: fixed;
    height: 50px;
    width: 100%;
    line-height: 50px;
    bottom: 0;
    display: flex;
    background-color: $white;
    z-index: 10;
    .comment-button {
      padding-left: 17.5px;
      display: flex;
      width: 50%;
      margin-right: 60px;
      .new-comment {
        flex: 1;
        display: flex;
        margin: auto;
        height: 23px;
        line-height: 23px;
        border: 1px solid $black;
        border-radius: 30px;
        i {
          margin: auto;
          margin-left: 9px;
          margin-right: 4px;
          font-size: 14px;
        }
        span.text {
          font-size: 10px;
        }
      }
    }
    .actions {
      padding-right: 17.5px;
      margin: auto;
    }
  }
</style>
