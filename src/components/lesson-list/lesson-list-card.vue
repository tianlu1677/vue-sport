<template>
  <div class="list-wrapper">
    <div class="list">
      <ul class="item-list">
        <li class="item" v-for="lesson in lessonList" :key="lesson.id">
          <lesson-card :baseLesson="lesson" :link="link" @select="selectItem"></lesson-card>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import LessonCard from 'components/lesson-card/lesson-card'

  const EVENT_SELECT = 'select'
  export default {
    name: "lesson-list-card",
    props: {
      lessonList: {
        type: Array,
      },
      link: {
        type: Boolean,
        default: true
      }
    },
    components: {
      LessonCard,
    },
    methods: {
      selectItem(item) {
        this.$emit(EVENT_SELECT, item)
      }
    }
  }
</script>

<style scoped lang="scss">
  .list-wrapper {
    .list {
      .item-list {
        margin-top: 17.5px;
        .item {
          margin-bottom: 15px;
        }
      }
    }
  }

</style>
