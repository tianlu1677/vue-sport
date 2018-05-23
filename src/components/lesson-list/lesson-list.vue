<template>
  <div class="lessons">
    <cube-scroll ref="scroll"
                 :data="lessons"
                 direction="horizontal"
                 class="content-wrapper"
    >
      <ul class="list-content">
        <li v-for="(lesson, index) in lessons" class="item" :class="`lesson-${lesson.id}`" ref="listGroup"
            :key="lesson.id">
          <base-lesson :baseLesson="lesson"
                       :active="lesson.id === last_learn_course_id || lessons.length === 1 ">
          </base-lesson>
        </li>
      </ul>
    </cube-scroll>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
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
        lessons: [],
        scrollOption: {
          listenScroll: true
        }
      }
    },
    computed: {
      ...mapGetters(['courseDetail']),
      last_learn_course_id() {
        let last_learn_course_id = 0
        let learning = this.courseDetail.learning
        if (learning && learning.id) {
          last_learn_course_id = learning.last_learn_course_id || learning.course_id
        }
        return last_learn_course_id
      },
    },

    async created() {
      await this._getLessons()
      // this._scrollToCurrentLesson()
    },

    async activated() {
      await this._getLessons()
      this._refreshScroll()
      this._scrollToCurrentLesson()
    },
    watch: {
      async course_id() {
        await this._getLessons()
        this._scrollToCurrentLesson()
      }
    },
    methods: {
      async _getLessons() {
        if (this.course_id) {
          const response = await getLessons(this.course_id)
          this.lessons = response.lessons
        }
      },
      _refreshScroll() {
        if (this.$refs.scroll) {
          this.$refs.scroll.refresh()
        }
      },
      _scrollToCurrentLesson() {
        setTimeout(() => {
          if (this.course_id && this.lessons.length > 2) {
            if (this.$refs.scroll) {
              let item = `.item.lesson-${this.last_learn_course_id}`
              console.log('item', item)
              this.$refs.scroll.scrollToElement(item, 800, true, true)
            }
          }
        }, 500)
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
