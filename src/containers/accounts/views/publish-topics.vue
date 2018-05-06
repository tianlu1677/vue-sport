<template>
  <div class="list">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp">

      <topic-list :topicList="itemList"></topic-list>
    </cube-scroll>
  </div>
</template>

<script>
  import TopicList from 'components/topic-list/topic-list'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getAccountPublishTopics
  } from "@/api/account_api"

  export default {
    name: "publish-topics",
    components: {
      TopicList
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
        const res = await getAccountPublishTopics(this.account_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
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
