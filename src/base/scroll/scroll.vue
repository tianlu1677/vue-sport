<template>
  <div v-infinite-scroll="loadMore"
       infinite-scroll-disabled="busy"
       infinite-scroll-distance="100"
       infinite-scroll-immediate-check="false"

       class="scroll-content">
    <slot></slot>
    <loading v-if="busy"></loading>
    <template v-if="!busy && empty">
      <empty></empty>
    </template>

  </div>
</template>

<script>
  import Loading from 'base/loading/loading';
  import Empty from 'components/empty/empty';

  export default {
    name: 'scroll',
    components: {
      Loading,
      Empty,
    },
    props: {
      busy: {
        type: Boolean,
        default: false,
      },
      empty: {
        type: Boolean,
        default: false,
      },
      immediate_check: {
        type: Boolean,
        default: true,
      },
    },
    methods: {
      loadMore() {
        this.$emit('loadMore');
      },
    },
  };
</script>

<style lang="scss">

</style>
