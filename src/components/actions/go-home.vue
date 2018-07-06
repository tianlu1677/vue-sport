<template>
  <div class="go-home" @click="goHome">
    <span class="icon-home"></span>
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
    bottom: 100px;
    right: 30px;
    box-shadow: #0099FF;
    font-size: 20px;
    background-color: $white;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    text-align: center;
  }
</style>
