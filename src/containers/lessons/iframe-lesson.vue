<template>
  <div class="iframe-lesson">
    <iframe :src="url"
            title=""
            width="100%"
            height="750"
            allowfullscreen
            scrolling="yes"
            marginheight="10"
            marginwidth="0"
    >
      <p>您的游览器当前不支持当前页面</p>
    </iframe>
  </div>
</template>

<script>
  export default {
    name: "iframe-lesson",
    props: {
      url: {
        type: String,
        default: ''
      }
    },
  }
</script>

<style scoped>

</style>
