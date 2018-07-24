<template>
  <div class="go-home" @click="goHome">
    <span class="icon-back-home"><span class="path1"></span><span class="path2"></span></span>
  </div>
</template>

<script>
  export default {
    name: "go-home",
    components: {},
    props: {},
    data() {
      return {}
    },
    computed: {},
    created() {
    },
    methods: {
      goHome() {
        this.$router.push({path: '/home'})
      }
    }
  }
</script>

<style scoped lang="scss">
  .go-home {
    position: fixed;
    bottom: 120px;
    right: 20px;
    font-size: 45px;
    z-index: 100;
    .icon-back-home {
      font-weight: 900;
      background-color: #dedddb;
      border-radius: 50%;
      opacity: 0.95;
    }
  }
</style>
