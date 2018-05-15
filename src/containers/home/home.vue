<template>
  <div class="home">
    <cube-scroll ref="scroll"
                 class="home-content"
                 :data="itemList"
                 :options="scrollOptions"
                 @pulling-up="onPullingUp"
    >
      <!--你可能感兴趣-->
      <div class="recommend-category-wrapper">
        <h1 class="text">你可能感兴趣</h1>
        <cube-scroll ref="categoryScroll"
                     :data="recommendCategories"
                     style="padding-left: 0"
                     direction="horizontal"
        >
          <ul class="item-list">
            <li class="item" v-for="category in recommendCategories">
              <category :category="category" size="middle"></category>
            </li>
          </ul>
        </cube-scroll>
      </div>
      <!--大家都在学-->
      <div class="recommend-course-wrapper">
        <h1 class="text">大家都在学</h1>
        <cube-scroll ref="courseScroll"
                     :data="recommendCourses"
                     style="padding-left: 0"
                     direction="horizontal"
        >
          <ul class="item-list">
            <li class="item lesson" v-for="course in recommendCourses" :key="course.id">
              <router-link :to="{ path: `/courses/${course.id}` }" tag="div">
                <img :src="course.cover_url" alt="" height="76" width="109" class="cover">
                <h2 class="name">{{course.name}}</h2>
              </router-link>
            </li>
          </ul>
        </cube-scroll>
      </div>
      <!--每日推荐-->
      <div class="recommend-daily-wrapper">
        <h1 class="text">每日推荐</h1>
        <topic-list :topicList="itemList"></topic-list>
      </div>

    </cube-scroll>
    <!--底部导航-->

    <bottom-nav></bottom-nav>
  </div>
</template>

<script>
  import Category from 'components/category/category'
  import BaseCourse from 'components/base-course/base-course'
  import TopicList from 'components/topic-list/topic-list'
  import BottomNav from 'components/bottom-nav/bottom-nav'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getRecommendCategories, getRecommendCourses, getRecommendTopics} from "@/api/home_api";

  export default {
    name: "home",
    mixins: [paginationMixin],
    components: {
      Category,
      BaseCourse,
      TopicList,
      BottomNav
    },
    data() {
      return {
        recommendCategories: [
          {
            id: 0,
            name: '兴趣广场',
            cover_url: 'http://jianshu-feng.qiniudn.com/uploads/category/cover/201804271025Pcb669e2c2476fa6d1dcd39ac8bba16ce.jpg'
          }
        ],
        recommendCourses: [],

      }
    },
    created() {
      this._getRecommendCategories()
      this._getRecommendCourses()
      this.getItemList()
    },

    methods: {
      async _getRecommendCategories() {
        const response = await getRecommendCategories()
        this.recommendCategories = this.recommendCategories.concat(response.categories)
      },
      async _getRecommendCourses() {
        const response = await getRecommendCourses()
        this.recommendCourses = response.courses
      },
      async getItemList(params = {}) {
        const res = await getRecommendTopics(params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../common/styles/mixin";
  .home {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    .recommend-category-wrapper,
    .recommend-course-wrapper,
    .recommend-daily-wrapper {
      position: relative;
      padding-left: 17.5px;
      padding-bottom: 27.5px;
      .text {
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 17.5px;
      }
    }
    .recommend-daily-wrapper {
      padding-right: 17.5px;
    }
    .recommend-category-wrapper {
      padding-top: 17.5px;
      padding-right: 0;
      .cube-scroll-content {
        display: inline-block;
      }
      .item-list {
        white-space: nowrap;
        display: inline-block;
        font-size: 0;
        .item {
          display: inline-block;
          margin-right: 12.5px;
        }
      }
    }
    .recommend-course-wrapper {
      .cube-scroll-content {
        display: inline-block;
      }
      .item-list {
        display: inline-block;
        white-space: nowrap;
        font-size: 0;
        .item {
          display: inline-block;
          margin-right: 12.5px;
          width: 109px;
          .cover {
            border-radius: 10px;
          }
          .name {
            @include multi-line-text(2);
            margin-top: 8px;
            font-size: 12px;
            line-height: 16px;
            color: $gray;
          }
        }
      }
    }

  }
</style>
