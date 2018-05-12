<template>
  <div class="bottom-wrapper">
    <div class="border-top-1px"></div>
    <ul class="item-list">
      <li class="item" @click="goPages('home')">
        <span class="icon" :class="[highlight ? 'icon-home-solid' : 'icon-home']"></span>
        <span class="text">推荐</span>
      </li>
      <li class="item" @click="goPages('topic')">
        <span class="icon icon-new-topic"></span>
        <span class="text">发布</span>
      </li>
      <li class="item" @click="goPages('mine')">
        <span class="icon" :class="[!highlight ? 'icon-user-solid' : 'icon-user']"></span>
        <span class="text">我</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "bottom-nav",
    computed: {
      ...mapGetters(['route']),
      highlight() {
        if (this.route.path.indexOf('mine') > 0) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      goPages(type) {
        const path = "/" + type
        switch (type) {
          case 'home':
            this.$router.push({path: path})
            break;
          case 'topic':
            this.$router.push({path: '/topics/new'})
            break;
          case 'mine':
            this.$router.push({path: '/mine'})
            break;
        }
      }
    }
  }
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
    z-index: 999;
    .item-list {
      padding: 0 35px 0 35px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 26.5px;
      justify-items: center;
      .item {
        display: flex;
        flex-direction: column;
        @include extend-click(0px, -25px, 0px, -25px);
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
</style>
