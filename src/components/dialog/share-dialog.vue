<template>
  <cube-popup type="share" ref="popup" :visible="visible" :center="false" class="share-wrapper">
    <div class="content">
      <div class="share-icon">
        <i class="icon-share-arrow"></i>
      </div>
      <div class="share">
        <div class="text">
          <p>点击右上角</p>
          <p>发送给微信好友</p>
          <p>或分享到朋友圈</p>
        </div>
        <div @click="hide" class="close">
          <cube-button class="button">我知道了</cube-button>
        </div>
      </div>
    </div>
  </cube-popup>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex';
  import {HIDE_SHARE} from '@/store/types';

  export default {
    name: 'cube-share-dialog',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {
      ...mapGetters({
        visible: 'showShare',
      }),
    },
    created() {

    },
    methods: {
      ...mapMutations({
        onHideShare: HIDE_SHARE,
      }),
      show() {
        this.$refs.popup.show();
      },
      hide() {
        this.$refs.popup.hide();
        this.onHideShare();
        this.$emit('hide');
      },
    },
  };
</script>

<style lang="scss">
  .share-wrapper {
    background-color: rgba(0, 0, 0, 0.5);
    .cube-popup-content {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      .content {
        display: flex;
        flex-direction: column;
        .share-icon {
          position: absolute;
          top: 30px;
          right: 25px;
          height: 100px;
          font-size: 130px;
          color: $white;
        }

        .share {
          text-align: center;
          margin-top: 50%;
          .text {
            font-size: 22px;
            line-height: 36px;
            font-weight: bolder;
            color: $white;
          }
          .close {
            position: relative;
            height: 150px;
            display: flex;
            justify-content: center;
            align-items: center;
            .button {
              height: 42px;
              width: 126px;
              border-radius: 6px;
              font-size: 16px;
              padding: 0 0;
            }
          }
        }
      }
    }

  }

</style>
