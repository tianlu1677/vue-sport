<template>
  <div class="iframe-lesson">
    <div class="header">
      <h1 class="name">{{lessonDetail.name}}</h1>
      <!--<div class="course">-->
      <!--<div class="text">所在课程 [-->
      <!--<span class="name">{{lessonDetail.parent_course_name}}</span>-->
      <!--]-->
      <!--</div>-->
      <!--</div>-->
    </div>

    <div class="iframe-wrapper">
      <iframe :src="lessonDetail.outside_link"
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
  }
</script>

<style scoped lang="scss">
  .iframe-lesson {
    height: 100%;
    padding: 17.5px 17.5px 17.5px 17.5px;
    .header {
      padding-right: 83.5px;
      /*margin-bottom: 15px;*/
      .name {
        font-size: 18px;
        font-weight: bolder;
      }
      .course {
        display: flex;
        margin-top: 18.5px;
        .text {
          font-size: 12px;
          color: $gray;
        }
        .name {
          font-size: 12px;
          color: $blue;
        }
      }
    }
  }

</style>
