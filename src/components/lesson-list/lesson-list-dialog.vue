<template>
  <div class="lesson-list" @click="hide" v-show="showFlag">
    <div class="list-wrapper">
      <div class="list-header">
        <div class="left">
          <h1 class="text">课时列表</h1>
          <span class="count">{{lessons.length}}</span>
        </div>
        <div class="right" @click="hide">
          <i class="icon-cancel"></i>
        </div>
      </div>
      <cube-scroll ref="listContent" :data="lessons" class="list-content">
        <transition-group ref="list" name="list" tag="ul" class="item-list">
          <li class="item" v-for="lesson in lessons" :key="lesson.id">
            <base-lesson :baseLesson="lesson"
                         :active="lesson.id === learning.last_learn_course_id || lessons.length === 0"
            >
            </base-lesson>
          </li>
        </transition-group>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import BaseLesson from 'components/base-lesson/base-lesson'
  import {getLessons} from "@/api/lesson_api"
  import {getCourseLearning} from "@/api/learning_api"

  export default {
    name: "lesson-list-dialog",
    components: {BaseLesson},
    props: {
      course_id: {
        type: Number
      }
    },
    data() {
      return {
        lessons: [],
        learning: {},
        showFlag: false
      }
    },

    created() {
      this._getLessons()
      this._getCourseLearning()
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
      })
    },
    watch: {
      course_id() {
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

      show() {
        this.showFlag = true
        this.$emit('show')
      },

      hide() {
        this.showFlag = false
        this.$emit('hide')
      },
      async _getCourseLearning() {
        if (this.course_id) {
          const response = await getCourseLearning(this.course_id)
          this.learning = response.learning
        }
      },
      // scrollToCurrentLesson() {
      //   let index = 1
      //   this.lessons.forEach((lesson) => {
      //     if (lesson.id !== this.learning.id) {
      //       index += 1
      //     }
      //   })
      //   let scrollY = index * (50)
      //   this.$refs.listContent.scrollTo(0, scrollY, 1000)
      // }
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/mixin";
  .lesson-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
    .list-wrapper {
      position: absolute;
      min-height: 60%;
      bottom: 0;
      width: 100%;
      background-color: $white;
      .list-header {
        display: flex;
        position: relative;
        padding: 0 17.5px 0 17.5px;
        margin-top: 29px;
        .left {
          flex: 1;
          display: flex;
          position: relative;
          align-items: flex-end;
          .text {
            margin-right: 7.5px;
            font-size: 12.5px;
            font-weight: bold;
          }
          .count {
            font-size: 8px;
            color: $gray;
          }
        }
        .right {
          @include extend-click();
          font-size: 10px;
        }
      }
      .list-content {
        margin: 29px 13.5px 0 13.5px;
        min-height: 150px;
        overflow: hidden;
        .item-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-column-gap: 17px;
          margin-bottom: 27.5px;
        }
        .item {
          display: inline-block;
          margin-bottom: 17px;
        }
      }
    }
  }


</style>
