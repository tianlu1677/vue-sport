<template>
  <div class="topics">
    <div class="topic-list">
      <ul>
        <li class="item" v-for="topic in topicList" :key="topic.id">
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
      topicList: {
        type: Array,
        default: function () {
          return []
        }
      },
      course_id: {
        type: Number
      }
    },

    data: function () {
      return {
      }
    },
  }
</script>

<style lang="scss">
  .topics {
    position: relative;
    .topic-list {
      .item {
        margin-bottom: 27.5px;
      }
      .item:last-child {
        margin-bottom: 0;
      }
    }
  }

</style>
