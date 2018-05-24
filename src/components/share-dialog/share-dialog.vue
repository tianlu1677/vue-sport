<template>
  <x-dialog v-model="showShare" class="dialog-demo" hide-on-blur>
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
  import {mapMutations, mapGetters} from 'vuex'
  import {HIDE_SHARE} from "@/store/types";

  export default {
    name: "share-dialog",
    components: {},

    data() {
      return {

      }
    },
    watch: {
    },
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

</style>
