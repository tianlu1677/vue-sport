<template>
  <div class="recommend-courses" ref="recommend">
    <cube-scroll ref="scroll" class="recommend-content"
                 :options="options"
                 @pulling-down="onPullingDown"
                 @pulling-up="onPullingUp"
    >
      <div class="hot">
        <h1 class="text">热门推荐</h1>
        <div class="course-list">
          <ul v-for="course in hotCourses" :key="course.id">
            <li class="item">
              <base-course :baseCourse="course"></base-course>
            </li>
          </ul>
        </div>
      </div>
      <div class="daily">
        <h1 class="text">每日最新</h1>
        <div class="course-list">
          <ul v-for="course in dailyCourses">
            <li class="item">
              <base-course :baseCourse="course"></base-course>
            </li>
          </ul>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import {getCategoryHotCourses, getCategoryDailyCourses} from "@/api/category_api";

  const COMPONENT_NME = 'recommend-courses'
  export default {
    name: COMPONENT_NME,
    components: {
      BaseCourse,
    },
    data() {
      return {
        hotCourses: [],
        dailyCourses: [],
        category_id: this.$route.params.id,
        pagination: {
          current_page: 1,
          per_page: 10,
          total: 0,
          link: null
        },

        options: {
          scrollbar: false,
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
        if (this.dailyCourses.length >= parseInt(this.pagination.total)) {
          this.$refs.scroll.forceUpdate()
        } else {
          this.pagination.current_page = parseInt(this.pagination.current_page) + 1
          await this._getCategoryDailyCourses(this.category_id, this.pagination.current_page)
          this.$refs.scroll.forceUpdate()
        }
      },

      async _getCategoryHotCourses(id) {
        const response = await getCategoryHotCourses(id)
        this.hotCourses = response.courses.slice(0, 3)
      },

      async _getCategoryDailyCourses(id, page = 1, per_page = 5) {
        const response = await getCategoryDailyCourses(id, page, per_page)
        this.setPagination(response.headers)
        this.dailyCourses = this.dailyCourses.concat(response.data.courses)
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0 17.5px;
    .recommend-content {
      padding-top: 17.5px;
      .daily {
        padding-top: 11px;
      }
      .hot, .daily {
        .text {
          font-size: 22px;
          font-weight: bolder;
        }
        .course-list {
          margin-top: 17.5px;
          .item {
            margin-bottom: 15px;
          }
        }
      }
    }
  }

</style>
