<template>
  <div class="base-course-wrapper" @click="goToCourseDetail">
    <div class="cover">
      <img :src="baseCourse.cover_url">
    </div>
    <div class="course-content">
      <h2 class="name">{{baseCourse.name}}</h2>
      <div class="bottom-wrapper">
        <div class="account">
          <!--<img src="../../common/images/logo.jpg" class="logo"/>-->
          <span class="icon-avatar"><span class="path1"></span><span class="path2"></span><span
            class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span
            class="path7"></span></span>
          <span class="nickname">
            {{baseCourse.account.nickname}}
          </span>
        </div>
        <div class="count-wrapper">
          <div class="count">
            <i class="icon-learn-count icon"></i>
            <span>{{baseCourse.views_count}}</span>
          </div>
          <div class="count">
            <i class="icon-topic-count icon"></i>
            <span>{{baseCourse.topics_count}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  const EVENT_SELECT = 'select';
  export default {
    name: 'base-course',
    props: {
      link: {
        type: Boolean,
        default: true,
      },
      baseCourse: {
        type: Object,
        default() {
          return {
            id: 0,
            name: '',
            account_id: 0,
            account: {},
            type: 'course',
            views_count: 0,
            topics_count: 0,
            cover_url: '',
            published_at: '',
          };
        },
      },
    },
    methods: {
      goToCourseDetail() {
        if (this.link) {
          this.$router.push({
            path: `/courses/${this.baseCourse.id}`,
          });
      }
        this.$emit(EVENT_SELECT, this.baseCourse);
      },
    },
  };
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .base-course-wrapper {
    display: flex;
    .cover {
      flex: 0 0 109px;
      box-sizing: border-box;
      padding-right: 18px;
      > img {
        height: 76px;
        width: 109px;
        border-radius: 8px;
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
          display: flex;
          .icon-avatar {
            font-size: 16px;
            margin-right: 5px;
          }
          /*.logo {*/
          /*height: 16px;*/
          /*width: 16px;*/
          /*vertical-align: top;*/
          /*}*/
          .nickname {
            font-size: 12px;
          }
        }
        .count-wrapper {
          margin-top: 4.5px;
          display: flex;
          .count {
            flex: 1;
            display: flex;
            width: 76px;
            height: 16px;
            line-height: 16px;
            .icon-learn-count::before {
              color: #9e9e9e;
            }
            .icon {
              font-size: 16px;
              margin-right: 5px;
            }
            span {
              font-size: 12px;
            }
          }
        }
      }
    }
  }
</style>
