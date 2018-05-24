<template>
  <div id="app">
    <transition name="fade">
      <navigation>
        <router-view keep-alive></router-view>
      </navigation>
    </transition>
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
    transition: opacity .4s;
  }

  .fade-enter, .fade-leave-to
  {
    opacity: 0;
  }
</style>
