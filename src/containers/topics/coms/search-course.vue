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
      <cube-scroll :data="courseList">
        <course-list :courseList="courseList" :link="false" @select="selectItem">
        </course-list>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
  import BaseCourse from 'components/base-course/base-course'
  import CourseList from 'components/course-list/course-list'
  import {searchCourses} from "@/api/search_api"

  export default {
    name: "search-course",
    components: {
      BaseCourse,
      CourseList
    },
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
      this.switchTab()
      // this._fetchCourses()
    },
    watch: {
      search_content() {
        this._fetchCourses()
      }
    },

    methods: {
      async _fetchCourses() {
        const res = await searchCourses(this.search_content, this.currentTab)
        this.courseList = res.courses
      },
      switchTab(tab = this.tabList[0], index = 0) {
        this.currentTab = tab.type
        this._fetchCourses()
      },
      cancel() {
        this._hideSearchBox(this.currentCourse)
      },
      selectItem(item) {
        console.log('item')
        this._hideSearchBox(item)
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
      zoom: 1;
      display: flex;
      .icon-search {
        position: absolute;
        left: 10px;
        top: 12px;
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
      height: 100%;
      overflow: hidden;
    }
  }

</style>
