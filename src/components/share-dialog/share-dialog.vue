<template>
  <x-dialog v-model="showHideOnBlur" class="dialog-demo" hide-on-blur>
    <div class="img-box">
      点击右上角分享
      <img src="https://ws1.sinaimg.cn/large/663d3650gy1fq6824ur1dj20ia0pydlm.jpg" style="max-width:100%">
    </div>
    <div @click="closeShare">
      <span class="icon-cancel"></span>
    </div>
  </x-dialog>
</template>

<script>
  export default {
    name: "share-dialog",
    components: {},
    props: {
      showShare: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        showHideOnBlur: false
      }
    },
    watch: {
      showHideOnBlur() {
        this.$emit('update:showShare', this.showHideOnBlur)
      },
      showShare() {
        this.showHideOnBlur = this.showShare
      }
    },

    methods: {
      closeShare() {
        this.showHideOnBlur = false
      }
    }

  }
</script>

<style scoped lang="scss">

</style>
