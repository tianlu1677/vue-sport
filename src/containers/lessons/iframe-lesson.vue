<template>
  <div class="iframe-lesson">
    <div class="iframe-wrapper">
      <iframe :src="lessonDetail.outside_link"
              title=""
              width="375"
              :height="height"
              allowfullscreen
              frameborder="0"
              scrolling="yes"
              marginheight="0"
              marginwidth="0"
      >
        <p>您的游览器当前不支持当前页面</p>
      </iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: "iframe-lesson",
    props: {
      lessonDetail: {
        type: Object,
        default: function () {
          return {}
        }
      },
    },
    data() {
      return {
        height: 800
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {},
  }
</script>

<style scoped lang="scss">
  .iframe-lesson {
    height: 100%;
    /*padding: 0 0 17.5px 0;*/
  }

</style>
