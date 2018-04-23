<template>
  <div class="base-course-wrapper" @click="goCourseDetail">
    <div class="cover">
      <img :src="baseCourse.cover_url" width="109" height="76" alt="">
    </div>
    <div class="content">
      <h2 class="name">{{baseCourse.name}}</h2>
      <div class="bottom-wrapper">
        <div class="account">
          <div class="icon">
            <span class="icon-logo"><span class="path1"></span><span class="path2"></span><span
              class="path3"></span><span
              class="path4"></span><span class="path5"></span><span class="path6"></span><span
              class="path7"></span></span>
          </div>
          <span class="nickname">
            {{baseCourse.account.nickname}}
          </span>

        </div>
        <div class="count-wrapper">
          <div class="count">
            <div class="icon">
              <span class="icon-learn-count"></span>
            </div>
            <span>{{baseCourse.views_count}}</span>
          </div>
          <div class="count">
            <span class="icon-topic-count icon"></span>
            <span>{{baseCourse.topics_count}}</span>
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
      link: {
        type: Boolean,
        default: true
      },
      baseCourse: {
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
      goCourseDetail() {
        console.log('click')
        if (this.link) {
          this.$router.push({
            path: `/courses/${this.baseCourse.id}`
          })
        } else {

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
      .name {
        line-height: 1.5;
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
          .icon {
            display: inline-block;
            font-size: 16px;
            vertical-align: bottom;
          }
          .nickname {
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
