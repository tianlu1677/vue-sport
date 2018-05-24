<template>
  <div>
    <action icon="icon-share"
            :count="count"
            @handleClick="handleShare"
            class="icon-wrapper"
    >
    </action>
  </div>

</template>

<script>
  import {mapMutations} from 'vuex'
  import {SHOW_SHARE} from "@/store/types";
  import Action from 'components/actions/action'

  export default {
    name: "share-action",
    components: {
      Action
    },
    props: {
      count: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    methods: {
      handleShare() {
        this.onShowShare()
      },
      ...mapMutations({
        onShowShare: SHOW_SHARE,
      })
    }
  }
</script>

<style lang="scss">
  .icon-block {
    position: relative;
    font-size: 0;
    height: 21px;
    .content {
      display: flex;
      font-size: 21px;
      .text {
        margin: auto 5px;
        font-size: 14px;
        line-height: 21px;
      }
    }
  }
</style>
