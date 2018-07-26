<template>
  <div class="bottom-wrapper">
    <div class="border-top-1px"></div>
    <ul class="item-list">
      <li class="item" @click="goPages('home')">
        <div class="inline-item">
          <span class="icon" :class="[route.name === 'home' ? 'icon-home-solid' : 'icon-home']"></span>
        <span class="text">推荐</span>
        </div>
      </li>
      <li class="item" @click="goPages('topic')">
        <div class="inline-item">
          <span class="icon icon-new-topic"></span>
          <span class="text">打卡</span>
        </div>

      </li>
      <li class="item" @click="goPages('mine')">
        <div class="inline-item">
          <span class="icon" :class="[route.name === 'mine' ? 'icon-user-solid' : 'icon-user']"></span>
          <span class="text">我</span>
          <message :message_count="message_count" class="message-position">
          </message>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import Message from 'base/message/message'
  export default {
    name: 'bottom-nav',
    components: {
      Message
    },
    data() {
      return {}
    },

    computed: {
      ...mapGetters(['route', 'currentAccount']),
      // highlight() {
      //   if (this.route.name === 'mine') {
      //     this.light.mine = true
      //     this.light.home = false
      //   }
      //   if (this.route.path.indexOf('home') > 0) {
      //     this.light.home = true
      //     this.light.mine = false
      //   }
      //   return true
      // },
      message_count() {
        if (this.currentAccount) {
          return this.currentAccount.unread_insite_notifies_count + this.currentAccount.unread_comments_notifies_count
        }
      }
    },
    methods: {
      goPages(type) {
        const path = `/${type}`;
        switch (type) {
          case 'home':
            if (this.$route && this.$route.name === 'home') {
              this.$emit('select')
            } else {
              this.$router.push({path});
            }
            break;
          case 'topic':
            this.$router.push({path: '/topics/new'});
            break;
          case 'mine':
            this.$router.push({path: '/mine'});
            break;
          default:
            this.$router.push({path});
            break;
        }
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";
  .bottom-wrapper {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    background-color: $white;
    bottom: 0;
    z-index: 9999;
    .item-list {
      padding: 0 10px 0 10px;
      display: flex;
      /*justify-content: space-around;*/
      flex-flow: row wrap;
      .item {
        flex-grow: 1;
        text-align: center;

        @include extend-click(0px, -25px, 0px, -25px);
        .inline-item {
          position: relative;
          display: flex;
          flex-direction: column;
          .icon {
            margin-top: 7.5px;
            font-size: 22.5px;
            margin-bottom: 5px;
          }
          .text {
            margin: auto;
            font-size: 10px;
          }

          /*未读消息*/
          .message-position {
            position: absolute;
            top: 7.5px;
            right: 24px;
          }
        }

      }
    }
  }
</style>
