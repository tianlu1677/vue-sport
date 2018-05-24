<template>
  <div id="app">
    <transition name="fade">
      <navigation>
        <router-view keep-alive></router-view>
      </navigation>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'App'
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
