<template>
  <div class="topics">
    <div class="topic-list">
      <ul>
        <li class="item" v-for="topic in topics">
          <base-topic :baseTopic="topic"></base-topic>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import BaseTopic from 'components/base-topic/base-topic'

  import {getTopicList} from "@/api/topic_api"

  export default {
    name: "topic-list",
    components: {
      BaseTopic
    },
    props: {
      course_id: {
        type: Number,
        default: 1,
      },

      // topics: {
      //   type: Array,
      //   default: function () {
      //     return []
      //   }
      // }
    },

    data: function () {
      return {
        topics: [],
        options: {}
      }
    },

    created() {
      this._getTopicList()
    },

    methods: {
      async _getTopicList() {
        const response = await getTopicList(this.course_id)
        this.topics = response.topics
      }
    }

  }
</script>

<style lang="scss">
  .topics {
    position: relative;
    .topic-list {
      .item {
        margin-bottom: 27.5px;
      }
    }
  }

</style>
