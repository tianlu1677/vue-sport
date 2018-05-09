<template>
  <div class="chose-course-wrapper">
    <div class="chose-course" @click="changeCourse" v-show="showChoseCourse">
      <i class="icon-chose-course"></i>
      <span class="text">选择课程</span>
    </div>
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
      }
    },
    components: {
      BaseCourse,
      LessonCard
    },
    computed: {
      showChoseCourse() {
        return !(this.courseOptions.course_id && this.courseOptions.type)
      },
      type() {
        return this.courseOptions.type
      }
    },
    created() {
      this.fetchBaseCourse(this.courseOptions.type, this.courseOptions.course_id)
    },
    methods: {
      changeCourse() {
        this.fetchBaseCourse('course', 1)
        this.courseOptions.course_id = 1
        this.courseOptions.type = 'course'
        this.fetchBaseCourse(this.courseOptions.type, this.courseOptions.course_id)

      },
      async fetchBaseCourse(type, course_id) {
        if (type === 'course') {
          const res = await getCourseBase(course_id)
          this.baseCourse = res.course
        } else if (type === 'lesson') {
          const res = await getLessonBase(course_id)
          this.baseLesson = res.lesson
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .chose-course-wrapper {
    .chose-course {
      /*display: flex;*/
      height: 100px;
      border: 1px solid $gray;
      border-radius: 10px;

      display: flex;
      width: 100%;
      line-height: 100px;
      align-content: center;
      align-items: center;
      justify-content: center;
      .icon-chose-course {
        font-size: 35px;
        line-height: 100px;
        padding-right: 11px;
      }
      .text {
        font-size: 15px;
      }
    }
  }
</style>
