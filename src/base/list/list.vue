<template>
  <div class="list-wrapper">
    <div class="list">
      <slot></slot>
    </div>
    <slot name="empty" v-if="showEmpty">
      <div class="empty-wrapper">
        <empty></empty>
      </div>
    </slot>
  </div>
</template>


<script>
  import Empty from 'components/empty/empty'

  export default {
    name: "list",
    components: {
      Empty,
    },
    props: {
      showEmpty: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: $white;
    .list {
      height: 100%;
    }
    .empty-wrapper {
      position: absolute;
      top: 40%;
      z-index: 10;
      width: 100%;
      transform: translateY(-50%)
    }
  }
</style>
