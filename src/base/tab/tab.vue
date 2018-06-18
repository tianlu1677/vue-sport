<template>
  <tab active-color="#0099FF"
       bar-active-color=""
       bar-position="bottom"
       :line-width="0"
       class="tab-border"
  >
    <slot>
    </slot>
  </tab>
</template>

<script>
  import {Tab} from 'vux';

  export default {
    name: 'base-tab',
    components: {
      Tab,
    },
    props: {},
    data() {
      return {};
    },
    computed: {},
    created() {
    },
    methods: {},

  };
</script>

<style scoped lang="scss">
  .tab-border {
    border-top: 1px solid #E5E5E5;
  }
</style>
