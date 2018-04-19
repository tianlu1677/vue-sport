<template>
  <div class="base-course-wrapper" @click="goCourseDetail">
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
      link: {
        type: Boolean,
        default: true
      },
      base_course: {
        type: Object,
        default: function () {
          return {
            id: 0,
            name: "",
            account_id: 0,
            account_nickname: "",
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
            path: `/courses/${this.base_course.id}`
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
