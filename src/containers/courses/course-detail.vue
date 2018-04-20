<template>
  <div class="course-detail">
    <!--顶部header-->
    <div class="header-wrapper">
      <course-header :course="course"></course-header>
    </div>
    <!--写心得喜欢等-->
    <!--用户信息-->
    <!--课时列表-->
    <!--心得列表-->

  </div>
</template>

<script>
  import CourseHeader from 'components/course-header/course-header'
  import {getCourse, createAction, destroyAction} from "@/api/course_api"

  export default {
    name: "course-detail",
    data() {
      return {
        course_id: this.$route.params.id,
        course: {},
      }
    },

    components: {
      CourseHeader
    },

    created() {
      this._getCourseDetail()
    },

    methods: {
      async _getCourseDetail() {
        const response = await getCourse(this.course_id)
        this.course = response.course
      }
    }
  }
</script>

<style scoped lang="scss">
  .course-detail {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;

    .header-wrapper {
      width: 100%;

    }

  }
</style>
