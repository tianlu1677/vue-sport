<template>
  <div class="lessons">
    <cube-scroll ref="scroll"
                 :data="lessonList"
                 :options="scrollOptions"
                 direction="horizontal"
                 :refreshDelay=10
                 class="content-wrapper"
    >
      <ul class="list-content">
        <li class="item" style="width: 17.5px;margin-right: 0;"></li>
        <li v-for="(lesson, index) in lessonList" class="item" :class="`lesson-${lesson.id}`" ref="listGroup"
            :key="lesson.id">
          <base-lesson :baseLesson="lesson"
                       :active="lesson.id === last_learn_course_id || lessonList.length === 1 || index === last_learn_course_id ">
          </base-lesson>
        </li>
      </ul>
    </cube-scroll>
  </div>

</template>

<script>
  // import { mapGetters } from 'vuex';
  import BaseLesson from 'components/base-lesson/base-lesson';
  // import { getLessons } from '@/api/lesson_api';
  // import { getCourseLearning } from '@/api/learning_api';

  export default {
    name: 'lesson-list',
    components: {
      BaseLesson,
    },
    props: {
      lessonList: {
        type: Array,
      },
      learningStatus: {
        type: Object,
      },
    },
    data() {
      return {
        scrollOptions: {
          bounce: {
            top: false,
            left: false,
            right: false,
            bottom: false,
          },
          bounceTime: 50,
        },
      };
    },
    computed: {

      last_learn_course_id() {
        let last_learn_course_id = 0;
        const learning = this.learningStatus;
        if (learning && learning.id) {
          last_learn_course_id = learning.last_learn_course_id || learning.lesson_id;
        }
        return last_learn_course_id;
      },
    },

    async created() {
      this._scrollToCurrentLesson();
    },

    async activated() {
      // await this._getLessons()
      // this._refreshScroll()
      // this._scrollToCurrentLesson()
    },
    watch: {
      async learningStatus() {
        this.$refs.scroll.refresh();
        this._scrollToCurrentLesson();
      },
    },
    methods: {
      _scrollToCurrentLesson() {
        setTimeout(() => {
          if (this.lessonList.length > 2 && this.$refs.scroll) {
            if (this.$refs && this.$refs.scroll) {
              const item = `.item.lesson-${this.last_learn_course_id}`;
              // console.log('item', item)
              this.$refs.scroll.scrollToElement(item, 600, true, true);
          }
          }
        }, 500);
      },
    },
  };
</script>

<style lang="scss">
  .lessons {
    position: relative;
    overflow: hidden;
    .cube-scroll-content {
      display: inline-block;
    }
    .list-content {
      white-space: nowrap;
      display: inline-block;
      padding-bottom: 1px;
      .item {
        display: inline-block;
        width: 150px;
        margin-right: 10px;
      }
    }
  }


</style>
