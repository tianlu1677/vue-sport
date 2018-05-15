<template>
  <list :showEmpty="itemList.length <= 0">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp"
      v-if="itemList.length > 0"
      class="content"
    >
      <topic-list :topicList="itemList"></topic-list>
    </cube-scroll>
  </list>
</template>

<script>
  import List from 'base/list/list'
  import TopicList from 'components/topic-list/topic-list'
  import Empty from 'components/empty/empty'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getCurrentAccountPublishTopics
  } from "@/api/mine_api"

  export default {
    name: "mine-publish-topics",
    components: {
      TopicList,
      Empty,
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
      return {}
    },
    async created() {
      await this.getItemList()
    },
    methods: {
      async getItemList(params = {}) {
        const res = await getCurrentAccountPublishTopics(params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      }
    }
  }
</script>

<style scoped lang="scss">
  .content {
    padding: 0 17.5px;
  }
</style>
