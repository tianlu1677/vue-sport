<template>
  <div class="bottom-wrapper">
    <div class="border-top-1px"></div>
    <ul class="item-list">
      <li class="item" @click="goPages('home')">
        <div class="inline-item">
        <span class="icon" :class="[highlight ? 'icon-home-solid' : 'icon-home']"></span>
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
          <span class="icon" :class="[!highlight ? 'icon-user-solid' : 'icon-user']"></span>
          <span class="text">我</span>
        </div>
        
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {TopicScrollMixin} from 'components/mixin/topic_scroll_mixin';

  export default {
    name: 'bottom-nav',
    // mixins: [TopicScrollMixin],
    computed: {
      ...mapGetters(['route']),
      highlight() {
        if (this.route.path.indexOf('mine') > 0) {
          return false;
        }
        return true;
      },
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
      padding: 0 35px 0 35px;      
      display: flex;
      justify-content: space-around;
      flex-flow: row wrap;
      align-item: center;


      
      // flex: 1 1 100px;
      // 
      // display: grid;
      // grid-template-columns: 1fr 1fr 1fr;
      // grid-column-gap: 26.5px;
      // justify-items: center;
      .item {
        flex-grow: 1;
        text-align: center;
                
        @include extend-click(0px, -25px, 0px, -25px);
        .inline-item {
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
        }
        

      }
    }
  }
</style>
