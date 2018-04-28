<template>
  <div class="list">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <course-list :courseList="itemList"></course-list>
    </cube-scroll>
  </div>
</template>

<script>
  import CourseList from 'components/course-list/course-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getAccountLearnCourses
  } from "@/api/account_api"

  export default {
    name: "learn-courses",
    components: {
      CourseList
    },
    mixins: [paginationMixin],

    props: {
      account_id: {
        type: String
      }
    },
    data() {
      return {}
    },
    async created() {
      await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        const res = await getAccountLearnCourses(this.account_id, params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list {
    height: 90%;
  }
</style>
