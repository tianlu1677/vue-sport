<template>
  <div class="home">
    <cube-scroll ref="scroll"
                 class="home-content"
    >
      <!--你可能感兴趣-->
      <div class="recommend-category-wrapper">
        <h1 class="text">你可能感兴趣</h1>
        <cube-scroll ref="categoryScroll"
                     :data="recommendCategories"
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
        <ul class="item-list">
          <li class="item lesson" v-for="course in recommendCourses" :key="course.id">
            <router-link :to="{path: course.type === 'course' ? `/courses/${course.id}` : `/lessons/${course.id}`}"
                         tag="div">
              <img :src="course.cover_url" alt="" height="76" width="105" class="cover">
              <h2 class="name">{{course.name}}</h2>
            </router-link>
          </li>
        </ul>
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
        recommendCategories: [],
        recommendCourses: []
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
        this.recommendCategories = response.categories
      },
      async _getRecommendCourses() {
        const response = await getRecommendCourses()
        this.recommendCourses = response.courses.slice(0, 3)
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
  .home {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 50px;
    padding: 0 17.5px;
    .recommend-category-wrapper, .recommend-course-wrapper, .recommend-daily-wrapper {
      position: relative;
      padding-bottom: 27.5px;
      .text {
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 17.5px;
      }
    }
    .recommend-category-wrapper {
      padding-top: 17.5px;
      .cube-scroll-content {
        display: inline-block;
      }
      .item-list {
        white-space: nowrap;
        display: inline-block;
        .item {
          display: inline-block;
          margin-right: 12.5px;
        }
      }
    }
    .recommend-course-wrapper {
      .item-list {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        justify-items: stretch;
        .item {
          .cover {
            border-radius: 10px;
          }
          .name {
            height: 30px;
            overflow: hidden;
            margin-top: 10px;
            font-size: 12px;
            line-height: 16px;
            color: $gray;
          }
        }
      }
    }
  }
</style>
