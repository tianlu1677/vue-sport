<template>
  <scroll :busy="busy" loadMore="loadMore" class="publish-scroll">
      <course-list :courseList="itemList"></course-list>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {mapGetters} from 'vuex';
  import CourseList from 'components/course-list/course-list';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import {
    getAccountCourses,
  } from '@/api/account_api';

  const types = {star: '收藏', learn: '我学过的课程', praise: '喜欢', publish: '我的课程'};

  export default {
    name: 'mine-courses',
    components: {
      CourseList,
      Scroll,
    },
    mixins: [ScrollMixin],
    props: {
      account_id: {
        type: String,
        default: '1',
      },
    },
    data() {
      return {};
    },
    computed: {
      ...mapGetters([
        'currentAccount',
      ]),
      type() {
        return this.$route.query.type;
      },
    },
    async created() {
      // await this.getItemList()
      this._setDocumentTitle();
    },
    methods: {
      _setDocumentTitle() {
        document.title = types[this.type];
      },
      async getItemList(params = {}) {
        let res;
        switch (this.type) {
          case 'praise':
            res = await getAccountCourses(this.currentAccount.id, 'praise', params);
            break;
          case 'star':
            res = await getAccountCourses(this.currentAccount.id, 'star', params);
            break;
          case 'learn':
            res = await getAccountCourses(this.currentAccount.id, 'learn', params);
            break;
          case 'publish':
            res = await getAccountCourses(this.currentAccount.id, 'publish', params);
            break;
          default:
            res = await getAccountCourses(this.currentAccount.id, 'publish', params);
            break;
        }
        this.itemList = this.itemList.concat(res.data.courses);
        this.pagination(res.headers);
      },
    },
  };
</script>

<style scoped lang="scss">
  .publish-scroll {
    padding: 0 17.5px 17.5px 17.5px;
    background-color: $white;
  }

</style>
