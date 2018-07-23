<template>
  <div class="list-wrapper">
    <div class="top-tab">
      <cube-tab-bar
        class="tab-list"
        v-model="currentTabTxt"
        @click="switchTab"
      >
        <cube-tab v-for="(tab, index) in tabList" :label="tab.txt" :key="tab.txt"><h2 class="tab">{{tab.txt}}</h2>
        </cube-tab>
      </cube-tab-bar>
      <div class="border-bottom-1px"></div>

    </div>
    <div class="content">
      <scroll :busy="busy" @loadMore="loadMore" :empty="itemList.length <= 0">
        <comment-notify :commentList="itemList"
                        :currentAccount="currentAccount"
                        v-if="currentTab === 'comments' ">

        </comment-notify>
        <normal-notify :notifyList="itemList"
                       :currentAccount="currentAccount"
                       v-if="currentTab === 'notifies' ">

        </normal-notify>
      </scroll>
    </div>
  </div>

</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {mapGetters} from 'vuex';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import CommentNotify from 'components/insite-notifies/comment-notify'
  import NormalNotify from 'components/insite-notifies/normal-notify'

  import {
    getReplyComments,
    getInsiteNotifies,
    readMessages,
  } from '@/api/account_api';

  // const types = {star: '收藏', learn: '学过', praise: '喜欢'};
  export default {
    name: 'mine-star',
    components: {
      CommentNotify,
      NormalNotify,
      Scroll
    },
    mixins: [ScrollMixin],

    data() {
      return {
        currentTab: 'comments',
        currentTabTxt: '评论',
      };
    },
    async created() {
      this._setDocumentTitle();
      this.readAllMessages()
    },

    computed: {
      ...mapGetters([
        'currentAccount',
      ]),
      tabList() {
        return [{
          txt: '评论',
          type: 'comments',
          count: 0
        },
          {
            txt: '赞',
            type: 'notifies',
            count: 0
          },
        ]
      }
    },

    watch: {
      currentTab() {
        this.itemList = [];
        this.getItemList();
      },
    },

    methods: {
      switchTab(label) {
        this.currentTab = this.tabList.find((tab) => tab.txt === label).type;
      },

      _setDocumentTitle() {
        document.title = '我的消息';
      },
      async getItemList(params = {}) {
        let res = {};
        switch (this.currentTab) {
          case 'comments':
            res = await getReplyComments(params)
            this.itemList = this.itemList.concat(res.data.comments)
            break;
          case 'notifies':
            res = await getInsiteNotifies(params)
            this.itemList = this.itemList.concat(res.data.insite_notifies)
            break;
          default:
            console.log('no this type')
        }
        this.pagination(res.headers);
      },
      readAllMessages() {
        let message_count = this.currentAccount.unread_insite_notifies_count + this.currentAccount.unread_comments_notifies_count
        if (message_count > 0) {
          readMessages()
        }

      }

    },
  };
</script>

<style scoped lang="scss">
  .list-wrapper {
    padding: 0 17.5px;
    min-height: 220px;
    .top-tab {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 10;
      background-color: $white;
      .tab-list {
        height: 43px;
        h2.tab {
          font-size: 16px;
        }
      }
    }
    .content {
      margin-top: 70px;
    }
  }
</style>
