<template>
  <div id="app">
    <!--<transition name="fade">-->
    <transition name="slide">
      <div :class="{'is-edge-back':$isEdgeLeft,'is-edge-forward':$isEdgeRight}">
        <!-- <navigation> -->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
      <!-- </navigation> -->
    </transition>
    <!--</transition>-->
    <loading v-model="isLoading"></loading>
    <share-dialog v-show="showShare"></share-dialog>
  </div>
</template>

<script>
  import {Loading} from 'vux'
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    components: {
      Loading
    },
    computed: {
      ...mapGetters({
        showShare: 'showShare',
        isLoading: 'isLoading'
      })
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  /**/
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  // ORIGIN: set slide transition effect time
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }

  // ORIGIN: add slide transition effect
  .slide-enter,
  .slide-leave-to {
    transform: translate3d(100%, 0, 0);
  }

  // EXTRA: this component should have no transition with edge forward/back
  .is-edge-forward.slide-enter-active,
  .is-edge-back.slide-leave-active {
    transition: all 0s;
  }

  // EXTRA: this component should not display at slide-leave start
  // or else it will blink
  .is-edge-back.slide-leave {
    transform: translate3d(100%, 0, 0);
  }

  // EXTRA: this component should display and not move at slide-enter start
  // or else it will jump
  .is-edge-forward.slide-enter {
    transform: translate3d(0, 0, 0);
  }
</style>
