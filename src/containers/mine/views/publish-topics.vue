<template>
  <list :showEmpty="itemList.length <= 0" class="content">
    <cube-scroll
      ref="scroll"
      :data="itemList"
      :options="scrollOptions"
      @pulling-up="onPullingUp"
      v-if="itemList.length > 0"
    >
      <div style="margin-top: 17.5px"></div>
      <topic-list :topicList="itemList"></topic-list>
    </cube-scroll>
  </list>
</template>

<script>
  import {mapGetters} from 'vuex'
  import List from 'base/list/list'
  import TopicList from 'components/topic-list/topic-list'
  import Empty from 'components/empty/empty'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {
    getAccountTopics,
  } from "@/api/account_api"

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
      return {

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
        const res = await getAccountTopics(this.currentAccount.id, 'publish', params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      },
    }
  }
</script>

<style scoped lang="scss">


</style>
