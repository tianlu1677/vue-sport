<template>
  <div class="search-block">
    <div class="search-box">
      <i class="icon-search"></i>
      <input type="text" placeholder="请输入课程名或课时名" v-model="search_content">
      <span class="cancel" @click="cancel">取消</span>
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
        >
          <course-list :courseList="itemList" :link="false" @select="selectItem" v-if="currentTab==='course'">
          </course-list>
          <lesson-list-card :lessonList="itemList" :link="false" @select="selectItem" v-else></lesson-list-card>
        </cube-scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import LessonListCard from 'components/lesson-list/lesson-list-card'
  import CourseList from 'components/course-list/course-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {searchCourses} from "@/api/search_api"

  export default {
    name: "search-course",
    components: {
      CourseList,
      LessonListCard
    },
    mixins: [paginationMixin],
    props: {
      courseOptions: {
        type: Object
      },
      currentCourse: {
        type: Object
      }
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
            type: 'course'
          }, {
            text: '课时',
            type: 'clazz'

          }]
      }
    },
    created() {
      this.getItemList()
    },
    watch: {
      search_content() {
        this.refreshItemList()
      }
    },

    methods: {
      switchTab(tab = this.tabList[0], index = 0) {
        this.currentTab = tab.type
        this.refreshItemList()
      },
      refreshItemList() {
        this.$refs.scroll.scrollTo(0, 0)
        this.itemList = []
        this.getItemList()
      },
      cancel() {
        this._hideSearchBox(this.currentCourse)
      },
      selectItem(item) {
        this._hideSearchBox(item)
      },
      async getItemList(params = {}) {
        const res = await searchCourses(this.search_content, this.currentTab, params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      },
      _hideSearchBox(item = {}) {
        this.$emit('hideSearchBox', item)
      }
    }

  }
</script>

<style scoped lang="scss">
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
        top: 12px;
        z-index: 2;
      }
      input {
        background: #e8e8e9;
        outline: none;
        border: none;
        width: 88%;
        font-size: 13px;
        padding-left: 43.5px;
        line-height: 40px;
        border-radius: 8px;
        box-sizing: border-box;
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
      padding: 0 17.5px 0 0;
      .scroll-content {
        height: 100%;
        overflow: hidden;

      }
    }
  }

</style>
