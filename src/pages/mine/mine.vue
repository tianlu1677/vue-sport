<template>
  <div class="mine">
    <!--顶部位置-->
    <div class="header-wrapper">
      <account-header :account="currentAccount"></account-header>
    </div>
    <!--心得-->
    <div class="content-wrapper">
      <div class="border-top-1px"></div>

      <router-link to="/mine/insite_notifies" tag="div">
        <div class="topic item">
          <h1 class="text"> 消息 </h1>
          <i class="icon-arrow-right"></i>
          <div class="message-position">
            <message :message_count="message_count">
            </message>
          </div>
        </div>
      </router-link>

      <router-link to="/mine/publish_topics" tag="div">
        <div class="border-top-1px"></div>
        <div class="topic item">
          <h1 class="text"> 心得 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <router-link to="/mine/courses?type=publish" tag="div" v-if="currentAccount.publish_courses_count > 0">
        <div class="learn item">
          <h1 class="text"> 课程 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <router-link to="/mine/courses?type=learn" tag="div">
        <div class="learn item">
          <h1 class="text"> 学过 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <router-link to="/mine/star?type=praise" tag="div">
        <div class="border-top-1px"></div>
        <div class="like item">
          <h1 class="text"> 喜欢 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <router-link to="/mine/star?type=star" tag="div">
        <div class="star item">
          <h1 class="text"> 收藏 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <div class="border-top-1px"></div>

      <router-link to="/feedbacks/new" tag="div">
        <div class="feedback item">
          <h1 class="text"> 反馈 </h1>
          <i class="icon-arrow-right"></i>
        </div>
      </router-link>

      <div class="border-top-1px"></div>
    </div>


    <bottom-nav></bottom-nav>

  </div>


</template>

<script>
  import {mapGetters} from 'vuex';
  import Message from 'base/message/message'
  import AccountHeader from 'components/account-header/account-header';
  import BottomNav from 'components/bottom-nav/bottom-nav';

  export default {
    name: 'mine',
    components: {
      AccountHeader,
      BottomNav,
      Message,
    },

    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        currentAccount: 'currentAccount',
      }),
      message_count() {
        return this.currentAccount.unread_insite_notifies_count + this.currentAccount.unread_comments_notifies_count
      }
    },

    created() {
      window.wechatShare({
        title: `${this.currentAccount.nickname}的个人主页`,
        desc: "欢迎进入我的个人主页",
        link: window.location.origin + `/web/accounts/${this.currentAccount.id}`,
        imgUrl: this.currentAccount.avatar_url
      });
    },

    methods: {},

  };
</script>

<style lang="scss" scoped>
  .mine {
    /*position: fixed;*/
    /*top: 0;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    .content-wrapper {
      margin-top: 27.5px;
      padding: 0 17.5px;
      display: flex;
      flex-direction: column;
      .item {
        position: relative;
        display: flex;
        align-items: center;
        height: 50px;
        .text {
          font-size: 14px;
          font-weight: bolder;
        }
        i {
          position: absolute;
          right: 0;
          font-size: 12px;
        }
        /*未读消息*/
        .message-position {
          position: absolute;
          right: 20px;
          font-size: 19px;
        }
      }
    }
  }

</style>
