<template>
  <div class="lessons">
    <cube-scroll ref="lessonsScroll" :data="lessons" direction="horizontal" class="content-wrapper">
      <ul class="list-content">
        <li v-for="lesson in lessons" class="item" ref="listGroup" :key="lesson.id">
          <base-lesson :baseLesson="lesson" :active="lesson.id === learning.course_id"></base-lesson>
        </li>
      </ul>
    </cube-scroll>
  </div>

</template>

<script>
  import BaseLesson from 'components/base-lesson/base-lesson'
  import {getLessons} from "@/api/lesson_api"
  import {getCourseLearning} from "@/api/learning_api"

  export default {
    name: "lesson-list",
    components: {
      BaseLesson
    },
    props: {
      course_id: {
        type: Number
      },
    },
    data() {
      return {
        learning: {},
        lessons: [],
        scrollOption: {
          listenScroll: true
        }
      }
    },

    async created() {
      await this._getLessons()
      await this._getCourseLearning()
    },

    mounted() {
      this.$nextTick(() => {
        this.scrollToCurrentLesson()
      })
    },
    watch: {
      async course_id() {
        this._getLessons()
        this._getCourseLearning()
      }
    },
    methods: {
      async _getLessons() {
        if (this.course_id) {
          const response = await getLessons(this.course_id)
          this.lessons = response.lessons
        }
      },
      async _getCourseLearning() {
        if (this.course_id) {
          const response = await getCourseLearning(this.course_id)
          this.learning = response.learning
        }
      },
      scrollToCurrentLesson() {
        let index = 1
        this.lessons.forEach((lesson) => {
          if (lesson.id !== this.learning.id) {
            index += 1
          }
        })
        let scrollX = index * (-130)
        console.log(scrollX)
        this.$refs.lessonsScroll.scrollTo(scrollX, 0, 1000)
      }
    }
  }
</script>

<style lang="scss">
  .lessons {
    position: relative;
    overflow: hidden;
    z-index: 1;
    .cube-scroll-content {
      display: inline-block;
    }
    .list-content {
      white-space: nowrap;
      display: inline-block;
      .item {
        display: inline-block;
        width: 150px;
        margin-right: 10px;
      }
    }
  }


</style>
