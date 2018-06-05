<template>
  <div>

    <x-dialog v-model="showShare"
              :dialog-style="{'background-color': 'rgba(0, 0, 0, 0)', 'height': '100%','max-width': '100%', 'width': '100%'}">
      <div class="share-icon">
        <i class="icon-share-arrow"></i>
      </div>
      <div class="share">

        <div class="text">
          <p>点击右上角</p>
          <p>发送给微信好友</p>
          <p>或分享到朋友圈</p>
        </div>
        <div @click="closeShare" class="close">
          <cube-button class="button">我知道了</cube-button>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  import {HIDE_SHARE} from "@/store/types";

  export default {
    name: "share-dialog",
    components: {},

    data() {
      return {}
    },
    watch: {},
    computed: {
      ...mapGetters({
        showShare: 'showShare'
      })
    },

    methods: {
      closeShare() {
        this.onHideShare()
      },
      ...mapMutations({
        onHideShare: HIDE_SHARE
      })
    }
  }
</script>

<style scoped lang="scss">
  .share-icon {
    position: absolute;
    top: 30px;
    right: 25px;
    height: 100px;
    font-size: 130px;
    color: $white;
  }
  .share {
    margin-top: 55%;
    .text {
      font-size: 22px;
      line-height: 36px;
      font-weight: bolder;
      color: $white;
    }
    .close {
      margin: auto;
      margin-top: 47.5px;
      width: 60%;
      .button {
        font-size: 16px;
      }
    }
  }
</style>
