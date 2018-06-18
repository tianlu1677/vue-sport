<template>
  <ul class="topic-list">
    <li class="item" v-for="topic in topicList" :key="topic.id">
      <base-topic :baseTopic="topic"
                  :show_course_name="show_course_name"
                  :show_lesson_name="show_lesson_name"
                  :desc="desc">

      </base-topic>
    </li>
  </ul>
</template>

<script>
  import BaseTopic from 'components/base-topic/base-topic';

  export default {
    name: 'topic-list',
    components: {
      BaseTopic,
    },
    props: {
      topicList: {
        type: Array,
        default() {
          return [];
        },
      },
      course_id: {
        type: Number,
      },
      show_course_name: {
        type: Boolean,
        default: true,
      },
      show_lesson_name: {
        type: Boolean,
        default: true,
      },
      desc: {
        type: String,
      },
    },
  };
</script>

<style lang="scss">
  .topic-list {
    margin-top: 17.5px;
    .item {
      margin-bottom: 27.5px;
    }
    .item:last-child {
      margin-bottom: 27.5px;
    }
  }

</style>
