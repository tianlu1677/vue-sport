<template>
  <div class="bottom-wrapper">
    <div class="border-top-1px"></div>
    <ul class="item-list">
      <li class="item" @click="goPages('home')">
        <span class="icon" :class="[bottomNav.home ? 'icon-home-solid' : 'icon-home']"></span>
        <span class="text">推荐</span>
      </li>
      <li class="item" @click="goPages('topic')">
        <span class="icon" :class="[bottomNav.topic ? 'icon-new-topic' : 'icon-new-topic']"></span>
        <span class="text">发布</span>
      </li>
      <li class="item" @click="goPages('mine')">
        <span class="icon" :class="[bottomNav.mine ? 'icon-user-solid' : 'icon-user']"></span>
        <span class="text">我</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {SET_BOTTOM_NAV} from "@/store/types";
  export default {
    name: "bottom-nav",
    computed: {
      ...mapGetters(['bottomNav'])
    },
    methods: {
      ...mapMutations({
        setBottomNav: SET_BOTTOM_NAV
      }),
      goPages(type) {
        const path = "/" + type
        switch (type) {
          case 'home':
            this.setBottomNav({home: true, topic: false, mine: false})
            this.$router.push({path: path})
            break;
          case 'topic':
            this.setBottomNav({home: false, topic: true, mine: false})
            this.$router.push({path: '/topics/new'})
            break;
          case 'mine':
            this.setBottomNav({home: false, topic: false, mine: true})
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
