<template>
  <div class="lessons">
    <cube-scroll ref="lessonsScroll" :data="lessons" direction="horizontal" class="content-wrapper">
      <ul class="list-content">
        <li v-for="lesson in lessons" class="item">
          <base-lesson :baseLesson="lesson"></base-lesson>
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
      }
    },

    created() {
      this._getLessons()
      this._getCourseLearning()
    },

    mounted() {

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
