<template>
  <div class="lessons-wrapper">
    <div class="content-wrapper">
      <div class="content">
        <h2 class="text">课时</h2>
        <span class="lessons-count">{{lessons_count}}</span>
      </div>
      <div class="lessons-arrow" @click.stop="showHideLessonList">
        <span class="icon-arrow-down"></span>
      </div>
      <div class="lessons-content">
        <lesson-list :course_id="course_id"
        >

        </lesson-list>
      </div>
    </div>
  </div>
</template>

<script>
  import LessonList from 'components/lesson-list/lesson-list'

  export default {
    name: "lesson-list-view",
    components: {
      LessonList
    },

    props: {
      course_id: {
        type: Number
      },
      lessons_count: {
        type: Number
      }
    },
    methods: {
      showHideLessonList() {
        this.lessonListDialog = this.$createLessonListDialog({course_id: this.course_id})
        this.lessonListDialog.show()
      },
    }

  }
</script>

<style scoped lang="scss">
  @import "../../common/styles/mixin";

  .lessons-wrapper {
    position: relative;
    margin-top: 27.5px;
    .content-wrapper {
      .content {
        display: flex;
        align-items: flex-end;
        .text {
          font-size: 22px;
          font-weight: bolder;
          vertical-align: baseline;
        }
        .lessons-count {
          flex: 1;
          padding-left: 7.5px;
          color: $gray;
          font-size: 12px;
        }
      }
      .lessons-arrow {
        @include extend-click();
        position: absolute;
        right: 0;
        top: 0;
        font-size: 14px;
      }

    }
    .lessons-content {
      padding-top: 16.5px;
    }
  }

</style>
