<template>
  <div class="lesson-list" @click="hide" v-show="showFlag">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <div class="left">
          <h1 class="text">课时列表</h1>
          <span class="count">43</span>
        </div>
        <div class="right" @click="hide">
          <span class="icon-cancel"></span>
        </div>
      </div>
      <cube-scroll ref="listContent" :data="lessons" class="list-content">
        <transition-group ref="list" name="list" tag="ul" class="item-list">
          <li class="item" :key="lesson.id" v-for="lesson in lessons">
            <base-lesson :baseLesson="lesson"></base-lesson>
          </li>
        </transition-group>
      </cube-scroll>
    </div>
  </div>

</template>

<script>
  import BaseLesson from 'components/base-lesson/base-lesson'
  import {getLessons} from "@/api/lesson_api"

  export default {
    name: "hide-lesson-list",
    components: {BaseLesson},
    props: {
      course_id: {
        type: Number
      }
    },
    data() {
      return {
        lessons: [],
        options: {
          direction: 'horizontal'
        },
        showFlag: false,
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

      show() {
        this.showFlag = true
        setTimeout(() => {
          this.$refs.listContent.refresh()
        }, 20)
      },

      hide() {
        this.showFlag = false
      }
    }
  }
</script>

<style lang="scss">
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
      bottom: 0;
      width: 100%;
      background-color: $white;
      .list-header {
        position: relative;
        padding: 0 17.5px 0 17.5px;
        margin-top: 29px;
        .left {
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
          position: absolute;
          top: 0;
          right: 17.5px;
          font-size: 10px;
        }
      }
      .list-content {
        margin: 29px 13.5px 0 13.5px;
        min-height: 150px;
        max-height: 300px;
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
