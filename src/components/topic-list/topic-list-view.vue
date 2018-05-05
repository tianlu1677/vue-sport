<template>
  <div class="topics-wrapper">
    <div class="content">
      <h2 class="intro">心得</h2>
      <span class="topics-count">{{topics_count}}</span>
    </div>
    <div class="topics-content">
      <topic-list :topicList="itemList"></topic-list>
    </div>
  </div>

</template>

<script>
  import TopicList from 'components/topic-list/topic-list.vue'
  import {paginationMixin} from "components/mixin/pagination_mixin"
  import {getCourseTopics} from "@/api/course_api"

  export default {
    name: "topic-list-view",
    mixins: [paginationMixin],
    components: {
      TopicList
    },
    props: {
      course_id: {
        type: Number
      },
      topics_count: {
        type: Number,
        default: 0
      }
    },
    async created() {
      await this.getItemList()
    },
    methods: {
      // 获取心得列表
      async getItemList(params = {}) {
        const res = await getCourseTopics(this.course_id, params)
        this.itemList = this.itemList.concat(res.data.topics)
        this.pagination(res.headers)
      }
    }

  }
</script>

<style scoped lang="scss">
  .topics-wrapper {
    position: relative;
    margin-top: 27.5px;
    .content {
      display: flex;
      align-items: flex-end;
      padding-bottom: 17.5px;
      .intro {
        font-size: 22px;
        font-weight: bolder;
      }
      .topics-count {
        padding-left: 7.5px;
        color: $gray;
        font-size: 12px;
      }
    }
  }
</style>
