<template>
  <list>
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-down="onPullingDown"
      @pulling-up="onPullingUp">

      <course-list :courseList="itemList"></course-list>
    </cube-scroll>
  </list>
</template>

<script>
  import List from 'base/list/list'
  import CourseList from 'components/course-list/course-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getCurrentAccountCourses} from "@/api/mine_api"

  export default {
    name: "mine-learn-courses",
    components: {
      CourseList,
      List
    },
    mixins: [paginationMixin],

    props: {
      account_id: {
        type: String,
        default: '1'
      }
    },
    async created() {
      await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        const res = await getCurrentAccountCourses(this.account_id, 'learn', params)
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
