<template>
  <div class="lessons">
    <div class="lessons-wrapper">
      <ul class="lessons-content">
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
    </div>
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
    position: relative;
    height: 67.5px;

    overflow: hidden;
    .lessons-wrapper {
      .lessons-content, .cube-scroll-content {
        display: inline-block;
        position: relative;
        width: 4000px;

        .item {
          float: left;
          margin-right: 10px;
          .lesson {
            display: flex;
            float: left;
            border: solid 1px $gray;
            border-radius: 5px;
            padding: 10px;
            height: 47.5px;
            width: 130px;
            overflow: hidden;
            word-break: break-word;
            .cover {
              img {
                border-radius: 5px;
              }
            }
            .name {
              flex: 1;
              overflow: hidden;
              padding-left: 7.5px;
              font-size: 13px;
              font-weight: bolder;
              line-height: 17px;
            }
          }
        }
      }

    }

  }


</style>
