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
      },
      url: {
        type: String
      }
    },
    data() {
      return {}
    },
    methods: {
      handleShare() {
        if (this.url) {
          this.$router.push({path: this.url})
        }
        this.onShowShare()
        // this.showDialog()
      },
      ...mapMutations({
        onShowShare: SHOW_SHARE,
      }),
      showDialog() {
        this.$createDialog({
          type: 'alert',
          title: '点击右上角分享',
          confirmBtn: {
            text: '我知道了',
            active: true
          }
        }, (createElement) => {
          return [
            createElement('img', {
              'class': {
                'my-content': true
              },
              'attrs': {
                'src': 'https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg'
              },
              style: {
                'width': '100%'
              },
              slot: 'content'
            }, '价格仍按快车计算')
          ]
        }).show()
      }
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
