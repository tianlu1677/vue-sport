<template>
  <div class="loading">
    <cube-loading :size="40"></cube-loading>
  </div>

</template>

<script>
  import {Loading} from 'cube-ui'

  export default {
    components: {
      'cube-loading': Loading
    },

    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped>
  .loading {
    position: fixed;
    padding-left: 50%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
