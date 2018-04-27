<template>
  <div class="lessons">
    <cube-scroll ref="lessonsScroll" :data="lessons" :options="scrollOption" class="content-wrapper">
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
        lessons: [],
        scrollOption: {
          direction: 'horizontal'
        }
      }
    },

    created() {
      this._getLessons()
    },

    mounted() {

    },
    watch: {
      async course_id() {
        const response = await getLessons(this.course_id)
        this.lessons = response.lessons
      }
    },
    methods: {
      async _getLessons() {
        if (this.course_id) {
          const response = await getLessons(this.course_id)
          this.lessons = response.lessons
        }
      },
    }

  }
</script>

<style lang="scss">
  .lessons {
    position: relative;
    overflow: hidden;
    z-index: 1;

    .cube-scroll-content {
      width: 3000px;
    }
    .list-content {
      position: relative;
      .item {
        display: inline-block;
        box-sizing: border-box;
        width: 150px;
        margin-right: 10px;
      }
    }
  }


</style>
