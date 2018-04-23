<template>
  <div class="lessons">
    <cube-scroll
      ref="scroll"
      :data="lessons"
      :options="options" class="list-wrapper">
      <ul class="list-content">
        <li v-for="lesson in lessons" class="item">
          <div class="lesson">
            <div class="cover">
              <img :src="lesson.cover_url" alt="" height="47.5" width="68.5">
            </div>
            <div class="name">
              <span>{{lesson.name}}</span>
            </div>
          </div>
        </li>
      </ul>
    </cube-scroll>
  </div>

</template>

<script>
  import {getLessons} from "@/api/lesson_api"

  export default {
    name: "lesson-list",
    components: {
    },
    props: {
      course_id: {
        type: Number,
        default: 2
      },
      // lessons: {
      //   type: Array,
      //   default: function () {
      //     return []
      //   }
      // }
    },
    data() {
      return {
        lessons: [],
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
      setTimeout(() => {
        this.$refs.lessonScroll && this.$refs.lessonScroll.refresh()
        this.scollLesson()
      }, 20)
    },
    methods: {
      async _getLessons(course_id) {
        const response = await getLessons(course_id)
        this.lessons = response.lessons
      },
      scrollLesson() {
        let scroll = new BScroll('.lessons-wrapper', {
          scrollX: false,
          scrollY: true
        })
        console.log()
      }

    }

  }
</script>

<style lang="scss">
  .lessons {

    .list-wrapper {
      width: 600px;
      .list-content {
        display: inline-block;
        position: relative;
        width: 4000px;

        .item {
          display: inline-block;
          box-sizing: border-box;
          width: 150px;
          margin-right: 10px;

          .lesson {
            display: flex;
            padding: 10px;
            border: solid 1px $gray;
            border-radius: 5px;
            word-break: break-word;
            .cover {
              img {
                border-radius: 5px;
              }
            }
            .name {
              flex: 1;
              height: 47.5px;
              padding-left: 7.5px;
              font-size: 13px;
              font-weight: bolder;
              line-height: 17px;
              overflow: hidden;
            }
          }
        }
      }
    }
  }


</style>
