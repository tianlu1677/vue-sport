<template>
  <router-link :to="{path: '/topics/new'}" tag="div">
    <icon-block icon="icon-write" text="写心得"></icon-block>
  </router-link>
</template>

<script>
  import IconBlock from 'base/icon-block/icon-block'

  export default {
    name: "new-topic-icon",
    components: {
      IconBlock
    },
    props: {
      text: String,
      count: String
    }
  }
</script>

<style scoped lang="scss">

</style>

