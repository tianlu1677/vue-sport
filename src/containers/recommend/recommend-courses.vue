<template>
  <div class="recommend-courses">
    <div class="hot">
      <h1>热门推荐</h1>
      <div class="course-list">
        <ul v-for="(course, index) in hot_courses">
          <li class="item">
            <base-course :base_course="course"></base-course>
          </li>
        </ul>
      </div>
    </div>

    <div class="daily">
      <h1>每日最新</h1>
      <div class="course-list">
        <cube-scroll
          ref="dailyCoursesScroll"
          :options="options"
          @pulling-down="onPullingDown"
          @pulling-up="onPullingUp"
        >
          <ul v-for="(course, index) in daily_courses">
            <li class="item">
              <base-course :base_course="course"></base-course>
            </li>
          </ul>
        </cube-scroll>
      </div>
    </div>
    <div v-show="!daily_courses.length">
      <loading></loading>
    </div>

  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import Loading from 'base/loading/loading'
  import {getCategoryHotCourses, getCategoryDailyCourses} from "@/api/category_api";

  export default {
    name: "recommend-courses",
    components: {
      BaseCourse,
      Loading
    },
    data() {
      return {
        hot_courses: [],
        daily_courses: [],
        pagination: {
          currentPage: 1,
          perPage: 10,
          total: 0,
          link: ''
        },

        options: {
          scrollbar: true,
          pullDownRefresh: {
            threshold: 50,
            stop: 40,
            txt: '获取成功'
          },
          pullUpLoad: {
            threshold: 20,
            txt: {
              more: '加载更多',
              noMore: '已经到底部了'
            }
          }
        }
      }
    },

    computed: {},

    beforeRouteUpdate(to, from, next) {
      console.log('to', to)
    },

    created() {
      const category_id = this.$route.params.id
      this._getCategoryHotCourses({id: category_id})
      this._getCategoryDailyCourses({id: category_id})
      console.log('route', this.$route)
    },

    methods: {
      onPullingDown() {
        // 更新shuju
        this._getCategoryDailyCourses()
        this.$refs.dailyCoursesScroll.forceUpdate()
      },

      onPullingUp() {
        console.log('onpullingup')
        this.$refs.dailyCoursesScroll.forceUpdate()

      },

      async _getCategoryHotCourses(data = {id: 0}) {
        const response = await getCategoryHotCourses(data)
        this.hot_courses = response.courses.slice(0, 3)
      },

      async _getCategoryDailyCourses(data = {id: 0}) {
        const response = await getCategoryDailyCourses(data)
        console.log('dailycourse', response)
        console.log('headers', response.headers)
        this.pagination = {...response.headers}
        this.daily_courses = response.data.courses
      }
    }
  }
</script>

<style lang="scss">
  .recommend-courses {
    padding: 17px 33px 17px 17px;

    .hot, .daily {
      h1 {
        font-size: 22px;
        font-weight: 700;
        line-height: 1;
      }
      .course-list {
        margin-top: 16.5px;
        .item {
          margin-bottom: 15px;
        }
      }
    }
    .cube-scroll-wrapper {
      height: 350px;
      overflow: hidden;
    }

  }

</style>
