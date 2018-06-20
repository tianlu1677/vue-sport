<template>
  <div class="search-block">
    <!--<div class="search-box">-->
    <!--<span class="icon icon-search"><span class="path1"></span><span class="path2"></span></span>-->
    <!--&lt;!&ndash;<input type="text" placeholder="请输入课程名或课时名" v-model="search_content">&ndash;&gt;-->

    <!--</div>-->
    <div class="search-box">
      <!--<span class="icon-search"><span class="path1"></span><span class="path2"></span></span>-->
      <span class="icon-search">
        <i class="cubeic-search"></i>
      </span>
      <cube-input v-model="search_content" placeholder="请输入课程名或课时名" class="search-input"></cube-input>

      <!--<input type="text" class="search-input" placeholder="请输入课程名或课时名" v-model="search_content">-->
      <span class="cancel" @click="cancel">取消</span>
      <!--<cube-input v-model="search_content" class="search-input" placeholder="请输入课程名或课时名">-->
      <!--<span slot="prepend">-->
      <!--</span>-->
      <!--</cube-input>-->
      <!--<span class="icon icon-search"><span class="path1"></span></span>-->

    </div>
    <ul class="tab">
      <li v-for="(tab, index) in tabList" :key="index" @click="switchTab(tab, index)"
          :class="{active: currentTab === tab.type}" class="tab-item">
        <h2>{{tab.text}}</h2>
      </li>
    </ul>
    <div class="border-bottom-1px"></div>
    <div class="content">
      <div class="scroll-content">
        <cube-scroll :data="itemList"
                     ref="scroll"
                     :options="scrollOptions"
                     @pulling-up="onPullingUp"
                     v-if="itemList.length > 0"
        >
          <course-list :courseList="itemList" :link="false" @select="selectItem" v-if="currentTab==='course'">
          </course-list>
          <lesson-card-list :lessonList="itemList" :link="false" :show_learning="false" @select="selectItem"
                            v-else></lesson-card-list>

        </cube-scroll>

        <div class="no-result">
          <empty v-show="itemList.length === 0 "></empty>
        </div>

      </div>


    </div>
  </div>
</template>

<script>
  import Empty from 'components/empty/empty';
  import LessonCardList from 'components/lesson-list/lesson-card-list';
  import CourseList from 'components/course-list/course-list';
  import {paginationMixin} from 'components/mixin/pagination_mixin';
  import {searchCourses} from '@/api/search_api';

  export default {
    name: 'search-course',
    components: {
      CourseList,
      LessonCardList,
      Empty,
    },
    mixins: [paginationMixin],
    props: {
      courseOptions: {
        type: Object,
      },
      currentCourse: {
        type: Object,
      },
    },
    data() {
      return {
        courseList: [],
        lessonsList: [],
        search_content: '',
        currentTab: 'course',
        tabList: [
          {
            text: '课程',
            type: 'course',
          }, {
            text: '课时',
            type: 'lesson',

          }],
      };
    },
    created() {
      // this.getItemList()
    },
    watch: {
      search_content() {
        this.refreshItemList();
      },
    },

    methods: {
      switchTab(tab = this.tabList[0], index = 0) {
        this.currentTab = tab.type;
        this.refreshItemList();
      },
      refreshItemList() {
        // this.$refs.scroll.scrollTo(0, 0)
        this.itemList = [];
        this.getItemList();
      },
      cancel() {
        this._hideSearchBox(this.currentCourse);
      },
      selectItem(item) {
        this._hideSearchBox(item);
      },
      async getItemList(params = {}) {
        const res = await searchCourses(this.search_content, this.currentTab, params);
        if (this.currentTab === 'lesson') {
          this.itemList = this.itemList.concat(res.data.lessons);
        } else {
          this.itemList = this.itemList.concat(res.data.courses);
        }

        this.pagination(res.headers);
      },
      _hideSearchBox(item = {}) {
        this.$emit('hideSearchBox', item);
      },
    },

  };
</script>

<style lang="scss">
  .search-block {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 100;
    background: $white;
    padding: 17.5px;
    .search-box {
      position: relative;
      display: flex;

      .icon-search {
        position: absolute;
        left: 10px;
        top: 10px;
        font-size: 20px;
        z-index: 2;
      }
      .cube-input {
        .cube-input-field {
          border-radius: 8px;
        }
      }
      .cube-input_active:after {
        border: none;
      }

      .search-input {
        display: block;
        width: 88%;
        /*height: 40px;*/
        /*line-height: 40px;*/
        padding-left: 27.5px;
        font-size: 13px;
        box-sizing: border-box;
        background: #e8e8e9;
        border-radius: 8px;
        outline: none;
        border: none;
        text-overflow: ellipsis
      }
      .cancel {
        position: absolute;
        line-height: 40px;
        font-size: 13px;
        right: 0;
        margin-left: 20px;
        color: $gray;
      }

    }
    .tab {
      display: flex;
      height: 50px;
      line-height: 50px;
      .tab-item {
        flex: 1;
        font-size: 14px;
        font-weight: bold;
        text-align: center;
      }
      .active {
        color: $blue;
      }
    }
    .content {
      position: fixed;
      top: 110px;
      bottom: 0;
      /*left: 17.5px;*/
      /*right: 17.5px;*/
      width: 100%;
      .scroll-content {
        position: relative;
        height: 100%;
        overflow: hidden;
        padding-right: 35px;
      }
      .no-result {
        margin-top: 100px;
        padding-top: 100px;
      }
    }
  }

</style>
