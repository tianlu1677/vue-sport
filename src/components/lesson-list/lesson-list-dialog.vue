<template>
  <div class="lesson-list" @click="hide" v-show="showFlag">
    <div class="list-wrapper">
      <div class="list-header">
        <div class="left">
          <h1 class="text">课时列表</h1>
          <span class="count">{{lessonList.length}}</span>
        </div>
        <div class="right" @click="hide">
          <i class="icon-cancel"></i>
        </div>
      </div>
      <cube-scroll ref="listContent" :data="lessonList" class="list-content">
        <ul class="item-list" v-for="lessons in group(lessonList, 2)">
          <li class="item" v-for="(lesson, index) in lessons" :key="lesson.id">
            <base-lesson :baseLesson="lesson"
                         :active="lesson.id === last_learn_course_id || lessonList.length === 1 || (last_learn_course_id === 0 && index === 0)"
            >
            </base-lesson>
          </li>
        </ul>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import BaseLesson from 'components/base-lesson/base-lesson';
  import {mapGetters} from 'vuex';
  import {getCourseLearning} from '@/api/learning_api';

  export default {
    name: 'lesson-list-dialog',
    components: {BaseLesson},
    props: {
      course_id: {
        type: Number,
      },
    },
    data() {
      return {
        lessons: [],
        learning: {},
        showFlag: false,
      };
    },

    created() {
      this._getCourseLearning();
    },
    mounted() {
      this.$nextTick(() => {
        this.$refs.listContent.refresh();
      });
    },
    watch: {
      course_id() {
        this._getCourseLearning();
      },
    },
    computed: {
      ...mapGetters({
        lessonList: 'lessonList',
      }),
      last_learn_course_id() {
        let last_learn_course_id = 0;
        if (this.learning && this.learning.id) {
          last_learn_course_id = this.learning.last_learn_course_id || this.learning.course_id;
        }
        return last_learn_course_id;
      },
    },
    methods: {
      show() {
        this.showFlag = true;
        this.$emit('show');
      },

      hide() {
        this.showFlag = false;
        this.$emit('hide');
      },
      async _getCourseLearning() {
        if (this.course_id) {
          const response = await getCourseLearning(this.course_id);
          this.learning = response.learning;
        }
      },
      group(array, subGroupLength) {
        let index = 0;
        let newArray = [];

        while (index < array.length) {
          newArray.push(array.slice(index, index += subGroupLength));
        }
        return newArray;
      }
    },
  };
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
        max-height: 500px;
        overflow: hidden;
        .item-list {
          display: flex;
          justify-content: space-around;
          flex-flow: row wrap;
          align-item: center;

        }
        .item {
          flex: 1;
          margin-bottom: 17px;
        }
        .item:first-child {
          margin-right: 17px;
        }
      }
    }
  }


</style>
