<template>
  <div class="tag-wrapper">
    <cube-button class="tag" :outline="true">
      <span>{{tag}}</span>
    </cube-button>
  </div>
</template>

<script>
  export default {
    props: {
      tag: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="scss">
  .tag-wrapper {
    display: inline-block;
    margin: 5px 2.5px;
    height: 26px;
    border-radius: 10px;
    .tag {
      padding: 6px;
      .span {
        font-size: 14px;
      }
    }
  }

</style>
