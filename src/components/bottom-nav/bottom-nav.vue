<template>
  <div class="bottom-wrapper">
    <div class="border-top-1px"></div>
    <ul class="item-list">
      <router-link to="/home" tag="div">
        <li class="item">
          <span class="icon-home icon"></span>
          <span class="text">推荐</span>
        </li>
      </router-link>
      <router-link to="/topics/new" tag="div">
        <li class="item">
          <span class="icon-new-topic icon"></span>
          <span class="text">发布</span>
        </li>
      </router-link>
      <router-link to="/mine" tag="div">
        <li class="item">
          <span class="icon-user icon"></span>
          <span class="text">我</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "bottom-nav"
  }
</script>

<style scoped lang="scss">
  .bottom-wrapper {
    position: fixed;
    height: 50px;
    left: 0;
    right: 0;
    background-color: $white;
    bottom: 0;
    .item-list {
      padding: 0 35px 0 35px;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-column-gap: 26.5px;
      justify-items: center;
      .item {
        display: flex;
        flex-direction: column;
        .icon {
          margin-top: 7.5px;
          font-size: 22.5px;
          margin-bottom: 5px;
        }
        .text {
          margin: auto;
          font-size: 10px;
        }

      }
    }
  }
</style>
