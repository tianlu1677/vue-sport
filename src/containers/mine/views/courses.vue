<template>
  <list :showEmpty="itemList.length <= 0">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp"
      v-if="itemList.length > 0"
    >
      <div style="margin-top: 17.5px"></div>
      <course-list :courseList="itemList"></course-list>
    </cube-scroll>
  </list>
</template>

<script>
  import List from 'base/list/list'
  import {mapGetters} from 'vuex'
  import CourseList from 'components/course-list/course-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getAccountCourses,
  } from "@/api/account_api"

  const types = ['praise', 'learn', 'star', 'praise', 'publish']

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
      // await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        let res = undefined
        switch (this.type) {
          case 'praise':
            res = await getAccountCourses(this.currentAccount.id, 'praise', params)
            break
          case 'star':
            res = await getAccountCourses(this.currentAccount.id, 'star', params)
            break
          case 'learn':
            res = await getAccountCourses(this.currentAccount.id, 'learn', params)
            break
          case 'publish':
            res = await getAccountCourses(this.currentAccount.id, 'publish', params)
            break
          default:
            res = await getAccountCourses(this.currentAccount.id, 'publish', params)
            break;
        }
        this.itemList = this.itemList.concat(res.data.courses)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
