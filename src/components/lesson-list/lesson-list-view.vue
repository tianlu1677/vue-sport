<template>
  <div class="lessons-wrapper">
    <div class="content-wrapper">
      <div class="content">
        <h2 class="text">课时</h2>
        <span class="lessons-count">{{lessonList.length}}</span>
        <div class="lessons-arrow" @click="showHideLessonList">
          <i class="icon-arrow-down" @click.stop="showHideLessonList"></i>
        </div>
      </div>

      <div class="lessons-content">
        <lesson-list :lessonList="lessonList"
                     :learningStatus="learningStatus"
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
      lessonList: {
        type: Array
      },
      courseId: {
        type: Number
      },
      learningStatus: {
        type: Object
      },
      lessons_count: {
        type: Number
      }
    },
    methods: {
      showHideLessonList() {
        this.lessonListDialog = this.$createLessonListDialog({course_id: this.courseId})
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
        padding: 0 17.5px;
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
        font-size: 14px;
      }
    }
    .lessons-content {
      padding: 16.5px 0 0 0;
    }
  }

</style>
