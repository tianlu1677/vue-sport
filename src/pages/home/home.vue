<template>
  <div class="home">
    <!--你可能感兴趣-->
    <div class="recommend-category-wrapper">
      <h1 class="text">你可能感兴趣</h1>
      <cube-scroll ref="categoryScroll"
                   :data="recommendCategories"
                   :options="horizontalScrollOptions"
                   direction="horizontal"
      >
        <ul class="item-list" style="">
          <li class="item" style="width: 17.5px;margin-right:0px;"></li>
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
                   :options="horizontalScrollOptions"
                   direction="horizontal"
      >
        <ul class="item-list">
          <li class="item" style="width: 17.5px;margin-right: 0px;"></li>
          <li class="item" v-for="course in recommendCourses" :key="course.id">
            <router-link :to="{ path: `/courses/${course.id}` }" tag="div">
              <img :src="course.cover_url" :alt="course.name" class="cover">
              <h2 class="name">{{course.name}}</h2>
            </router-link>
          </li>
        </ul>
      </cube-scroll>
    </div>
    <!--每日推荐-->
    <div class="recommend-daily-wrapper">
      <h1 class="text">每日推荐</h1>
      <scroll :busy="busy" @loadMore="loadMore">
        <topic-list :topicList="itemList" desc="发布了一篇心得"></topic-list>
      </scroll>

    </div>
    <!--底部导航-->
    <bottom-nav @select="refreshHome"></bottom-nav>
  </div>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import Category from 'components/category/category';
  import BaseCourse from 'components/base-course/base-course';
  import TopicList from 'components/topic-list/topic-list';
  import BottomNav from 'components/bottom-nav/bottom-nav';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import {TopicScrollMixin} from 'components/mixin/topic_scroll_mixin';
  import {getRecommendCategories, getRecommendCourses, getRecommendTopics} from '@/api/home_api';

  export default {
    name: 'home',
    // mixins: [ScrollMixin],
    mixins: [TopicScrollMixin],
    components: {
      Category,
      BaseCourse,
      TopicList,
      Scroll,
      BottomNav,
    },
    data() {
      return {
        recommendCategories: [
          {
            id: 0,
            name: '兴趣广场',
            cover_url: 'http://file.meirixinxue.com/assets/201807041629Ped02ceaa0afdc536f21e7e213f22dc66.png',
          },
        ],
        recommendCourses: [],
        horizontalScrollOptions: {
          bounce: {
            top: false,
            left: false,
            right: false,
            bottom: false,
          },
          bounceTime: 100,
        },
      };
    },
    created() {
      this._getRecommendCategories();
      this._getRecommendCourses();
      // window.wechatShare();
    },
    async activated() {
      window.wechatShare({title: '每日新学'});
    },
    beforeRouteEnter(to, from, next) {
      // console.log('home to ', from)
      if (from.name === 'topicDetail') {
        to.meta.isBack = true
      }
      next()
    },

    methods: {
      async _getRecommendCategories() {
        const response = await getRecommendCategories();
        this.recommendCategories = this.recommendCategories.concat(response.categories);
      },
      async _getRecommendCourses() {
        const response = await getRecommendCourses();
        this.recommendCourses = response.courses;
      },
      async getItemList(params = {}) {
        const res = await getRecommendTopics(params);
        this.itemList = this.itemList.concat(res.data.topics);
        this.pagination(res.headers);
      },
      refreshHome() {
        this.refresh()
        this._getRecommendCourses();
      }
    },
  };
</script>

<style lang="scss">
  @import "../../common/styles/mixin";

  .home {
    width: 100%;
    .recommend-category-wrapper,
    .recommend-course-wrapper {
      position: relative;
      padding-bottom: 26px;
      h1.text {
        padding-left: 17.5px;
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 17.5px;
      }
    }
    .recommend-daily-wrapper {
      position: relative;
      padding-left: 17.5px;
      padding-right: 17.5px;
      padding-bottom: 45px;
      .text {
        font-size: 22px;
        font-weight: bolder;
        margin-bottom: 17.5px;
      }
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
        font-size: 0;
        white-space: nowrap;
        .item {
          display: inline-block;
          margin-right: 12.5px;
          width: 109px;
          .cover {
            border-radius: 10px;
            height: 76px;
            width: 109px;
          }
          .name {
            @include multi-line-text(2);
            display: flex;
            white-space: initial;
            height: 26px;
            margin-top: 8px;
            font-size: 12px;
            line-height: 14px;
            color: $gray;
          }
        }
      }
    }

  }
</style>
