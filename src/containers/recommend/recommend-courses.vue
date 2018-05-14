<template>
  <div class="recommend-courses">

    <cube-scroll ref="scroll"
                 class="scroll-wrapper"
                 :data="itemList"
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
        </div>
        <!--没有数据-->
        <empty v-if="hotCourses.length <=0 "></empty>
      </div>
      <div class="daily">
        <h1 class="text">每日最新</h1>

        <ul class="course-list">
          <li class="item" v-for="course in itemList">
            <base-course :baseCourse="course"></base-course>
          </li>
        </ul>

        <!--没有数据-->
        <empty v-if="hotCourses.length <=0 "></empty>
      </div>
    </cube-scroll>

    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import BottomNav from 'components/bottom-nav/bottom-nav'
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
      Empty,
      BottomNav
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
      }
    }
  }
</script>

<style lang="scss">
  .recommend-courses {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    .scroll-wrapper {
      padding: 17.5px;
      .daily {
        padding-top: 11px;
        height: 100%;
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
