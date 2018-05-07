<template>
  <div class="new-topic">
    <div class="course-wrapper">
      <div class="chose-course" @changeCourse="changeCourse">
        <i class="icon-topic-add"></i>
        <span class="text">选择课程</span>
      </div>
      <!-- 课时或者课时 -->

      <div>

      </div>
    </div>
    <div class="form-wrapper">
      <div class="content-wrapper">

      </div>

      <div class="tag-wrapper">

      </div>

      <div class="save-button">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "new",
    methods: {
      changeCourse() {
        console.log('changeCourse')
      }
    }

  }
</script>

<style scoped lang="scss">
  .new-topic {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    .course-wrapper {
      margin: 17.5px;
      display: flex;
      height: 100px;
      border: 1px solid $gray;
      border-radius: 10px;

      .chose-course {
        display: flex;
        width: 100%;
        line-height: 100px;
        align-content: center;
        align-items: center;
        justify-content: center;
        .icon-topic-add {
          line-height: 100px;
          padding-right: 11px;
        }
        .text {
          text-align: center;
          font-size: 15px;
        }
      }

    }

  }
</style>
