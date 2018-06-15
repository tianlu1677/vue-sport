<template>
  <div class="tag-wrapper">
    <div class="tag">
      <span class="text">{{tag}}</span>
    </div>
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
    border: 1px solid $light_gray;
    .tag {
      display: flex;
      padding: 5px;
      width: 100%;
      text-align: center;
      white-space: nowrap;
      cursor: pointer;
      font-size: 14px;
      outline: none;
      border: none;
      border-radius: 2px;
      box-sizing: border-box;
      .text {
        margin: 0 auto;
        font-size: 14px;
      }
    }
  }

</style>
