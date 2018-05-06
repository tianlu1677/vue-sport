<template>
  <div class="recommend-courses" ref="recommend">
    <cube-scroll ref="scroll"
                 :data="itemList"
                 class="recommend-content"
                 :options="scrollOptions"
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
          <!--没有数据-->
          <empty v-if="hotCourses.length <=0 "></empty>
        </div>
      </div>
      <div class="daily">
        <h1 class="text">每日最新</h1>
        <div class="course-list">
          <ul v-for="course in itemList">
            <li class="item">
              <base-course :baseCourse="course"></base-course>
            </li>
          </ul>
          <!--没有数据-->
          <empty v-if="hotCourses.length <=0 "></empty>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import Empty from 'components/empty/empty'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getCategoryHotCourses,
    getCategoryDailyCourses
  } from "@/api/category_api";

  const COMPONENT_NME = 'recommend-courses'
  export default {
    name: COMPONENT_NME,
    components: {
      BaseCourse,
      Empty
    },
    mixins: [paginationMixin],
    data() {
      return {
        hotCourses: [],
        category_id: this.$route.params.id,
      }
    },

    computed: {},
    watch: {},

    created() {
      this._getCategoryHotCourses(this.category_id)
      this.getItemList()
    },

    methods: {
      async getItemList(params = {}) {
        const res = await getCategoryDailyCourses(this.category_id, params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      },
      async _getCategoryHotCourses(id) {
        const response = await getCategoryHotCourses(id)
        this.hotCourses = response.courses.slice(0, 3)
      },
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
