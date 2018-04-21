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
      <cube-scroll ref="listContent" class="list-content">
        <transition-group ref="list" name="list" tag="ul">
          <li class="item" :key="lesson.id" v-for="lesson in lessons">
            <div class="lesson">
              <div class="cover">
                <img :src="lesson.cover_url" alt="" height="47.5" width="68.5">
              </div>
              <div class="name">
                <span>{{lesson.name}}</span>
              </div>
            </div>
          </li>
        </transition-group>
      </cube-scroll>

    </div>
  </div>

</template>

<script>
  import {getLessons} from "@/api/lesson_api"

  export default {
    name: "hide-lesson-list",
    components: {},
    props: {
      course_id: {
        type: Number,
        default: 2
      },
    },
    data() {
      return {
        lessons: [],
        showFlag: false,
        options: {
          direction: 'horizontal'
        }
      }
    },

    created() {
      this._getLessons(this.course_id)
    },
    mounted() {
      // setTimeout(() => {
      //   // this.scroll = new BScroll(this.$refs.scroll, options)
      // }, 20)
    },
    activated() {
      // setTimeout(() => {
      //   this.$refs.lessonScroll && this.$refs.lessonScroll.refresh()
      //   this.scollLesson()
      // }, 20)
    },
    methods: {
      async _getLessons(course_id) {
        const response = await getLessons(course_id)
        this.lessons = response.lessons
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
      padding: 0 17.5px 0 17.5px;
      bottom: 0;
      background-color: $white;
      .list-header {
        position: relative;
        margin-top: 29px;
        display: flex;

        .left {
          .text {
            float: left;
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
          right: 0;
          font-size: 10px;
        }
      }
      .list-content {
        max-height: 240px;
        margin: 29px 13.5px 0 13.5px;
        overflow: hidden;
        display: grid;
        flex-wrap: nowrap;
        align-content: space-between;
        .item {
          width: 40%;
          float: left;
          height: 47.5px;
          border: solid 1px $gray;
          border-radius: 10px;
          padding: 10px;
          margin-bottom: 17px;
          margin-left: 7px;
          overflow: hidden;
          word-break: break-word;
          .lesson {
            display: flex;
            .cover {
              > img {
                border-radius: 10px;
              }
            }
            .name {
              flex: 1;
              overflow: hidden;
              font-size: 13px;
              height: 47.5px;
              padding-left: 7.5px;
              font-weight: bolder;
              line-height: 17px;
            }
          }
        }
      }
    }

  }


</style>
