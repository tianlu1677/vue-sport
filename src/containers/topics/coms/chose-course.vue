<template>
  <div class="chose-course-wrapper">
    <div class="chose-course" v-show="!currentCourse.id">
      <i class="icon-chose-course"></i>
      <span class="text">选择课程</span>
    </div>
    <base-course :baseCourse="baseCourse" :link="false" v-if="type==='course'"></base-course>
    <lesson-card :baseLesson="baseLesson" :link="false" v-if="type==='clazz'"></lesson-card>
    <div class="bottom" v-show="currentCourse.id">
      <div style="margin-top: 17.5px"></div>
      <div class="border-bottom-1px"></div>
    </div>
  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import LessonCard from 'components/lesson-card/lesson-card'
  import {getCourseBase} from "@/api/course_api"
  import {getLessonBase} from "@/api/lesson_api"

  export default {
    name: "chose-course",
    props: {
      currentCourse: {
        type: Object,
        default: {
          id: 7,
          type: 'clazz'
        }
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
      LessonCard,
    },
    watch: {
      currentCourse() {
        this.fetchBaseCourse()
      }
    },
    created() {
      this.fetchBaseCourse()
    },
    computed: {
      type() {
        return this.currentCourse.type
      }
    },
    methods: {
      async fetchBaseCourse() {
        let type = this.currentCourse.type
        let course_id = this.currentCourse.id
        if (type === 'course') {
          const res = await getCourseBase(course_id)
          this.baseCourse = res.course
        } else if (type === 'clazz') {
          const res = await getLessonBase(course_id)
          this.baseLesson = res.lesson
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .chose-course-wrapper {
    margin: 17.5px 17.5px 0 17.5px;
    .chose-course {
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
    .bottom {
      .border-bottom-1px {
        flex: 1;
      }
    }
  }
</style>
