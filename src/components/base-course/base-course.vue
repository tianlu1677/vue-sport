<template>
  <div class="base-course-wrapper">
    <div class="cover">
      <img :src="base_course.cover_url" width="109" height="76" alt="">
    </div>
    <div class="content">
      <h2>{{base_course.name}}</h2>
      <div class="bottom-wrapper">
        <div class="account-name">
          <span class="icon-logo"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span
            class="path4"></span><span class="path5"></span><span class="path6"></span><span
            class="path7"></span></span>
          {{base_course.account_nickname}}
        </div>
        <div class="count-wrapper">
          <div class="count">
            <span class="icon-learn-count"></span>
            <span>{{base_course.views_count}}</span>
          </div>
          <div class="count">
            <span class="icon-topic-count"></span>
            <span>{{base_course.topics_count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'base-course',
    props: {
      base_course: {
        type: Object,
        default: function () {
          return {
            id: 3,
            name: "课程3课程3课程3课程3课程3课程3课程3课程3课程3",
            account_id: 1,
            account_nickname: "dadadas",
            type: "course",
            views_count: 100,
            topics_count: 0,
            cover_url: 'https://wx.qlogo.cn/mmopen/vi_32/lZ10DcID7QFm6vqP3icnXH8PP6PCcYKGxpquY49aHGibcSxO1B5SCKMtaJk3AEjTgaqMG2rEAWcCM0lbYMXrLrhg/0',
            published_at: "2018-04-08T21:25:21.418+08:00"
          }
        }
      }

    }

  }
</script>

<style scoped lang="scss">
  .base-course-wrapper {
    display: flex;
    .cover {
      flex: 0 0 109px;
      box-sizing: border-box;
      padding-right: 18px;
      img {
        border-radius: 10px;
      }
    }
    .content {
      flex: 1;
      position: relative;
      h2 {
        font-size: 14px;
        font-weight: 700;
        line-height: 1.225;
      }
      .bottom-wrapper {
        position: absolute;
        bottom: 0;

        line-height: 16px;
        font-size: 12px;
        color: $gray;
        .count-wrapper {
          .count {
            display: inline-block;
            width: 76px;
            vertical-align: text-top;
          }
        }
      }
    }
  }
</style>
