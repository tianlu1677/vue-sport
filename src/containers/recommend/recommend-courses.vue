<template>
  <div class="recommend-courses" ref="recommend">
    <cube-scroll ref="scroll" class="recommend-content"
                 :options="options"
                 @pulling-down="onPullingDown"
                 @pulling-up="onPullingUp"
    >
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
          <ul v-for="(course, index) in daily_courses">
            <li class="item">
              <base-course :base_course="course"></base-course>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
    <!--<div v-show="!hot_courses.length">-->
    <!--<loading></loading>-->
    <!--</div>-->

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
        category_id: this.$route.params.id,
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 0,
          link: null
        },

        options: {
          scrollbar: true,
          pullDownRefresh: {
            threshold: 50,
            stop: 40,
            txt: '更新成功'
          },
          pullUpLoad: {
            threshold: 20,
            txt: {
              noMore: '没有更多了'
            }
          }
        }
      }
    },

    computed: {},
    watch: {},

    beforeRouteUpdate(to, from, next) {

    },

    created() {
      this._getCategoryHotCourses(this.category_id)
      this._getCategoryDailyCourses(this.category_id)
    },

    methods: {
      // 下拉刷新
      onPullingDown() {
        this._getCategoryDailyCourses(this.category_id)
        this.$refs.scroll.forceUpdate()
      },

      // 上拉获取更多数据
      async onPullingUp() {
        console.log('onpullingup')
        if (this.daily_courses.length >= parseInt(this.pagination.total)) {
          this.$refs.scroll.forceUpdate()
        } else {
          this.pagination.current_page = parseInt(this.pagination.current_page) + 1
          await this._getCategoryDailyCourses(this.category_id, this.pagination.current_page)
          this.$refs.scroll.forceUpdate()
        }
      },

      async _getCategoryHotCourses(id) {
        const response = await getCategoryHotCourses(id)
        this.hot_courses = response.courses.slice(0, 3)
      },

      async _getCategoryDailyCourses(id, page = 1, per_page = 5) {
        const response = await getCategoryDailyCourses(id, page, per_page)
        this.setPagination(response.headers)
        this.daily_courses = this.daily_courses.concat(response.data.courses)
      },

      setPagination(headers) {
        this.pagination.current_page = headers['x-current-page']
        this.pagination.per_page = headers['x-per-page']
        this.pagination.total = headers['x-total']
        this.pagination.link = headers['link']
      }
    }
  }
</script>

<style lang="scss">
  .recommend-courses {
    padding: 17px 17px 17px 17px;
    top: 0px;
    position: fixed;
    width: 100%;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .daily {
        padding-top: 11px;
      }
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
    }
  }

</style>
