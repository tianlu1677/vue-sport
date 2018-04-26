<template>
  <div class="tag-wrapper">
    <button class="tag">
      <span class="text">{{tag}}</span>
    </button>
  </div>
</template>

<script>
  const COMPONENT_NAME = 'tag'
  export default {
    name: COMPONENT_NAME,
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
    border-radius: 5px;
    margin: 4.5px;
    border: 1px solid $gray;
    .tag {
      display: flex;
      height: 26px;
      .text {
        margin: 0 auto;
        font-size: 14px;
      }
    }
  }

</style>
