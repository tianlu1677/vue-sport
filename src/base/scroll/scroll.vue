<template>
  <div v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="5"
       class="scroll-content">
    <slot></slot>
    <loading v-if="busy"></loading>
  </div>
</template>

<script>
  import Loading from 'base/loading/loading'
  import Empty from 'components/empty/empty'

  export default {
    name: "scroll",
    components: {
      Loading,
      Empty
    },
    props: {
      busy: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      loadMore() {
        this.$emit('loadMore')
      }
    }
  }
</script>

<style lang="scss">

</style>
