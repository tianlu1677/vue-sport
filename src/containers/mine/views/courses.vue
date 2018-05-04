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
  import {mapGetters} from 'vuex'
  import CourseList from 'components/course-list/course-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getCurrentAccountCourses} from "@/api/mine_api"

  export default {
    name: "mine-courses",
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
    data() {
      return {
        type: this.$route.query.type
      }
    },
    computed: {
      ...mapGetters([
        'currentAccount'
      ])
    },
    async created() {
      await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        let res = undefined
        switch (this.type) {
          case 'praise':
            res = await getCurrentAccountCourses(this.currentAccount.id, 'praise', params)
            break
          case 'star':
            res = await getCurrentAccountCourses(this.currentAccount.id, 'star', params)
            break
          case 'learn':
            res = await getCurrentAccountCourses(this.currentAccount.id, 'learn', params)
            break
        }

        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
