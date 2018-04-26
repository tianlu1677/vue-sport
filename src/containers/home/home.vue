<template>
  <div class="home">
    <cube-scroll ref="scroll"
                 class="home-content"
    >
      <!--你可能感兴趣-->
      <div class="recommend-category-wrapper">
        <h1 class="text">你可能感兴趣</h1>
        <ul class="item-list">
          <li class="item" v-for="category in recommendCategories">
            <category :category="category"></category>
          </li>
        </ul>
      </div>
      <!--大家都在学-->
      <div class="recommend-course-wrapper">
        <h1 class="text">大家都在学</h1>
        <ul class="item-list">
          <li class="item lesson" v-for="course in recommendCourses" :key="course.id">
            <router-link :to="{path: course.type === 'course' ? `/courses/${course.id}` : `/lessons/${course.id}`}">
              <img :src="course.cover_url" alt="" height="76" width="109" class="cover">
              <h2 class="name">我们都是好孩子哈哈哈哈哈哈，谁说不是呢，这个让我们真正的更好看{{course.name}}</h2>
            </router-link>
          </li>
        </ul>
      </div>
      <!--每日推荐-->
      <div class="recommend-daily-wrapper">
        <h1 class="text">大家都在学</h1>
        <topic-list></topic-list>
      </div>

    </cube-scroll>
    <!--底部导航-->

    <div class="bottom-wrapper">
      <div class="border-top-1px"></div>
      <ul class="item-list">
        <router-link to="/home" tag="div">
          <li class="item">
            <span class="icon-home icon"></span>
            <span class="text">推荐</span>
          </li>
        </router-link>
        <router-link to="/topics/new" tag="div">
          <li class="item">
            <span class="icon-new-topic icon"></span>
            <span class="text">发布</span>
          </li>
        </router-link>
        <router-link to="/mine" tag="div">
          <li class="item">
            <span class="icon-user icon"></span>
            <span class="text">我</span>
          </li>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  import Category from 'components/category/category'
  import BaseCourse from 'components/base-course/base-course'
  import TopicList from 'components/topic-list/topic-list'
  import {getRecommendCategories, getRecommendCourses} from "@/api/home_api";

  export default {
    name: "home",
    components: {
      Category,
      BaseCourse,
      TopicList
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
    },

    methods: {
      async _getRecommendCategories() {
        const response = await getRecommendCategories()
        this.recommendCategories = response.categories
      },
      async _getRecommendCourses() {
        const response = await getRecommendCourses()
        this.recommendCourses = response.courses
      }
    }
  }
</script>

<style scoped lang="scss">
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
      .item-list {
        width: 3000px;
        display: flex;
        .item {
          float: left;
          display: inline-block;
          margin-right: 12.5px;
        }
      }
    }
    .recommend-course-wrapper {
      .item-list {
        width: 3000px;
        display: flex;
        .item {
          float: left;
          display: inline-block;
          margin-right: 12.5px;
        }
        .item {
          .cover {
            border-radius: 10px;
          }
          .name {
            width: 109px;
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

    .bottom-wrapper {
      position: fixed;
      height: 50px;
      left: 0;
      right: 0;
      background-color: $white;
      bottom: 0;
      .item-list {
        padding: 0 35px 0 35px;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 26.5px;
        justify-items: center;
        .item {
          display: flex;
          flex-direction: column;
          .icon {
            margin-top: 7.5px;
            font-size: 22.5px;
            margin-bottom: 5px;
          }
          .text {
            margin: auto;
            font-size: 10px;
          }

        }
      }
    }
  }
</style>
