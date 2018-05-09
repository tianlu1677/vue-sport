<template>
  <div class="lesson-card" @click="goToCourseDetail">
    <div class="cover">
      <img :src="baseLesson.cover_url" width="109" height="76" alt="">
    </div>
    <div class="course-content">
      <h2 class="name">{{baseLesson.name}}</h2>
      <div class="bottom-wrapper">
        <div class="account">
          <img src="../../common/images/logo.jpg" class="logo"/>
          <span class="nickname">
            {{baseLesson.account.nickname}}
          </span>

        </div>
        <div class="count-wrapper">
          <div class="count">
            <div class="icon">
              <span class="icon-learn-count"></span>
            </div>
            <span>{{baseLesson.views_count}}</span>
          </div>
          <div class="count">
            <span class="icon-topic-count icon"></span>
            <span>{{baseLesson.topics_count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'lesson-card',
    props: {
      link: {
        type: Boolean,
        default: true
      },
      baseLesson: {
        type: Object,
        default: function () {
          return {
            id: 0,
            name: "",
            account_id: 0,
            account: {},
            type: "course",
            views_count: 0,
            topics_count: 0,
            cover_url: '',
            published_at: ""
          }
        }
      }
    },
    methods: {
      goToCourseDetail() {
        if (this.link) {
          this.$router.push({
            path: `/courses/${this.baseLesson.id}`
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .lesson-card {
    display: flex;
    .cover {
      flex: 0 0 109px;
      box-sizing: border-box;
      padding-right: 18px;
      img {
        border-radius: 10px;
      }
    }
    .course-content {
      flex: 1;
      position: relative;
      .name {
        @include multi-line-text(2);
        line-height: 18px;
        font-size: 14px;
        font-weight: bold;
      }
      .bottom-wrapper {
        position: absolute;
        bottom: 0;
        line-height: 16px;
        font-size: 12px;
        color: $gray;
        .account {
          .logo {
            height: 16px;
            width: 16px;
            vertical-align: top;
          }
          .nickname {
            font-size: 12px;
          }
        }
        .count-wrapper {
          margin-top: 4.5px;
          .count {
            display: inline-block;
            width: 76px;
            .icon {
              display: inline-block;
              vertical-align: bottom;
              font-size: 16px;
            }
          }
        }
      }
    }
  }
</style>
