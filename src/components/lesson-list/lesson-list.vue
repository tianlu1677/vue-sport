<template>
  <div class="lessons">
    <!--<cube-scroll ref="scroll" :data="lessons" :options="options">-->
    <ul class="lessons-wrapper">
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
    <!--</cube-scroll>-->
  </div>


</template>

<script>
  import {getLessons} from "@/api/lesson_api"

  export default {
    name: "lesson-list",
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
    methods: {
      async _getLessons(course_id) {
        const response = await getLessons(course_id)
        this.lessons = response.lessons
      }
    }

  }
</script>

<style scoped lang="scss">
  .lessons {
    .lessons-wrapper {
      display: flex;
      flex-direction: row;
      overflow: scroll;
      .item {
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


</style>
