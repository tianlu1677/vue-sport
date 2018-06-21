<template>
  <scroll :busy="busy" loadMore="loadMore" class="publish-scroll" :empty="itemList.length <= 0">
    <topic-list :topicList="itemList"></topic-list>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll';
  import {mapGetters} from 'vuex';
  import TopicList from 'components/topic-list/topic-list';
  import {ScrollMixin} from 'components/mixin/scroll_mixin';
  import {
    getAccountTopics,
  } from '@/api/account_api';

  export default {
    name: 'mine-publish-topics',
    components: {
      TopicList,
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
    },
    async created() {
      // await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        const res = await getAccountTopics(this.currentAccount.id, 'publish', params);
        this.itemList = this.itemList.concat(res.data.topics);
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
