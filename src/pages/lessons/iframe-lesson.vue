<template>
  <div class="iframe-lesson">
    <div class="iframe-wrapper">
      <!--<iframe :src="lessonDetail.outside_link"-->
      <!--id="iframe"-->
      <!--ref="lessonIframe"-->
      <!--title=""-->
      <!--width="100%"-->
      <!--:height="height"-->
      <!--allowfullscreen-->
      <!--frameborder="0"-->
      <!--scrolling="yes"-->
      <!--marginheight="0"-->
      <!--marginwidth="0"-->
      <!--&gt;-->
      <!--<p>您的游览器当前不支持当前页面</p>-->
      <!--</iframe>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'iframe-lesson',
    props: {
      lessonDetail: {
        type: Object,
        default() {
          return {};
        },
      },
    },
    data() {
      return {
        height: 800,
      };
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        // console.log (this.$refs.lessonIframe.innerHTML)
      });
    },
    computed: {},
  };
</script>

<style scoped lang="scss">
  .iframe-lesson {
    height: 100%;
    .iframe-wrapper {
      -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
      overflow-y: scroll;
    }
  }

</style>
