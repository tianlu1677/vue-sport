<template>
  <div class="chose-course-wrapper">
    <base-course :baseCourse="baseCourse" :link="false" v-if="type==='course'"></base-course>
    <lesson-card :baseLesson="baseLesson" :link="false" v-if="type==='lesson'"></lesson-card>
  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import LessonCard from 'components/base-lesson/lesson-card'
  import {getCourseBase} from "@/api/course_api"
  import {getLessonBase} from "@/api/lesson_api"

  export default {
    name: "chose-course",
    props: {
      courseOptions: {
        type: Object
      }
    },
    data() {
      return {
        baseCourse: {account: {}},
        baseLesson: {account: {}},
        type: this.courseOptions.type
      }
    },
    components: {
      BaseCourse,
      LessonCard
    },
    created() {

      this.fetchBaseCourse(this.courseOptions.type, this.courseOptions.course_id)
    },
    methods: {
      async fetchBaseCourse(type, course_id) {
        if (type === 'course') {
          const res = await getCourseBase(course_id)
          this.baseCourse = res.course
        } else {
          const res = await getLessonBase(course_id)
          this.baseLesson = res.lesson
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .chose-course-wrapper {
  }
</style>
