<template>
  <cube-popup type="extend-popup" ref="popup" :center="true" @mask-click="hide" @touchmove.prevent="showDetail"
              @scroll.prevent="showDetail">
    <div class="cube-extend-popup-content" @click="hide" style="color: white">
      <slot>{{content}}</slot>
    </div>
  </cube-popup>
</template>

<script>

  const NAME = "i-popup"
  export default {
    name: NAME,
    props: {
      content: {
        type: String
      }
    },
    methods: {
      show() {
        this.$refs.popup.show()
      },
      hide() {
        this.$refs.popup.hide()
        this.$emit('hide')
      },
      showDetail() {
        console.log('xxxx')
      }
    }
  }
</script>

<style lang="scss">
  .cube-pop {
    .cube-popup-mask {

    }
  }


</style>
