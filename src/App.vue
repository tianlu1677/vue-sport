<template>
  <div id="app">
    <transition name="fade">
      <navigation>
        <router-view keep-alive></router-view>
      </navigation>
    </transition>
    <share-dialog v-show="showShare"></share-dialog>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'App',
    computed: {
      ...mapGetters({
        showShare: 'showShare'
      })
    }
  }
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }

  .fade-enter, .fade-leave-to
  {
    opacity: 0;
  }
</style>
