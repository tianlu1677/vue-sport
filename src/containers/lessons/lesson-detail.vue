<template>
  <div class="lesson-detail">
    <div class="main">
      详情页
    </div>
    <div class="bottom-button">
      <div class="left">
        <span class="icon-list"></span>
        <span class="icon-arrow-right"></span>
      </div>

      <div class="right">
        <action-list></action-list>
        <!--<span class="icon-new-topic"></span>-->
        <!--<span class=""></span>-->
        <!--<span class="icon-new-topic"></span>-->
      </div>
    </div>
  </div>
</template>

<script>
  import ActionList from 'components/actions/action-list'

  export default {
    name: "lesson-detail",
    components: {
      ActionList
    }
  }
</script>

<style scoped lang="scss">
  .lesson-detail {
    position: fixed;
    left: 0;
    right: 0;
    .main {
      padding: 17.5px;
    }
    .bottom-button {
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      display: flex;
      border-top: solid 1px $gray;
      padding: 17px 17.5px;
      .left {
        .icon-list {
          margin-right: 40px;
        }
      }
      .left {
        flex: 1;
      }
    }
  }
</style>
